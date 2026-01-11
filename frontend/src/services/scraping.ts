import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Scraping trigger endpoints
export const scrapingApi = {
  // Trigger scraping jobs
  scrapeNavigation: () => 
    api.post('/scrape/navigation'),
  
  scrapeCategories: (navigationSlug: string) => 
    api.post('/scrape/categories', { navigationSlug }),
  
  scrapeProducts: (params: { navigationSlug: string; categorySlug: string }) => 
    api.post('/scrape/products', params),
  
  // Get scraping jobs
  getJobs: () => 
    api.get('/scrape-jobs').then(res => res.data),
  
  getJobById: (id: string) => 
    api.get(`/scrape-jobs/${id}`).then(res => res.data),
};

// Data viewing endpoints
export const dataApi = {
  // Navigation data
  getNavigation: () => 
    api.get('/navigation').then(res => res.data),
  
  getNavigationBySlug: (slug: string) => 
    api.get(`/navigation/${slug}`).then(res => res.data),
  
  // Categories data
  getCategoriesByNavigation: (navigationSlug: string) => 
    api.get(`/categories/navigation/${navigationSlug}`).then(res => res.data),
  
  getCategoryBySlug: (slug: string) => 
    api.get(`/categories/${slug}`).then(res => res.data),
  
  // Products data
  getProducts: (params?: {
    categorySlug?: string;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.categorySlug) searchParams.append('categorySlug', params.categorySlug);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    return api.get(`/products?${searchParams.toString()}`).then(res => res.data);
  },
  
  getProductBySourceId: (sourceId: string) => 
    api.get(`/products/${sourceId}`).then(res => res.data),
};

// System status
export const systemApi = {
  getStatus: () => 
    api.get('/system/status').then(res => res.data),
  
  getStats: () => 
    api.get('/system/stats').then(res => res.data),
};
