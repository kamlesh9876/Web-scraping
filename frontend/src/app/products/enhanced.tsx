'use client';

import React, { useState, useEffect } from 'react';
import { dataApi } from '@/services/scraping';
import { Button } from '@/components/Button';
import { Table, TableColumn } from '@/components/Table';
import { ProductCard } from '@/components/ProductCard';
import Search from '@/components/Search';
import { ProductItem, CategoryItem, NavigationItem } from '@/types/scraping';

interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  author?: string;
  sortBy?: 'relevance' | 'price_low' | 'price_high' | 'title' | 'date';
}

export default function EnhancedProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });
  const [filters, setFilters] = useState<ProductFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch navigation on mount
  useEffect(() => {
    fetchNavigation();
  }, []);

  // Fetch products when category or filters change
  useEffect(() => {
    if (selectedCategory || searchQuery) {
      fetchProducts();
    }
  }, [selectedCategory, searchQuery, pagination.page]);

  const fetchNavigation = async () => {
    try {
      setLoading(true);
      const navData = await dataApi.getNavigation();
      setNavigation(navData);
      
      // Fetch first navigation's categories
      if (navData.length > 0) {
        const catData = await dataApi.getCategoriesByNavigation(navData[0].slug);
        setCategories(catData);
        if (catData.length > 0 && !selectedCategory) {
          setSelectedCategory(catData[0].slug);
        }
      }
    } catch (error) {
      console.error('Failed to fetch navigation:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await dataApi.getProducts({
        categorySlug: selectedCategory,
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      });
      
      setProducts(response.products);
      setPagination(prev => ({
        ...prev,
        total: response.total,
        page: pagination.page
      }));
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string, searchFilters: ProductFilters) => {
    setSearchQuery(query);
    setFilters(searchFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when searching
  };

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when category changes
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  // Define table columns
  const columns: TableColumn<ProductItem>[] = [
    {
      key: 'title',
      header: 'Title',
      render: (product) => React.createElement('div', {
        className: 'max-w-xs truncate',
        children: product.title
      })
    },
    {
      key: 'author',
      header: 'Author',
      render: (product) => React.createElement('div', {
        className: 'text-sm text-gray-600',
        children: product.author || '-'
      })
    },
    {
      key: 'price',
      header: 'Price',
      render: (product) => React.createElement('div', {
        className: 'font-semibold text-green-600',
        children: `${product.currency} ${product.price.toFixed(2)}`
      })
    },
    {
      key: 'condition',
      header: 'Condition',
      render: (product) => React.createElement('span', {
        className: 'px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded',
        children: product.condition || 'N/A'
      })
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (product) => React.createElement('a', {
        href: product.source_url,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline',
        children: 'View Details →'
      })
    }
  ];

  return React.createElement('div', {
    className: 'min-h-screen bg-gray-50 p-6',
    children: [
      // Header
      React.createElement('header', {
        className: 'mb-8',
        children: React.createElement('div', {
          className: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
          children: [
            React.createElement('h1', {
              className: 'text-2xl font-bold text-gray-900',
              children: '📦 Products'
            }),
            React.createElement('p', {
              className: 'text-gray-600',
              children: 'Browse and search through the complete product catalog'
            })
          ]
        })
      }),

      // Search and Filters
      React.createElement('div', {
        className: 'mb-8',
        children: React.createElement(Search, {
          onSearch: handleSearch,
          loading: loading
        })
      }),

      // Category Filter
      React.createElement('div', {
        className: 'mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6',
        children: [
          React.createElement('h2', {
            className: 'text-lg font-semibold text-gray-900 mb-4',
            children: '📂 Categories'
          }),
          React.createElement('div', {
            className: 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4',
            children: [
              // All Categories Option
              React.createElement('button', {
                onClick: () => handleCategoryChange(''),
                className: `p-3 rounded-lg border ${
                  !selectedCategory 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border transition-colors duration-200`,
                children: 'All Categories'
              }),
              // Category List
              categories.map(category => 
                React.createElement('button', {
                  key: category.slug,
                  onClick: () => handleCategoryChange(category.slug),
                  className: `p-3 rounded-lg border ${
                    selectedCategory === category.slug
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } border transition-colors duration-200`,
                  children: [
                    React.createElement('div', {
                      className: 'font-medium text-gray-900',
                      children: category.title
                    }),
                    React.createElement('div', {
                      className: 'text-sm text-gray-500',
                      children: `${category.product_count || 0} products`
                    })
                  ]
                })
              )
            ]
          })
        ]
      }),

      // Products Grid
      React.createElement('div', {
        className: 'mb-8',
        children: [
          // Results Header
          React.createElement('div', {
            className: 'flex justify-between items-center mb-4',
            children: [
              React.createElement('h2', {
                className: 'text-lg font-semibold text-gray-900',
                children: searchQuery 
                  ? `🔍 Search Results: "${searchQuery}"`
                  : selectedCategory 
                    ? `📦 Category: ${selectedCategory}`
                    : '📦 All Products'
              }),
              React.createElement('div', {
                className: 'text-sm text-gray-600',
                children: `Showing ${products.length} of ${pagination.total} products`
              })
            ]
          }),

          // Loading State
          loading && React.createElement('div', {
            className: 'text-center py-8',
            children: React.createElement('div', {
              className: 'inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900',
              role: 'status',
              children: [
                React.createElement('span', {
                  className: 'sr-only',
                  children: 'Loading...'
                })
              ]
            })
          }),

          // Products Grid or Table
          !loading && products.length > 0 && React.createElement('div', {
            className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
            children: products.map(product => 
              React.createElement(ProductCard, {
                key: product.id,
                product: product
              })
            )
          }),

          // No Results
          !loading && !loading && products.length === 0 && React.createElement('div', {
            className: 'text-center py-16',
            children: [
              React.createElement('div', {
                className: 'text-gray-500 mb-4',
                children: '📭 No products found'
              }),
              React.createElement('p', {
                className: 'text-gray-600',
                children: searchQuery 
                  ? `No results found for "${searchQuery}". Try different search terms or browse categories.`
                  : selectedCategory 
                    ? `No products found in this category.`
                    : 'No products found. Try selecting a category or adjusting your search.'
              })
            ]
          }),

          // Pagination
          pagination.total > pagination.limit && React.createElement('div', {
            className: 'flex justify-center items-center space-x-2 mt-8',
            children: [
              React.createElement('button', {
                onClick: () => handlePageChange(Math.max(1, pagination.page - 1)),
                disabled: pagination.page <= 1,
                className: 'px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
                children: 'Previous'
              }),
              React.createElement('span', {
                className: 'text-gray-700',
                children: `Page ${pagination.page} of ${Math.ceil(pagination.total / pagination.limit)}`
              }),
              React.createElement('button', {
                onClick: () => handlePageChange(Math.min(pagination.page + 1, Math.ceil(pagination.total / pagination.limit))),
                disabled: pagination.page >= Math.ceil(pagination.total / pagination.limit),
                className: 'px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
                children: 'Next'
              })
            ]
          })
        ]
      })
    ]
  });
}
