const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('\n🚀 Starting World of Books Development Servers\n');
console.log('=' .repeat(50));

// Function to start a process
function startProcess(command, args, cwd, name, color) {
  console.log(`\n📦 Starting ${name}...`);
  
  const process = spawn(command, args, {
    cwd: cwd,
    stdio: 'inherit',
    shell: true
  });

  process.on('error', (error) => {
    console.error(`❌ Failed to start ${name}: ${error.message}`);
  });

  process.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ ${name} exited with code ${code}`);
    }
  });

  return process;
}

// Check directories
const backendDir = __dirname;
const frontendDir = path.join(__dirname, 'frontend');

if (!fs.existsSync(frontendDir)) {
  console.error('❌ Frontend directory not found!');
  process.exit(1);
}

// Start backend
const backend = startProcess('npm', ['run', 'start:dev'], backendDir, 'Backend (NestJS)', 'green');

// Wait a moment before starting frontend
setTimeout(() => {
  const frontend = startProcess('npm', ['run', 'dev'], frontendDir, 'Frontend (Next.js)', 'blue');
  
  // Show access info after a delay
  setTimeout(() => {
    console.log('\n🎉 Servers started successfully!\n');
    console.log('=' .repeat(50));
    console.log('🌐 Backend API: http://localhost:3000');
    console.log('🌐 Frontend App: http://localhost:3001');
    console.log('📚 API Docs: http://localhost:3000/api');
    console.log('\n💡 Press Ctrl+C to stop both servers');
    console.log('=' .repeat(50));
  }, 3000);
}, 2000);

// Handle shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down servers...\n');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n🛑 Shutting down servers...\n');
  process.exit(0);
});
