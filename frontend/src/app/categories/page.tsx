'use client';

import React, { useState, useEffect } from 'react';
import { dataApi } from '@/services/scraping';
import { Button } from '@/components/Button';
import { Table, TableColumn } from '@/components/Table';
import { CategoryItem, NavigationItem } from '@/types/scraping';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [selectedNavigation, setSelectedNavigation] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNavigation();
  }, []);

  useEffect(() => {
    if (selectedNavigation) {
      fetchCategories(selectedNavigation);
    }
  }, [selectedNavigation]);

  const fetchNavigation = async () => {
    try {
      setLoading(true);
      const data = await dataApi.getNavigation();
      setNavigation(data);
      if (data.length > 0 && !selectedNavigation) {
        setSelectedNavigation(data[0].slug);
      }
    } catch (error) {
      console.error('Failed to fetch navigation:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async (navigationSlug: string) => {
    try {
      setLoading(true);
      const data = await dataApi.getCategoriesByNavigation(navigationSlug);
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const columns: TableColumn<CategoryItem>[] = [
    {
      key: 'title' as keyof CategoryItem,
      header: 'Title',
    },
    {
      key: 'slug' as keyof CategoryItem,
      header: 'Slug',
    },
    {
      key: 'url' as keyof CategoryItem,
      header: 'URL',
      render: (value: string) => React.createElement(
        'a',
        {
          href: value,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'text-blue-600 hover:text-blue-800 underline',
        },
        value
      ),
    },
    {
      key: 'navigationSlug' as keyof CategoryItem,
      header: 'Navigation',
    },
    {
      key: 'createdAt' as keyof CategoryItem,
      header: 'Created At',
      render: (value: string) => formatDate(value),
    },
  ];

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
          'Loading categories data...'
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
              'Categories Data'
            ),
            React.createElement(
              'p',
              { className: 'text-gray-600 mt-2' },
              `Total items: ${categories.length}`
            )
          ),
          React.createElement(
            Button,
            { 
              onClick: () => fetchCategories(selectedNavigation), 
              disabled: loading || !selectedNavigation,
              children: 'Refresh'
            }
          )
        ),

        // Navigation Selector
        React.createElement(
          'div',
          { className: 'bg-white p-6 rounded-lg border border-gray-200 shadow' },
          React.createElement(
            'h2',
            { className: 'text-lg font-semibold text-gray-900 mb-4' },
            'Select Navigation'
          ),
          React.createElement(
            'div',
            { className: 'flex items-center space-x-4' },
            React.createElement(
              'label',
              { className: 'text-sm font-medium text-gray-700' },
              'Navigation:'
            ),
            React.createElement(
              'select',
              {
                value: selectedNavigation,
                onChange: (e: any) => setSelectedNavigation(e.target.value),
                className: 'block w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
              },
              navigation.map((nav) =>
                React.createElement(
                  'option',
                  { key: nav.slug, value: nav.slug },
                  nav.title
                )
              )
            )
          )
        ),

        // Categories Table
        React.createElement(
          'div',
          { className: 'bg-white p-6 rounded-lg border border-gray-200 shadow' },
          React.createElement(
            'h2',
            { className: 'text-lg font-semibold text-gray-900 mb-4' },
            `Categories for ${navigation.find(n => n.slug === selectedNavigation)?.title || 'Selected Navigation'}`
          ),
          React.createElement(Table<CategoryItem>, {
            data: categories,
            columns: columns,
            emptyMessage: 'No categories available for this navigation. Start scraping to populate this table.',
          })
        )
      )
    )
  );
}
