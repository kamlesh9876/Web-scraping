'use client';

import React, { useState, useCallback } from 'react';

interface SearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  loading?: boolean;
}

interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  author?: string;
  sortBy?: 'relevance' | 'price_low' | 'price_high' | 'title' | 'date';
}

export default function Search({ onSearch, loading = false }: SearchProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = useCallback(() => {
    onSearch(query.trim(), filters);
  }, [query, filters, onSearch]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
    setQuery('');
    onSearch('', {});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleSelectChange = (key: keyof SearchFilters) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    handleFilterChange(key, value === '' ? undefined : value);
  };

  return React.createElement('div', {
    className: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
    children: [
      React.createElement('h3', {
        className: 'text-lg font-semibold text-gray-900 mb-4',
        children: '🔍 Search Products'
      }),
      
      // Search Input
      React.createElement('div', {
        className: 'flex space-x-4 mb-4',
        children: [
          React.createElement('input', {
            type: 'text',
            value: query,
            onChange: handleInputChange,
            placeholder: 'Search by title, author, ISBN...',
            className: 'flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            disabled: loading
          }),
          React.createElement('button', {
            onClick: handleSearch,
            disabled: loading,
            className: 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
            children: loading ? 'Searching...' : '🔍 Search'
          })
        ]
      }),
      
      // Filter Toggle
      React.createElement('div', {
        className: 'mb-4 text-right',
        children: React.createElement('button', {
          onClick: () => setShowFilters(!showFilters),
          className: 'text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline',
          children: showFilters ? 'Hide Filters' : 'Show Filters'
        })
      }),
      
      // Filters Panel
      showFilters && React.createElement('div', {
        className: 'bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200',
        children: [
          React.createElement('h4', {
            className: 'font-medium text-gray-900 mb-4',
            children: '🎛 Filter Options'
          }),
          
          React.createElement('div', {
            className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
            children: [
              // Category Filter
              React.createElement('div', {
                children: [
                  React.createElement('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Category'
                  }),
                  React.createElement('select', {
                    value: filters.category || '',
                    onChange: (e) => handleSelectChange('category', e),
                    className: 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                    children: [
                      React.createElement('option', {
                        value: '',
                        children: 'All Categories'
                      }),
                      React.createElement('option', {
                        value: 'fiction',
                        children: 'Fiction'
                      }),
                      React.createElement('option', {
                        value: 'non-fiction',
                        children: 'Non-Fiction'
                      }),
                      React.createElement('option', {
                        value: 'childrens-books',
                        children: 'Children\'s Books'
                      }),
                      React.createElement('option', {
                        value: 'academic',
                        children: 'Academic'
                      })
                    ]
                  })
                ]
              }),
              
              // Price Range
              React.createElement('div', {
                children: [
                  React.createElement('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Price Range'
                  }),
                  React.createElement('div', {
                    className: 'flex space-x-2',
                    children: [
                      React.createElement('input', {
                        type: 'number',
                        value: filters.minPrice || '',
                        onChange: (e) => handleFilterChange('minPrice', e.currentTarget.value ? parseFloat(e.currentTarget.value) : undefined),
                        placeholder: 'Min',
                        className: 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                      }),
                      React.createElement('input', {
                        type: 'number',
                        value: filters.maxPrice || '',
                        onChange: (e) => handleFilterChange('maxPrice', e.currentTarget.value ? parseFloat(e.currentTarget.value) : undefined),
                        placeholder: 'Max',
                        className: 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                      })
                    ]
                  })
                ]
              }),
              
              // Sort By
              React.createElement('div', {
                children: [
                  React.createElement('label', {
                    className: 'block text-sm font-medium text-gray-700 mb-2',
                    children: 'Sort By'
                  }),
                  React.createElement('select', {
                    value: filters.sortBy || 'relevance',
                    onChange: (e) => handleSelectChange('sortBy', e),
                    className: 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                    children: [
                      React.createElement('option', {
                        value: 'relevance',
                        children: 'Relevance'
                      }),
                      React.createElement('option', {
                        value: 'price_low',
                        children: 'Price: Low to High'
                      }),
                      React.createElement('option', {
                        value: 'price_high',
                        children: 'Price: High to Low'
                      }),
                      React.createElement('option', {
                        value: 'title',
                        children: 'Title: A to Z'
                      }),
                      React.createElement('option', {
                        value: 'date',
                        children: 'Date: Newest First'
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          
          // Clear Filters Button
          React.createElement('div', {
            className: 'flex justify-end',
            children: React.createElement('button', {
              onClick: clearFilters,
              className: 'px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500',
              children: 'Clear Filters'
            })
          })
        ]
      })
    ]
  });
}
