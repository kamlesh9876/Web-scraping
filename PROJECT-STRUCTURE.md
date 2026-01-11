# 📁 Project Structure

## 🚀 Clean Project Overview

This document outlines the cleaned and organized project structure for the World of Books scraper.

## 📂 Directory Structure

```
Ablespace/
├── 📄 Configuration Files
│   ├── package.json              # Root package with scripts and deps
│   ├── package-lock.json         # Dependency lock file
│   ├── tsconfig.json           # TypeScript configuration
│   ├── nest-cli.json           # NestJS CLI configuration
│   ├── .gitignore              # Git ignore rules
│   ├── Dockerfile              # Docker configuration
│   └── .env                   # Environment variables (gitignored)
│
├── 📄 Documentation
│   ├── README.md               # Main project documentation
│   ├── README-DEV.md          # Development setup guide
│   └── PROJECT-STRUCTURE.md   # This file
│
├── 📄 Development Scripts
│   ├── start-concurrent.js      # Main development script
│   └── clean-project.js        # Project cleanup script
│
├── 📂 Backend (NestJS)
│   └── src/
│       ├── modules/            # Feature modules
│       │   ├── navigation/     # Navigation scraping
│       │   ├── category/       # Category scraping
│       │   ├── product/        # Product scraping
│       │   ├── product-detail/ # Product detail scraping
│       │   ├── review/         # Review management
│       │   ├── scrape-job/     # Scrape job tracking
│       │   ├── queue/          # Queue management
│       │   └── common/         # Shared utilities
│       ├── app.module.ts        # Root module
│       ├── main.ts             # Application entry
│       └── *.spec.ts           # Test files
│
├── 📂 Frontend (Next.js)
│   └── src/
│       ├── app/               # App Router pages
│       │   ├── page.tsx       # Home page
│       │   ├── layout.tsx      # Root layout
│       │   ├── about/          # About page
│       │   ├── category/       # Category pages
│       │   └── product/        # Product pages
│       ├── components/         # Reusable components
│       │   ├── Layout.tsx      # Main layout
│       │   ├── LoadingSpinner.tsx
│       │   ├── ProductCard.tsx
│       │   └── SearchBar.tsx
│       ├── hooks/             # React hooks
│       │   ├── useNavigation.ts
│       │   ├── useProducts.ts
│       │   └── *.ts
│       ├── lib/               # Utilities
│       │   └── api.ts        # API client
│       ├── types/             # TypeScript types
│       │   └── index.ts       # Type definitions
│       ├── next.config.js      # Next.js config
│       ├── tailwind.config.js  # Tailwind CSS config
│       ├── tsconfig.json      # Frontend TS config
│       └── package.json       # Frontend deps
│
└── 📂 Git Repository
    └── .git/                 # Git version control
```

## 🧹 Cleaned Files

### ✅ Removed
- `node_modules/` (backend & frontend)
- `dist/` (backend build output)
- `frontend/.next/` (Next.js build cache)
- `frontend/out/` (Next.js static export)
- `.cache/` directories
- `logs/` directories
- `*.log` files
- `.env` files (keeping examples)
- `coverage/` directories
- `*.tmp` and `*.temp` files
- `.DS_Store` and `Thumbs.db`
- VS Code settings files
- Redis zip files and directory
- Redundant development scripts

### ✅ Preserved
- Essential configuration files
- Documentation
- Source code
- Main development script (`start-concurrent.js`)
- Cleanup script (`clean-project.js`)
- Environment examples (`.env.example`)
- Git configuration

## 🚀 Available Scripts

### Development
```bash
npm run dev              # Start both servers (recommended)
npm run dev:backend      # Backend only
npm run dev:frontend     # Frontend only
npm run setup           # Install deps + start
```

### Cleanup
```bash
npm run clean           # Full cleanup
npm run clean:deps      # Dependencies only
npm run clean:build     # Build outputs only
npm run clean:cache     # Cache files only
npm run reset           # Clean + reinstall
```

### Production
```bash
npm run build           # Build for production
npm run start           # Start production server
npm run test            # Run tests
npm run lint            # Run linting
```

## 🌐 Access Points

### Development
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api

### Production
- **Frontend**: Configured by deployment
- **Backend API**: Configured by deployment
- **API Documentation**: `/api` endpoint

## 📦 Dependencies

### Backend (NestJS)
- Core: NestJS, Express, Mongoose
- Scraping: Crawlee, Playwright
- Queue: BullMQ, Redis
- Utilities: Class-validator, Config

### Frontend (Next.js)
- Core: Next.js 14, React 18
- Styling: Tailwind CSS, Lucide React
- Data: React Query, Axios
- Types: TypeScript

## 🎯 Best Practices

### Development Workflow
1. Use `npm run setup` for new environments
2. Use `npm run dev` for daily development
3. Use `npm run clean` before major changes
4. Commit changes regularly
5. Use `npm run reset` for fresh start

### Code Organization
- Keep components reusable
- Use TypeScript strictly
- Follow NestJS patterns
- Implement proper error handling
- Write tests for new features

### Performance
- Use React Query for caching
- Implement proper loading states
- Optimize images and assets
- Use lazy loading where appropriate

---

**This clean structure ensures maintainability, performance, and developer productivity!** 🚀✨
