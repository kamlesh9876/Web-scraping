export const SCRAPING_CONSTANTS = {
  WOB_BASE_URL: 'https://www.worldofbooks.com',
  MAX_CONCURRENCY: 2,
  DELAY_BETWEEN_REQUESTS: 1000, // 1 second
  REQUEST_TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_BASE: 2000, // 2 seconds base, exponential backoff
  USER_AGENT: 'WorldOfBooksScraper/1.0 (+https://github.com/your-repo)',
  RESPECT_ROBOTS: true,
  MIN_DELAY_BETWEEN_PAGES: 2000, // 2 seconds minimum between page navigations
};

export const TTL_CONSTANTS = {
  NAVIGATION_TTL_HOURS: 24,
  CATEGORIES_TTL_HOURS: 24,
  PRODUCTS_TTL_HOURS: 12,
  PRODUCT_DETAIL_TTL_HOURS: 6,
  CACHE_CHECK_TTL_HOURS: 1, // Check if data is fresh within last hour
  
  // Short names for backward compatibility
  NAVIGATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  CATEGORIES: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  PRODUCT_GRID: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
  PRODUCT_DETAIL: 6 * 60 * 60 * 1000, // 6 hours in milliseconds
};

export const QUEUE_NAMES = {
  SCRAPE_NAVIGATION: 'scrape-navigation',
  SCRAPE_CATEGORIES: 'scrape-categories',
  SCRAPE_PRODUCTS: 'scrape-products',
  SCRAPE_PRODUCT_DETAIL: 'scrape-product-detail',
  SCRAPE_REVIEWS: 'scrape-reviews',
};

export const RATE_LIMITING = {
  MAX_REQUESTS_PER_MINUTE: 30, // Reduced from 100 to be more respectful
  BURST_LIMIT: 5, // Allow small bursts
  BURST_WINDOW_MS: 60000, // 1 minute burst window
};
