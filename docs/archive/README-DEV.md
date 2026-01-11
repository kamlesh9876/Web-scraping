# 🚀 Development Setup Guide

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm 8+
- MongoDB (running locally or connection string)

### One-Command Setup & Start

```bash
# Install all dependencies (backend + frontend) and start both servers
npm run setup
```

### Individual Commands

```bash
# Install dependencies for both backend and frontend
npm run install:all

# Start both backend and frontend in development mode
npm run dev

# Start only backend
npm run dev:backend

# Start only frontend
npm run dev:frontend

# Start both servers with the custom script
node start-dev.js
```

## 🌐 Access Points

Once running, you can access:

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api
- **MongoDB**: mongodb://localhost:27017/world-of-books

## 📁 Project Structure

```
Ablespace/
├── start-dev.js          # Main development script
├── package.json          # Root package with dev scripts
├── src/                 # Backend (NestJS)
│   ├── modules/
│   ├── common/
│   └── main.ts
├── frontend/            # Frontend (Next.js)
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── lib/
│   ├── package.json
│   └── next.config.js
└── README-DEV.md       # This file
```

## 🛠 Development Features

### Custom Development Script (`start-dev.js`)
- ✅ **Auto-install dependencies** if missing
- ✅ **Color-coded console output** for easy debugging
- ✅ **Simultaneous server startup** with proper process management
- ✅ **Graceful shutdown** on Ctrl+C
- ✅ **Real-time log output** from both servers
- ✅ **Error handling** and process monitoring

### Package.json Scripts
- `npm run dev` - Start both servers
- `npm run dev:backend` - Backend only
- `npm run dev:frontend` - Frontend only
- `npm run install:all` - Install all dependencies
- `npm run setup` - Install + start both servers

## 🔧 Environment Setup

### Backend Environment (.env)
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/world-of-books
REDIS_URL=redis://localhost:6379
```

### Frontend Environment (frontend/.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

## 🐛 Troubleshooting

### Port Conflicts
- Backend defaults to port 3000
- Frontend defaults to port 3001 (3000 fallback)
- If ports are occupied, servers will automatically try alternatives

### Common Issues
1. **MongoDB not running**: Start MongoDB service
2. **Port conflicts**: Check for other services using ports 3000/3001
3. **Dependencies missing**: Run `npm run install:all`
4. **Permission errors**: Ensure proper file permissions

### Development Tips
- Use `npm run dev` for full development experience
- Backend hot-reloads on file changes
- Frontend hot-reloads on file changes
- Check console output for real-time logs
- Use Ctrl+C to gracefully stop both servers

## 📦 Production Build

```bash
# Build frontend for production
npm run build

# Start production servers
npm start
```

## 🧪 Testing

```bash
# Run backend tests
npm test

# Run frontend tests
cd frontend && npm test

# Run with coverage
npm run test:cov
```

## 🐳 Docker Development (Optional)

```bash
# Build and run with Docker
docker-compose up --build

# Stop containers
docker-compose down
```

---

**Happy Development! 🎉**
