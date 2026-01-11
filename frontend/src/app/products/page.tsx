'use client';

import React, { useState, useEffect } from 'react';
import { dataApi } from '@/services/scraping';
import { Button } from '@/components/Button';
import { Table } from '@/components/Table';
import { ProductItem, CategoryItem, NavigationItem } from '@/types/scraping';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0 });

  useEffect(() => {
    fetchNavigation();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory, pagination.page]);

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

  const fetchProducts = async (categorySlug: string) => {
    try {
      setLoading(true);
      const data = await dataApi.getProducts({
        categorySlug,
        page: pagination.page,
        limit: pagination.limit,
      });
      setProducts(data.items || data);
      setPagination(prev => ({ ...prev, total: data.total || data.length }));
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toFixed(2)}`;
  };

  const columns = [
    {
      key: 'imageUrl' as keyof ProductItem,
      header: 'Image',
      render: (value: string) => value ? React.createElement(
        'img',
        {
          src: value,
          alt: 'Product',
          className: 'w-12 h-12 object-cover rounded',
        }
      ) : React.createElement(
        'div',
        { className: 'w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs' },
        'No img'
      ),
    },
    {
      key: 'title' as keyof ProductItem,
      header: 'Title',
      render: (value: string) => React.createElement(
        'div',
        { className: 'max-w-xs truncate' },
        value
      ),
    },
    {
      key: 'price' as keyof ProductItem,
      header: 'Price',
      render: (value: number, row: ProductItem) => formatPrice(value, row.currency),
    },
    {
      key: 'sourceUrl' as keyof ProductItem,
      header: 'Source URL',
      render: (value: string) => React.createElement(
        'a',
        {
          href: value,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'text-blue-600 hover:text-blue-800 underline text-sm',
        },
        'View'
      ),
    },
    {
      key: 'createdAt' as keyof ProductItem,
      header: 'Created At',
      render: (value: string) => formatDate(value),
    },
  ];

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  if (loading && navigation.length === 0) {
    return React.createElement(
      'div',
      { className: 'min-h-screen bg-white flex items-center justify-center' },
      React.createElement(
        'div',
        { className: 'text-center' },
        React.createElement(
          'div',
          { className: 'text-lg text-gray-600' },
          'Loading products data...'
        )
      )
    );
  }

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-white' },
    React.createElement(
      'div',
      { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8' },
      React.createElement(
        'div',
        { className: 'space-y-8' },
        
        // Header
        React.createElement(
          'div',
          { className: 'flex justify-between items-center border-b border-gray-200 pb-8' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'h1',
              { className: 'text-3xl font-bold text-gray-900' },
              'Products Data'
            ),
            React.createElement(
              'p',
              { className: 'text-gray-600 mt-2' },
              `Total items: ${pagination.total} (showing ${products.length})`
            )
          ),
          React.createElement(
            Button,
            { onClick: () => fetchProducts(selectedCategory), disabled: loading || !selectedCategory },
            'Refresh'
          )
        ),

        // Category Selector
        React.createElement(
          'div',
          { className: 'bg-white p-6 rounded-lg border border-gray-200 shadow' },
          React.createElement(
            'h2',
            { className: 'text-lg font-semibold text-gray-900 mb-4' },
            'Select Category'
          ),
          React.createElement(
            'div',
            { className: 'flex items-center space-x-4' },
            React.createElement(
              'label',
              { className: 'text-sm font-medium text-gray-700' },
              'Category:'
            ),
            React.createElement(
              'select',
              {
                value: selectedCategory,
                onChange: (e: any) => setSelectedCategory(e.target.value),
                className: 'block w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
              },
              categories.map((cat) =>
                React.createElement(
                  'option',
                  { key: cat.slug, value: cat.slug },
                  cat.title
                )
              )
            )
          )
        ),

        // Products Table
        React.createElement(
          'div',
          { className: 'bg-white p-6 rounded-lg border border-gray-200 shadow' },
          React.createElement(
            'h2',
            { className: 'text-lg font-semibold text-gray-900 mb-4' },
            `Products for ${categories.find(c => c.slug === selectedCategory)?.title || 'Selected Category'}`
          ),
          React.createElement(Table, {
            data: products,
            columns: columns,
            emptyMessage: 'No products available for this category. Start scraping to populate this table.',
          }),
          
          // Pagination
          pagination.total > pagination.limit && React.createElement(
            'div',
            { className: 'flex justify-between items-center mt-6 pt-6 border-t border-gray-200' },
            React.createElement(
              'div',
              { className: 'text-sm text-gray-700' },
              `Showing ${((pagination.page - 1) * pagination.limit) + 1} to ${Math.min(pagination.page * pagination.limit, pagination.total)} of ${pagination.total} results`
            ),
            React.createElement(
              'div',
              { className: 'flex space-x-2' },
              React.createElement(
                Button,
                {
                  onClick: () => handlePageChange(pagination.page - 1),
                  disabled: pagination.page === 1 || loading,
                  variant: 'secondary',
                  size: 'sm',
                },
                'Previous'
              ),
              React.createElement(
                'span',
                { className: 'px-3 py-1 text-sm text-gray-700' },
                `Page ${pagination.page}`
              ),
              React.createElement(
                Button,
                {
                  onClick: () => handlePageChange(pagination.page + 1),
                  disabled: pagination.page * pagination.limit >= pagination.total || loading,
                  variant: 'secondary',
                  size: 'sm',
                },
                'Next'
              )
            )
          )
        )
      )
    )
  );
}
