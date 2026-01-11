# World of Books API Gateway

Public API gateway for accessing World of Books scraped data.

## Features

- **Navigation API**: Browse navigation structure
- **Category API**: Access book categories  
- **Product API**: Search and filter products
- **History Tracking**: User browsing history
- **Rate Limiting**: 100 requests per minute
- **CORS Support**: Cross-origin requests
- **Swagger Documentation**: Auto-generated API docs

## Architecture

```
┌─────────────┐
│   Frontend   │
└─────────────┘
       │
       ▼
┌─────────────┐
│ API Gateway  │  ← You are here
└─────────────┘
       │
       ▼
┌─────────────┐
│ Scraper      │
│ Service      │
└─────────────┘
```

## API Endpoints

### Navigation
- `GET /api/navigation` - Get all navigation items
- `GET /api/navigation/:slug` - Get specific navigation
- `POST /api/navigation/refresh` - Trigger refresh

### Categories  
- `GET /api/categories/navigation/:slug` - Categories by navigation
- `GET /api/categories/:slug` - Specific category

### Products
- `GET /api/products` - Products with pagination/filtering
- `GET /api/products/:sourceId` - Product details

### History
- `POST /api/history` - Save browsing history
- `GET /api/history/session/:sessionId` - Session history
- `GET /api/history/user/:userId` - User history

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your MongoDB and scraper service URLs
```

3. Run development:
```bash
npm run start:dev
```

4. Build for production:
```bash
npm run build
npm run start:prod
```

## Docker

```bash
docker build -t api-gateway .
docker run -p 3001:3001 api-gateway
```

## API Documentation

Start the service and visit: `http://localhost:3001/api`

## Dependencies

- **NestJS**: Web framework
- **MongoDB**: History storage  
- **Axios**: HTTP client for scraper service calls
- **UUID**: Session ID generation
- **Class Validator**: Input validation
- **Throttler**: Rate limiting
- **Swagger**: API documentation
