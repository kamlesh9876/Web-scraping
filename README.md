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
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your MongoDB and Redis URLs
```

3. Run the application:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

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
