// Scraping system interfaces for control panel

export interface ScrapeJob {
  id: string;
  type: 'navigation' | 'categories' | 'products' | 'product-detail';
  status: 'idle' | 'running' | 'completed' | 'failed';
  startedAt?: string;
  completedAt?: string;
  errorMessage?: string;
  progress?: number;
  totalItems?: number;
}

export interface ScrapeJobRequest {
  type: 'navigation' | 'categories' | 'products';
  navigationSlug?: string;
  categorySlug?: string;
  url?: string;
}

export interface SystemStatus {
  totalJobs: number;
  runningJobs: number;
  completedJobs: number;
  failedJobs: number;
  lastRun?: string;
}

export interface NavigationItem {
  title: string;
  slug: string;
  url: string;
  createdAt: string;
}

export interface CategoryItem {
  title: string;
  slug: string;
  url: string;
  navigationSlug: string;
  createdAt: string;
}

export interface ProductItem {
  title: string;
  price: number;
  currency: string;
  imageUrl: string;
  sourceUrl: string;
  sourceId: string;
  createdAt: string;
}
