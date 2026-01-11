'use client';

import React, { useState, useEffect } from 'react';
import { dataApi } from '@/services/scraping';
import { Button } from '@/components/Button';
import { Table, TableColumn } from '@/components/Table';
import { NavigationItem } from '@/types/scraping';

export default function NavigationPage() {
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNavigation();
  }, []);

  const fetchNavigation = async () => {
    try {
      setLoading(true);
      const data = await dataApi.getNavigation();
      setNavigation(data);
    } catch (error) {
      console.error('Failed to fetch navigation:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const columns: TableColumn<NavigationItem>[] = [
    {
      key: 'title' as keyof NavigationItem,
      header: 'Title',
    },
    {
      key: 'slug' as keyof NavigationItem,
      header: 'Slug',
    },
    {
      key: 'url' as keyof NavigationItem,
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
      key: 'createdAt' as keyof NavigationItem,
      header: 'Created At',
      render: (value: string) => formatDate(value),
    },
  ];

  if (loading) {
    return React.createElement(
      'div',
      { className: 'min-h-screen bg-white flex items-center justify-center' },
      React.createElement(
        'div',
        { className: 'text-center' },
        React.createElement(
          'div',
          { className: 'text-lg text-gray-600' },
          'Loading navigation data...'
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
              'Navigation Data'
            ),
            React.createElement(
              'p',
              { className: 'text-gray-600 mt-2' },
              `Total items: ${navigation.length}`
            )
          ),
          React.createElement(
            Button,
            { 
              onClick: fetchNavigation, 
              disabled: loading,
              children: 'Refresh'
            }
          )
        ),

        // Navigation Table
        React.createElement(
          'div',
          { className: 'bg-white p-6 rounded-lg border border-gray-200 shadow' },
          React.createElement(
            'h2',
            { className: 'text-lg font-semibold text-gray-900 mb-4' },
            'Navigation Items'
          ),
          React.createElement(Table<NavigationItem>, {
            data: navigation,
            columns: columns,
            emptyMessage: 'No navigation data available. Start scraping to populate this table.',
          })
        )
      )
    )
  );
}
