'use client';

import React from 'react';

interface EnhancedStatusBadgeProps {
  status: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

export default function EnhancedStatusBadge({ status, children, showIcon = true }: EnhancedStatusBadgeProps) {
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'running':
        return 'bg-blue-100 text-blue-800 border-blue-200 animate-pulse';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'paused':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '✅';
      case 'running':
        return '⚡';
      case 'failed':
        return '❌';
      case 'pending':
        return '⏳';
      case 'paused':
        return '⏸️';
      default:
        return '❓';
    }
  };

  return React.createElement('span', {
    className: `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`,
    children: [
      showIcon && React.createElement('span', {
        className: 'mr-1',
        children: getStatusIcon(status)
      }),
      children
    ]
  });
}
