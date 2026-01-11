const { spawn } = require('child_process');
const path = require('path');

console.log('\n🚀 Starting World of Books Development Servers\n');
console.log('='.repeat(50));

// Start backend
console.log('📦 Starting Backend (NestJS)...');
const backend = spawn('npm', ['run', 'start:dev'], {
  stdio: 'inherit',
  shell: true
});

// Start frontend
console.log('📦 Starting Frontend (Next.js)...');
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: './frontend',
  stdio: 'inherit',
  shell: true
});

// Show access info
setTimeout(() => {
  console.log('\n🎉 Servers started successfully!\n');
  console.log('='.repeat(50));
  console.log('🌐 Backend API: http://localhost:3000');
  console.log('🌐 Frontend App: http://localhost:3001');
  console.log('📚 API Docs: http://localhost:3000/api');
  console.log('\n💡 Press Ctrl+C to stop both servers');
  console.log('='.repeat(50));
}, 5000);

// Handle shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down servers...\n');
  backend.kill();
  frontend.kill();
  process.exit(0);
});
