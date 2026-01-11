const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// Check if directories exist
const backendDir = path.join(__dirname);
const frontendDir = path.join(__dirname, 'frontend');

if (!fs.existsSync(backendDir)) {
  logError('Backend directory not found!');
  process.exit(1);
}

if (!fs.existsSync(frontendDir)) {
  logError('Frontend directory not found!');
  process.exit(1);
}

// Check if node_modules exist
const backendNodeModules = path.join(backendDir, 'node_modules');
const frontendNodeModules = path.join(frontendDir, 'node_modules');

// Function to check if npm command is available
function checkNpmAvailable() {
  try {
    execSync('npm --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    logError('npm command not found. Please install Node.js and npm first.');
    return false;
  }
}

// Function to install dependencies
function installDependencies(dir, name) {
  return new Promise((resolve, reject) => {
    logInfo(`Installing ${name} dependencies...`);
    
    // Try different approaches to run npm install
    const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    
    const install = spawn(npmCommand, ['install'], {
      cwd: dir,
      stdio: 'inherit',
      shell: true
    });

    install.on('close', (code) => {
      if (code === 0) {
        logSuccess(`${name} dependencies installed successfully`);
        resolve();
      } else {
        logError(`${name} dependency installation failed with code ${code}`);
        reject();
      }
    });

    install.on('error', (error) => {
      logError(`Failed to start npm install for ${name}: ${error.message}`);
      reject(error);
    });
  });
}

// Install dependencies if needed
async function checkAndInstallDeps() {
  if (!checkNpmAvailable()) {
    process.exit(1);
  }

  const promises = [];
  
  if (!fs.existsSync(backendNodeModules)) {
    logWarning('Backend node_modules not found. Installing dependencies...');
    promises.push(installDependencies(backendDir, 'backend'));
  }

  if (!fs.existsSync(frontendNodeModules)) {
    logWarning('Frontend node_modules not found. Installing dependencies...');
    promises.push(installDependencies(frontendDir, 'frontend'));
  }

  if (promises.length > 0) {
    try {
      await Promise.all(promises);
    } catch (error) {
      logError(`Dependency installation failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// Start servers with proper error handling
function startServers() {
  log('\n🚀 Starting World of Books Development Servers\n', 'cyan');
  log('=' .repeat(50), 'magenta');
  
  let backendStarted = false;
  let frontendStarted = false;

  // Start Backend
  try {
    logInfo('Starting Backend Server (NestJS)...');
    
    // Use execSync for Windows compatibility
    const backendCommand = process.platform === 'win32' 
      ? 'npm.cmd run start:dev' 
      : 'npm run start:dev';
    
    const backend = spawn(backendCommand, [], {
      cwd: backendDir,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true
    });

    backend.stdout.on('data', (data) => {
      const output = data.toString().trim();
      if (output && !backendStarted) {
        backendStarted = true;
        log(`[BACKEND] ${output}`, 'green');
      }
    });

    backend.stderr.on('data', (data) => {
      const output = data.toString().trim();
      if (output) {
        log(`[BACKEND ERROR] ${output}`, 'red');
      }
    });

    backend.on('close', (code) => {
      if (code !== 0) {
        logError(`Backend exited with code ${code}`);
      }
    });

    backend.on('error', (error) => {
      logError(`Backend failed to start: ${error.message}`);
    });

  } catch (error) {
    logError(`Failed to start backend: ${error.message}`);
  }

  // Start Frontend
  try {
    logInfo('Starting Frontend Server (Next.js)...');
    
    const frontendCommand = process.platform === 'win32' 
      ? 'cd frontend && npm.cmd run dev' 
      : 'cd frontend && npm run dev';
    
    const frontend = spawn(frontendCommand, [], {
      cwd: __dirname,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true
    });

    frontend.stdout.on('data', (data) => {
      const output = data.toString().trim();
      if (output && !frontendStarted) {
        frontendStarted = true;
        log(`[FRONTEND] ${output}`, 'blue');
      }
    });

    frontend.stderr.on('data', (data) => {
      const output = data.toString().trim();
      if (output) {
        log(`[FRONTEND ERROR] ${output}`, 'red');
      }
    });

    frontend.on('close', (code) => {
      if (code !== 0) {
        logError(`Frontend exited with code ${code}`);
      }
    });

    frontend.on('error', (error) => {
      logError(`Frontend failed to start: ${error.message}`);
    });

  } catch (error) {
    logError(`Failed to start frontend: ${error.message}`);
  }

  // Wait for servers to start
  setTimeout(() => {
    log('\n🎉 Servers started successfully!\n', 'green');
    log('=' .repeat(50), 'magenta');
    logInfo('Backend API: http://localhost:3000');
    logInfo('Frontend App: http://localhost:3001');
    logInfo('API Docs: http://localhost:3000/api');
    log('\n💡 Press Ctrl+C to stop both servers\n', 'cyan');
    log('=' .repeat(50), 'magenta');
  }, 3000);
}

// Handle process termination
process.on('SIGINT', () => {
  log('\n\n🛑 Shutting down servers...\n', 'yellow');
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('\n\n🛑 Shutting down servers...\n', 'yellow');
  process.exit(0);
});

// Main execution
async function main() {
  try {
    await checkAndInstallDeps();
    await startServers();
  } catch (error) {
    logError(`Failed to start servers: ${error.message}`);
    process.exit(1);
  }
}

main();
