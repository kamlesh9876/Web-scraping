import axios from 'axios';
import { Navigation, Category, Product, ProductDetail, Review, PaginatedResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Navigation API
export const navigationApi = {
  getAll: (): Promise<Navigation[]> => 
    api.get('/navigation').then(res => res.data),
  getBySlug: (slug: string): Promise<Navigation> => 
    api.get(`/navigation/${slug}`).then(res => res.data),
  refresh: (): Promise<{ message: string }> => 
    api.post('/navigation/refresh').then(res => res.data),
};

// Categories API
export const categoriesApi = {
  getByNavigation: (navigationSlug: string): Promise<Category[]> => 
    api.get(`/categories/navigation/${navigationSlug}`).then(res => res.data),
  getBySlug: (slug: string): Promise<Category> => 
    api.get(`/categories/${slug}`).then(res => res.data),
};

// Products API
export const productsApi = {
  getAll: (params?: {
    categorySlug?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Product>> => {
    const searchParams = new URLSearchParams();
    if (params?.categorySlug) searchParams.append('categorySlug', params.categorySlug);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    return api.get(`/products?${searchParams.toString()}`).then(res => res.data);
  },
  getBySourceId: (sourceId: string): Promise<Product> => 
    api.get(`/products/${sourceId}`).then(res => res.data),
};

// Product Details API
export const productDetailsApi = {
  getBySourceId: (sourceId: string): Promise<ProductDetail> => 
    api.get(`/product-details/${sourceId}`).then(res => res.data),
};

// Reviews API
export const reviewsApi = {
  getByProduct: (productSourceId: string): Promise<Review[]> => 
    api.get(`/reviews/product/${productSourceId}`).then(res => res.data),
  getBySourceId: (sourceId: string): Promise<Review> => 
    api.get(`/reviews/${sourceId}`).then(res => res.data),
};

// Scrape Jobs API
export const scrapeJobsApi = {
  getAll: (): Promise<any[]> => 
    api.get('/scrape-jobs').then(res => res.data),
  getById: (id: string): Promise<any> => 
    api.get(`/scrape-jobs/${id}`).then(res => res.data),
};
