const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Ablespace Scraping System...\n');

// Check if MongoDB is already running
const checkMongoDB = () => {
  return new Promise((resolve) => {
    const checkProcess = spawn('netstat', ['-ano', '|', 'findstr', ':27017'], {
      stdio: 'pipe',
      shell: true
    });
    
    checkProcess.stdout.on('data', (data) => {
      if (data.toString().includes(':27017')) {
        console.log('📦 MongoDB is already running!');
        resolve(true);
      } else {
        resolve(false);
      }
    });
    
    checkProcess.on('close', () => {
      resolve(false);
    });
  });
};

// Start everything
checkMongoDB().then((mongoRunning) => {
  if (!mongoRunning) {
    console.log('📦 Starting MongoDB...');
    const mongoProcess = spawn('mongod', ['--dbpath', 'C:\\data\\db', '--port', '27017'], {
      stdio: 'pipe',
      shell: true
    });

    mongoProcess.stdout.on('data', (data) => {
      console.log(`MongoDB: ${data.toString().trim()}`);
    });

    mongoProcess.stderr.on('data', (data) => {
      console.log(`MongoDB Error: ${data.toString().trim()}`);
    });
  }

  // Wait a bit for MongoDB to be ready
  setTimeout(() => {
    // Start Backend (NestJS)
    console.log('\n🔧 Starting Backend API...');
    const backendProcess = spawn('npm', ['start'], {
      stdio: 'pipe',
      shell: true,
      cwd: path.join(__dirname)
    });

    backendProcess.stdout.on('data', (data) => {
      console.log(`Backend: ${data.toString().trim()}`);
    });

    backendProcess.stderr.on('data', (data) => {
      console.log(`Backend Error: ${data.toString().trim()}`);
    });

    // Wait a bit for backend to start
    setTimeout(() => {
      // Start Frontend (Next.js)
      console.log('\n🌐 Starting Frontend...');
      const frontendProcess = spawn('npm', ['run', 'dev'], {
        stdio: 'pipe',
        shell: true,
        cwd: path.join(__dirname, 'frontend')
      });

      frontendProcess.stdout.on('data', (data) => {
        console.log(`Frontend: ${data.toString().trim()}`);
      });

      frontendProcess.stderr.on('data', (data) => {
        console.log(`Frontend Error: ${data.toString().trim()}`);
      });

      frontendProcess.on('close', (code) => {
        console.log(`Frontend process exited with code ${code}`);
      });

      console.log('\n✅ All services started!');
      console.log('📱 Frontend: http://localhost:3000');
      console.log('🔧 Backend API: http://localhost:3003');
      console.log('📚 API Docs: http://localhost:3003/api');
      console.log('\nPress Ctrl+C to stop all services...\n');

      // Handle graceful shutdown
      process.on('SIGINT', () => {
        console.log('\n🛑 Stopping all services...');
        if (!mongoRunning) {
          mongoProcess?.kill();
        }
        backendProcess.kill();
        frontendProcess.kill();
        process.exit(0);
      });

    }, 3000); // Wait 3 seconds for backend

  }, mongoRunning ? 1000 : 5000); // Wait less if MongoDB is already running
});
