const { spawn } = require('child_process');
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

if (!fs.existsSync(backendNodeModules)) {
  logWarning('Backend node_modules not found. Installing dependencies...');
  installBackendDeps();
}

if (!fs.existsSync(frontendNodeModules)) {
  logWarning('Frontend node_modules not found. Installing dependencies...');
  installFrontendDeps();
}

function installBackendDeps() {
  return new Promise((resolve, reject) => {
    logInfo('Installing backend dependencies...');
    const npmInstall = spawn('npm', ['install'], {
      cwd: backendDir,
      stdio: 'inherit'
    });

    npmInstall.on('close', (code) => {
      if (code === 0) {
        logSuccess('Backend dependencies installed successfully');
        resolve();
      } else {
        logError(`Backend dependency installation failed with code ${code}`);
        reject();
      }
    });
  });
}

function installFrontendDeps() {
  return new Promise((resolve, reject) => {
    logInfo('Installing frontend dependencies...');
    const npmInstall = spawn('npm', ['install'], {
      cwd: frontendDir,
      stdio: 'inherit'
    });

    npmInstall.on('close', (code) => {
      if (code === 0) {
        logSuccess('Frontend dependencies installed successfully');
        resolve();
      } else {
        logError(`Frontend dependency installation failed with code ${code}`);
        reject();
      }
    });
  });
}

// Start both servers
async function startServers() {
  log('\n🚀 Starting World of Books Development Servers\n', 'cyan');
  log('=' .repeat(50), 'magenta');
  
  // Start Backend
  logInfo('Starting Backend Server (NestJS)...');
  const backend = spawn('npm', ['run', 'start:dev'], {
    cwd: backendDir,
    stdio: ['pipe', 'pipe', 'pipe']
  });

  // Start Frontend
  logInfo('Starting Frontend Server (Next.js)...');
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: frontendDir,
    stdio: ['pipe', 'pipe', 'pipe']
  });

  // Handle backend output
  backend.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      log(`[BACKEND] ${output}`, 'green');
    }
  });

  backend.stderr.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      log(`[BACKEND ERROR] ${output}`, 'red');
    }
  });

  // Handle frontend output
  frontend.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      log(`[FRONTEND] ${output}`, 'blue');
    }
  });

  frontend.stderr.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      log(`[FRONTEND ERROR] ${output}`, 'red');
    }
  });

  // Handle process exit
  backend.on('close', (code) => {
    if (code !== 0) {
      logError(`Backend exited with code ${code}`);
    }
  });

  frontend.on('close', (code) => {
    if (code !== 0) {
      logError(`Frontend exited with code ${code}`);
    }
  });

  // Handle process termination
  process.on('SIGINT', () => {
    log('\n\n🛑 Shutting down servers...\n', 'yellow');
    backend.kill('SIGINT');
    frontend.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    log('\n\n🛑 Shutting down servers...\n', 'yellow');
    backend.kill('SIGTERM');
    frontend.kill('SIGTERM');
    process.exit(0);
  });

  // Wait a moment for servers to start
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

// Main execution
async function main() {
  try {
    await startServers();
  } catch (error) {
    logError(`Failed to start servers: ${error.message}`);
    process.exit(1);
  }
}

main();
