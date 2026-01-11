'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export default function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return React.createElement('div', {
    className: 'flex flex-col items-center justify-center',
    children: [
      React.createElement('div', {
        className: 'inline-block animate-spin rounded-full border-2 border-gray-900',
        role: 'status',
        'aria-label': 'Loading',
        children: [
          React.createElement('div', {
            className: 'border-t-2 border-gray-300 rounded-full animate-spin',
            style: {
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: '#3b82f6',
            }
          }),
          React.createElement('div', {
            className: 'border-t-2 border-gray-300 rounded-full animate-spin',
            style: {
              borderTopColor: 'transparent',
              borderRightColor: '#3b82f6',
              borderBottomColor: 'transparent',
              borderLeftColor: 'transparent',
              animationDelay: '0.15s',
              animationDirection: 'linear',
              animationIterationCount: 'infinite',
            }
          }),
          React.createElement('div', {
            className: 'border-t-2 border-gray-300 rounded-full animate-spin',
            style: {
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: '#3b82f6',
              animationDelay: '0.3s',
              animationDirection: 'linear',
              animationIterationCount: 'infinite',
            }
          })
        ]
      }),
      message && React.createElement('p', {
        className: 'mt-4 text-sm text-gray-600',
        children: message
      })
    ]
  });
}
