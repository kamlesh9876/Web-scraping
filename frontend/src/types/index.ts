export interface Navigation {
  _id: string;
  title: string;
  slug: string;
  url: string;
  last_scraped_at?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  url: string;
  navigation_slug: string;
  last_scraped_at?: string;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  currency: string;
  image_url: string;
  source_url: string;
  source_id: string;
  category_slug?: string;
  last_scraped_at?: string;
}

export interface ProductDetail {
  _id: string;
  title: string;
  author?: string;
  isbn?: string;
  publisher?: string;
  description?: string;
  price: number;
  currency: string;
  image_url: string;
  source_url: string;
  source_id: string;
  last_scraped_at?: string;
}

export interface Review {
  _id: string;
  product_source_id: string;
  rating: number;
  title: string;
  content: string;
  reviewer?: string;
  date?: string;
  last_scraped_at?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  products: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BrowsingHistory {
  navigationSlug?: string;
  categorySlug?: string;
  productSourceId?: string;
  timestamp: string;
  type: 'navigation' | 'category' | 'product';
}
