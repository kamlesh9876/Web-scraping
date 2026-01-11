'use client';

import React, { SyntheticEvent } from 'react';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    author?: string;
    price: number;
    currency: string;
    image_url: string;
    source_url: string;
    condition?: string;
    isbn?: string;
  };
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return React.createElement('div', {
    className: 'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer',
    onClick: onClick,
    children: [
      React.createElement('div', {
        className: 'flex flex-col sm:flex-row',
        children: [
          // Product Image
          React.createElement('div', {
            className: 'flex-shrink-0 sm:w-48 sm:h-48',
            children: React.createElement('img', {
              className: 'w-full h-full object-cover',
              src: product.image_url || '/placeholder-book.png',
              alt: product.title,
              onError: (e: SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = '/placeholder-book.png';
              }
            })
          }),
          
          // Product Details
          React.createElement('div', {
            className: 'flex-1 p-6 flex flex-col justify-between',
            children: [
              React.createElement('div', {
                className: 'flex-1',
                children: [
                  // Title
                  React.createElement('h3', {
                    className: 'text-lg font-semibold text-gray-900 mb-2 line-clamp-2',
                    children: product.title
                  }),
                  
                  // Author & ISBN
                  (product.author || product.isbn) && React.createElement('div', {
                    className: 'flex items-center space-x-4 mb-2 text-sm text-gray-600',
                    children: [
                      product.author && React.createElement('span', {
                        children: `📖 ${product.author}`
                      }),
                      product.isbn && React.createElement('span', {
                        children: `📚 ISBN: ${product.isbn}`
                      })
                    ]
                  }),
                  
                  // Price & Condition
                  React.createElement('div', {
                    className: 'flex items-center justify-between mb-4',
                    children: [
                      React.createElement('div', {
                        className: 'flex items-center',
                        children: [
                          React.createElement('span', {
                            className: 'text-2xl font-bold text-green-600',
                            children: `${product.currency} ${product.price.toFixed(2)}`
                          }),
                          product.condition && React.createElement('span', {
                            className: 'ml-2 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded',
                            children: product.condition
                          })
                        ]
                      }),
                      React.createElement('a', {
                        href: product.source_url,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className: 'text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline',
                        children: 'View Details →'
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}
