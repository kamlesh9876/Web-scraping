'use client';

import React, { useState, useEffect } from 'react';
import { scrapingApi, systemApi } from '@/services/scraping';
import { Button } from '@/components/Button';
import { StatusBadge } from '@/components/StatusBadge';
import { ScrapeJob, SystemStatus } from '@/types/scraping';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalNavigation: number;
  recentJobs: number;
  activeJobs: number;
}

export default function Dashboard() {
  const [jobs, setJobs] = useState<ScrapeJob[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jobsData, statusData] = await Promise.all([
        scrapingApi.getJobs(),
        systemApi.getStatus(),
      ]);
      setJobs(jobsData);
      setSystemStatus(statusData);
      
      // Calculate stats
      if (statusData) {
        setStats({
          totalProducts: statusData.totalProducts || 0,
          totalCategories: statusData.totalCategories || 0,
          totalNavigation: statusData.totalNavigation || 0,
          recentJobs: jobsData.filter(job => 
            new Date(job.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)
          ).length,
          activeJobs: jobsData.filter(job => job.status === 'running').length,
        });
      }
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

  const handleScrapeCategories = async (navigationSlug: string) => {
    setLoading(true);
    try {
      await scrapingApi.scrapeCategories(navigationSlug);
      await fetchData();
    } catch (error) {
      console.error('Failed to scrape categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScrapeProducts = async (categorySlug: string) => {
    setLoading(true);
    try {
      await scrapingApi.scrapeProducts({ navigationSlug: 'fiction', categorySlug });
      await fetchData();
    } catch (error) {
      console.error('Failed to scrape products:', error);
    } finally {
      setLoading(false);
    }
  };

  return React.createElement('div', {
    className: 'min-h-screen bg-gray-50 p-6',
    children: [
      React.createElement('div', {
        className: 'max-w-7xl mx-auto',
        children: [
          // Header
          React.createElement('header', {
            className: 'mb-8',
            children: React.createElement('div', {
              className: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
              children: [
                React.createElement('h1', {
                  className: 'text-2xl font-bold text-gray-900',
                  children: '📚 World of Books Scraping Dashboard'
                }),
                React.createElement('p', {
                  className: 'text-gray-600',
                  children: 'Monitor and control your scraping operations'
                })
              ]
            })
          }),

          // Stats Cards
          stats && React.createElement('div', {
            className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8',
            children: [
              React.createElement('div', {
                className: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
                children: [
                  React.createElement('h3', {
                    className: 'text-lg font-semibold text-gray-900 mb-2',
                    children: '📊 Total Products'
                  }),
                  React.createElement('p', {
                    className: 'text-3xl font-bold text-blue-600',
                    children: stats.totalProducts.toLocaleString()
                  })
                ]
              }),
              React.createElement('div', {
                className: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
                children: [
                  React.createElement('h3', {
                    className: 'text-lg font-semibold text-gray-900 mb-2',
                    children: '📂 Total Categories'
                  }),
                  React.createElement('p', {
                    className: 'text-3xl font-bold text-green-600',
                    children: stats.totalCategories.toLocaleString()
                  })
                ]
              }),
              React.createElement('div', {
                className: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
                children: [
                  React.createElement('h3', {
                    className: 'text-lg font-semibold text-gray-900 mb-2',
                    children: '🧭 Navigation Items'
                  }),
                  React.createElement('p', {
                    className: 'text-3xl font-bold text-purple-600',
                    children: stats.totalNavigation.toLocaleString()
                  })
                ]
              }),
              React.createElement('div', {
                className: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
                children: [
                  React.createElement('h3', {
                    className: 'text-lg font-semibold text-gray-900 mb-2',
                    children: '⚡ Active Jobs'
                  }),
                  React.createElement('p', {
                    className: 'text-3xl font-bold text-orange-600',
                    children: stats.activeJobs.toLocaleString()
                  })
                ]
              }),
              React.createElement('div', {
                className: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
                children: [
                  React.createElement('h3', {
                    className: 'text-lg font-semibold text-gray-900 mb-2',
                    children: '🕐 Recent Jobs (24h)'
                  }),
                  React.createElement('p', {
                    className: 'text-3xl font-bold text-gray-600',
                    children: stats.recentJobs.toLocaleString()
                  })
                ]
              })
            ]
          }),

          // System Status
          systemStatus && React.createElement('div', {
            className: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8',
            children: [
              React.createElement('h2', {
                className: 'text-xl font-semibold text-gray-900 mb-4',
                children: '🖥️ System Status'
              }),
              React.createElement('div', {
                className: 'grid grid-cols-1 md:grid-cols-2 gap-4',
                children: [
                  React.createElement('div', {
                    children: [
                      React.createElement('span', {
                        className: 'font-medium text-gray-700',
                        children: 'Database Status:'
                      }),
                      React.createElement(StatusBadge, {
                        status: systemStatus.databaseStatus,
                        children: systemStatus.databaseStatus
                      })
                    ]
                  }),
                  React.createElement('div', {
                    children: [
                      React.createElement('span', {
                        className: 'font-medium text-gray-700',
                        children: 'Redis Status:'
                      }),
                      React.createElement(StatusBadge, {
                        status: systemStatus.redisStatus,
                        children: systemStatus.redisStatus
                      })
                    ]
                  }),
                  React.createElement('div', {
                    children: [
                      React.createElement('span', {
                        className: 'font-medium text-gray-700',
                        children: 'Last Scrape:'
                      }),
                      React.createElement('span', {
                        className: 'text-sm text-gray-600',
                        children: systemStatus.lastScrapeAt 
                          ? new Date(systemStatus.lastScrapeAt).toLocaleString()
                          : 'Never'
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          // Control Panel
          React.createElement('div', {
            className: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8',
            children: [
              React.createElement('h2', {
                className: 'text-xl font-semibold text-gray-900 mb-4',
                children: '🎮 Scraping Controls'
              }),
              React.createElement('div', {
                className: 'space-y-4',
                children: [
                  React.createElement('div', {
                    className: 'flex flex-col space-y-2',
                    children: [
                      React.createElement('label', {
                        className: 'block text-sm font-medium text-gray-700 mb-2',
                        children: 'Navigation Scraping'
                      }),
                      React.createElement('div', {
                        className: 'flex space-x-2',
                        children: [
                          React.createElement(Button, {
                            onClick: handleScrapeNavigation,
                            disabled: loading,
                            children: loading ? 'Scraping...' : '🧭 Scrape Navigation'
                          }),
                          React.createElement(Button, {
                            onClick: () => handleScrapeCategories('fiction'),
                            disabled: loading,
                            children: loading ? 'Scraping...' : '📂 Scrape Categories'
                          })
                        ]
                      })
                    ]
                  }),
                  React.createElement('div', {
                    className: 'flex flex-col space-y-2',
                    children: [
                      React.createElement('label', {
                        className: 'block text-sm font-medium text-gray-700 mb-2',
                        children: 'Product Scraping'
                      }),
                      React.createElement('div', {
                        className: 'flex space-x-2',
                        children: [
                          React.createElement('input', {
                            type: 'text',
                            placeholder: 'Enter category slug...',
                            className: 'flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          }),
                          React.createElement(Button, {
                            onClick: () => {
                              const input = document.querySelector('input') as HTMLInputElement;
                              if (input.value.trim()) {
                                handleScrapeProducts(input.value.trim());
                              }
                            },
                            disabled: loading,
                            children: loading ? 'Scraping...' : '📦 Scrape Products'
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          // Recent Jobs Table
          React.createElement('div', {
            className: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
            children: [
              React.createElement('h2', {
                className: 'text-xl font-semibold text-gray-900 mb-4',
                children: '🕐 Recent Scraping Jobs'
              }),
              React.createElement('div', {
                className: 'overflow-x-auto',
                children: jobs.length > 0 ? React.createElement('table', {
                  className: 'min-w-full divide-y divide-gray-200',
                  children: [
                    React.createElement('thead', {
                      className: 'bg-gray-50',
                      children: React.createElement('tr', {
                        children: [
                          React.createElement('th', {
                            className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                            children: 'Job ID'
                          }),
                          React.createElement('th', {
                            className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                            children: 'Type'
                          }),
                          React.createElement('th', {
                            className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                            children: 'Status'
                          }),
                          React.createElement('th', {
                            className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                            children: 'Created'
                          }),
                          React.createElement('th', {
                            className: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                            children: 'Completed'
                          })
                        ]
                      })
                    }),
                    React.createElement('tbody', {
                      className: 'bg-white divide-y divide-gray-200',
                      children: jobs.slice(0, 10).map(job => 
                        React.createElement('tr', {
                          key: job.id,
                          children: [
                            React.createElement('td', {
                              className: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900',
                              children: job.id.slice(0, 8)
                            }),
                            React.createElement('td', {
                              className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500',
                              children: job.type
                            }),
                            React.createElement('td', {
                              className: 'px-6 py-4 whitespace-nowrap',
                              children: React.createElement(StatusBadge, {
                                status: job.status,
                                children: job.status
                              })
                            }),
                            React.createElement('td', {
                              className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500',
                              children: new Date(job.createdAt).toLocaleString()
                            }),
                            React.createElement('td', {
                              className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500',
                              children: job.completedAt 
                                ? new Date(job.completedAt).toLocaleString()
                                : '-'
                            })
                          ]
                        })
                      )
                    })
                  ]
                }) : React.createElement('p', {
                  className: 'text-gray-500 text-center py-8',
                  children: 'No jobs found. Start scraping to see jobs here.'
                })
              })
            ]
          })
        ]
      })
    ]
  });
}
