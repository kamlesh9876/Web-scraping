const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

// Files and directories to clean
const cleanTargets = [
  // Node modules
  { path: 'node_modules', type: 'dir', description: 'Backend node_modules' },
  { path: 'frontend/node_modules', type: 'dir', description: 'Frontend node_modules' },
  
  // Build outputs
  { path: 'dist', type: 'dir', description: 'Backend build output' },
  { path: 'frontend/.next', type: 'dir', description: 'Next.js build cache' },
  { path: 'frontend/out', type: 'dir', description: 'Next.js static export' },
  
  // Cache files
  { path: 'frontend/.cache', type: 'dir', description: 'Frontend cache' },
  { path: '.cache', type: 'dir', description: 'Root cache' },
  
  // Log files
  { path: '*.log', type: 'file', description: 'Log files' },
  { path: 'logs', type: 'dir', description: 'Logs directory' },
  
  // Environment files (keep examples)
  { path: '.env', type: 'file', description: 'Environment file' },
  { path: 'frontend/.env.local', type: 'file', description: 'Frontend environment' },
  
  // Coverage and test outputs
  { path: 'coverage', type: 'dir', description: 'Test coverage reports' },
  { path: 'frontend/coverage', type: 'dir', description: 'Frontend test coverage' },
  { path: '.nyc_output', type: 'dir', description: 'NYC coverage output' },
  
  // Temporary files
  { path: '*.tmp', type: 'file', description: 'Temporary files' },
  { path: '*.temp', type: 'file', description: 'Temp files' },
  { path: '.DS_Store', type: 'file', description: 'macOS system files' },
  { path: 'Thumbs.db', type: 'file', description: 'Windows thumbnail cache' },
  
  // Editor files
  { path: '.vscode/settings.json', type: 'file', description: 'VS Code settings' },
  { path: '.vscode/launch.json', type: 'file', description: 'VS Code launch config' },
  { path: '.vscode/extensions.json', type: 'file', description: 'VS Code extensions' },
  
  // Development scripts (keep only main ones)
  { path: 'start-dev.js', type: 'file', description: 'Old development script' },
  { path: 'start-dev-simple.js', type: 'file', description: 'Simple development script' },
];

// Files to keep
const keepFiles = [
  'package.json',
  'package-lock.json',
  '.gitignore',
  '.env.example',
  '.env.local.example',
  'README.md',
  'README-DEV.md',
  'start-concurrent.js',
  'tsconfig.json',
  'nest-cli.json',
  '.eslintrc.js',
  '.prettierrc'
];

function removePath(targetPath, description) {
  try {
    const fullPath = path.resolve(targetPath);
    
    if (!fs.existsSync(fullPath)) {
      logInfo(`Already removed: ${description}`);
      return true;
    }

    // Check if it's a file or directory
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      logSuccess(`Removed directory: ${description}`);
    } else {
      fs.unlinkSync(fullPath);
      logSuccess(`Removed file: ${description}`);
    }
    
    return true;
  } catch (error) {
    logError(`Failed to remove ${description}: ${error.message}`);
    return false;
  }
}

function cleanProject() {
  log('\n🧹 Starting Project Cleanup\n', 'cyan');
  log('=' .repeat(50), 'cyan');
  
  let removedCount = 0;
  let failedCount = 0;
  
  cleanTargets.forEach(target => {
    if (target.type === 'file') {
      // Handle glob patterns for files
      if (target.path.includes('*')) {
        const pattern = target.path.replace('*', '');
        const files = fs.readdirSync('.').filter(file => file.startsWith(pattern));
        files.forEach(file => {
          if (removePath(file, `${target.description} (${file})`)) {
            removedCount++;
          } else {
            failedCount++;
          }
        });
      } else {
        if (removePath(target.path, target.description)) {
          removedCount++;
        } else {
          failedCount++;
        }
      }
    } else {
      if (removePath(target.path, target.description)) {
        removedCount++;
      } else {
        failedCount++;
      }
    }
  });
  
  log('\n📊 Cleanup Summary\n', 'cyan');
  log('=' .repeat(50), 'cyan');
  logSuccess(`Successfully removed: ${removedCount} items`);
  if (failedCount > 0) {
    logWarning(`Failed to remove: ${failedCount} items`);
  }
  
  log('\n💡 Next Steps\n', 'cyan');
  log('=' .repeat(50), 'cyan');
  logInfo('Run "npm run install:all" to reinstall dependencies');
  logInfo('Run "npm run dev" to start development servers');
  logInfo('Run "git add . && git commit -m \"Clean project\"" to commit changes');
  
  log('\n🎉 Project cleanup completed!\n', 'green');
}

// Handle process interruption
process.on('SIGINT', () => {
  log('\n\n🛑 Cleanup interrupted by user\n', 'yellow');
  process.exit(0);
});

// Run cleanup
cleanProject();
