'use client';

import React, { useState, useEffect } from 'react';
import { scrapingApi, systemApi } from '@/services/scraping';
import { Button } from '@/components/Button';
import { StatusBadge } from '@/components/StatusBadge';
import { ScrapeJob, SystemStatus } from '@/types/scraping';

export default function Dashboard() {
  const [jobs, setJobs] = useState<ScrapeJob[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [jobsData, statusData] = await Promise.all([
        scrapingApi.getJobs(),
        systemApi.getStatus(),
      ]);
      setJobs(jobsData);
      setSystemStatus(statusData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleScrapeNavigation = async () => {
    setLoading(true);
    try {
      await scrapingApi.scrapeNavigation();
      await fetchData();
    } catch (error) {
      console.error('Failed to scrape navigation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScrapeCategories = async () => {
    setLoading(true);
    try {
      // You might want to add a dropdown to select navigation
      await scrapingApi.scrapeCategories('fiction'); // Example with fiction
      await fetchData();
    } catch (error) {
      console.error('Failed to scrape categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScrapeProducts = async () => {
    setLoading(true);
    try {
      // You might want to add navigation/category selection
      await scrapingApi.scrapeProducts({
        navigationSlug: 'fiction',
        categorySlug: 'crime',
      });
      await fetchData();
    } catch (error) {
      console.error('Failed to scrape products:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

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
          { className: 'border-b border-gray-200 pb-8' },
          React.createElement(
            'h1',
            { className: 'text-3xl font-bold text-gray-900' },
            'Scraping Control Panel'
          )
        ),

        // System Status
        React.createElement(
          'div',
          { className: 'bg-white p-6 rounded-lg border border-gray-200 shadow' },
          React.createElement(
            'h2',
            { className: 'text-lg font-semibold text-gray-900 mb-4' },
            'System Status'
          ),
          systemStatus && React.createElement(
            'div',
            { className: 'grid grid-cols-1 md:grid-cols-4 gap-4' },
            React.createElement(
              'div',
              { className: 'text-center' },
              React.createElement(
                'div',
                { className: 'text-2xl font-bold text-gray-900' },
                systemStatus.totalJobs
              ),
              React.createElement(
                'div',
                { className: 'text-sm text-gray-500' },
                'Total Jobs'
              )
            ),
            React.createElement(
              'div',
              { className: 'text-center' },
              React.createElement(
                'div',
                { className: 'text-2xl font-bold text-blue-600' },
                systemStatus.runningJobs
              ),
              React.createElement(
                'div',
                { className: 'text-sm text-gray-500' },
                'Running'
              )
            ),
            React.createElement(
              'div',
              { className: 'text-center' },
              React.createElement(
                'div',
                { className: 'text-2xl font-bold text-green-600' },
                systemStatus.completedJobs
              ),
              React.createElement(
                'div',
                { className: 'text-sm text-gray-500' },
                'Completed'
              )
            ),
            React.createElement(
              'div',
              { className: 'text-center' },
              React.createElement(
                'div',
                { className: 'text-2xl font-bold text-red-600' },
                systemStatus.failedJobs
              ),
              React.createElement(
                'div',
                { className: 'text-sm text-gray-500' },
                'Failed'
              )
            )
          )
        ),

        // Scraping Controls
        React.createElement(
          'div',
          { className: 'bg-white p-6 rounded-lg border border-gray-200 shadow' },
          React.createElement(
            'h2',
            { className: 'text-lg font-semibold text-gray-900 mb-4' },
            'Scraping Controls'
          ),
          React.createElement(
            'div',
            { className: 'grid grid-cols-1 md:grid-cols-3 gap-4' },
            React.createElement(
              Button,
              {
                onClick: handleScrapeNavigation,
                disabled: loading,
                className: 'w-full',
                children: 'Scrape Navigation'
              }
            ),
            React.createElement(
              Button,
              {
                onClick: handleScrapeCategories,
                disabled: loading,
                variant: 'secondary',
                className: 'w-full',
                children: 'Scrape Categories'
              }
            ),
            React.createElement(
              Button,
              {
                onClick: handleScrapeProducts,
                disabled: loading,
                variant: 'secondary',
                className: 'w-full',
                children: 'Scrape Products'
              }
            )
          )
        ),

        // Recent Jobs
        React.createElement(
          'div',
          { className: 'bg-white p-6 rounded-lg border border-gray-200 shadow' },
          React.createElement(
            'div',
            { className: 'flex justify-between items-center mb-4' },
            React.createElement(
              'h2',
              { className: 'text-lg font-semibold text-gray-900' },
              'Recent Jobs'
            ),
            React.createElement(
              'div',
              { className: 'text-sm text-gray-500' },
              systemStatus?.lastRun ? `Last Run: ${formatDate(systemStatus.lastRun)}` : 'No previous runs'
            )
          ),
          jobs.length > 0 ? React.createElement(
            'div',
            { className: 'overflow-x-auto' },
            React.createElement(
              'table',
              { className: 'min-w-full divide-y divide-gray-200' },
              React.createElement(
                'thead',
                { className: 'bg-gray-50' },
                React.createElement(
                  'tr',
                  null,
                  React.createElement('th', { className: 'px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Type'),
                  React.createElement('th', { className: 'px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Status'),
                  React.createElement('th', { className: 'px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Started'),
                  React.createElement('th', { className: 'px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' }, 'Completed')
                )
              ),
              React.createElement(
                'tbody',
                { className: 'bg-white divide-y divide-gray-200' },
                jobs.slice(0, 10).map((job, index) =>
                  React.createElement(
                    'tr',
                    { key: job.id, className: index % 2 === 0 ? 'bg-white' : 'bg-gray-50' },
                    React.createElement('td', { className: 'px-4 py-2 text-sm text-gray-900' }, job.type),
                    React.createElement('td', { className: 'px-4 py-2 text-sm' }, React.createElement(StatusBadge, { status: job.status })),
                    React.createElement('td', { className: 'px-4 py-2 text-sm text-gray-500' }, formatDate(job.startedAt)),
                    React.createElement('td', { className: 'px-4 py-2 text-sm text-gray-500' }, formatDate(job.completedAt))
                  )
                )
              )
            )
          ) : React.createElement(
            'div',
            { className: 'text-center py-8 text-gray-500' },
            'No jobs found. Start scraping to see job history.'
          )
        )
      )
    )
  );
}
