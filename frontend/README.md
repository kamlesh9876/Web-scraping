# World of Books Frontend

A modern, responsive web application for browsing and discovering affordable used books from World of Books.

## Features

- **Modern Tech Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Data Fetching**: React Query for efficient caching and state management
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Accessibility**: WCAG AA compliance basics
- **Smooth UX**: Loading states, transitions, and micro-interactions
- **Type Safety**: Full TypeScript coverage

## Pages & Components

### Core Pages
- **Home** (`/`) - Landing page with navigation categories and features
- **Category Drilldown** (`/category/[slug]`) - Product grid for specific categories
- **Product Detail** (`/product/[sourceId]`) - Detailed book information with reviews
- **About** (`/about`) - Project information and features

### Key Components
- **Layout** - Consistent header, footer, and navigation
- **Product Cards** - Hover effects, image lazy loading
- **Loading States** - Skeleton screens and spinners
- **Error Boundaries** - Graceful error handling

## User Experience

### Responsive Design
- Mobile-first CSS with Tailwind breakpoints
- Touch-friendly interactions
- Optimized images and performance

### Accessibility
- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

### Performance Features
- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- React Query caching and background refetching
- Minimal bundle size with tree shaking

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API URLs
   ```

3. **Development**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

## API Integration

The frontend connects to the backend API for:
- Navigation data and categories
- Product listings with pagination
- Detailed product information
- User reviews and ratings
- Search and filtering

## Design Principles

- **Minimal & Clean**: Focus on content over chrome
- **Performance First**: Fast loading and smooth interactions
- **Human-Centered**: Intuitive book discovery experience
- **Ethical**: Respect data usage and user privacy

## Future Enhancements

- Advanced search with filters
- User accounts and reading lists
- Book recommendations engine
- Reading progress tracking
- Mobile app companion
