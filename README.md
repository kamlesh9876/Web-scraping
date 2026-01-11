# World of Books Scraper Service

A NestJS-based scraping service for safely extracting data from World of Books website and storing it in MongoDB.

## Features

- **Safe Scraping**: Uses Crawlee + Playwright with rate limiting and concurrency controls
- **Queue-Based**: BullMQ + Redis for async scraping operations
- **TTL Caching**: Automatic data refresh based on configurable TTL
- **MongoDB Storage**: Structured data storage with proper indexes
- **REST API**: Clean endpoints for accessing scraped data
- **Error Handling**: Comprehensive logging and retry mechanisms

## Architecture

```
scraper-service/
├── src/
│   ├── modules/
│   │   ├── navigation/     # Navigation menu items
│   │   ├── category/       # Book categories
│   │   ├── product/        # Product listings
│   │   ├── product-detail/ # Detailed product info
│   │   ├── review/         # Product reviews
│   │   ├── scrape-job/     # Job tracking
│   │   └── queue/          # Worker logic
│   ├── common/             # Shared utilities
│   ├── main.ts            # Application entry
│   └── app.module.ts      # Root module
├── package.json
├── Dockerfile
└── README.md
```

## API Endpoints

- `GET /navigation` - List all navigation items
- `GET /navigation/:slug` - Get specific navigation item
- `GET /categories/:navigationSlug` - Categories under navigation
- `GET /products` - Filter products by category + pagination
- `GET /products/:id` - Product details
- `POST /scrape/refresh` - Trigger data refresh

## TTL Strategy

- Navigation: 24 hours
- Categories: 24 hours  
- Product grid: 12 hours
- Product detail: 6 hours

## Setup

1. Install dependencies:
```bash
npm run install:all
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your MongoDB and Redis URLs
```

3. Run the application:
```bash
# Development (both backend and frontend)
npm run dev

# Backend only
npm run start:dev

# Frontend only
npm run dev:frontend

# Production (backend only)
npm run build
npm run start:prod
```

## Quick Start

For the complete development experience:
```bash
npm run setup
```

This will install all dependencies and start both backend (port 3000) and frontend (port 3001).

## Access Points

- **Backend API**: http://localhost:3000
- **Frontend Control Panel**: http://localhost:3001
- **API Documentation**: http://localhost:3000/api

## Docker

```bash
docker build -t scraper-service .
docker run -p 3000:3000 scraper-service
```

## Scraping Ethics

- Max concurrency: 2 requests
- 1 second delay between requests
- Respect robots.txt
- No aggressive scraping patterns

## Dependencies

- **NestJS**: Web framework
- **Crawlee**: Scraping framework
- **Playwright**: Browser automation
- **MongoDB**: Data storage
- **BullMQ**: Job queue
- **Redis**: Queue backend

## Developer Guide

### Prerequisites
- Node.js 16+ 
- npm 8+
- MongoDB (running locally or connection string)

### Development Scripts

```bash
# Install all dependencies (backend + frontend)
npm run install:all

# Start both backend and frontend in development mode
npm run dev

# Start only backend
npm run dev:backend

# Start only frontend
npm run dev:frontend

# Clean up project
npm run clean

# Find duplicate files
npm run clean:duplicates

# Reset everything
npm run reset
```

### Project Structure

```
Ablespace/
├── scripts/             # Development and utility scripts
│   ├── cleanup/         # Maintenance scripts
│   ├── windows/         # Windows-specific scripts
│   ├── start-all.js     # Start all services
│   └── start-concurrent.js # Development server runner
├── src/                # Backend (NestJS)
│   ├── modules/
│   ├── common/
│   └── main.ts
├── frontend/           # Frontend (Next.js)
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   └── package.json
├── docs/               # Documentation
│   └── archive/        # Archived planning docs
└── package.json        # Root package with dev scripts
```
