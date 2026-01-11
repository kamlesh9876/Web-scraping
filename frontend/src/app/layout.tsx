'use client';

import React, { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return React.createElement(
    'html',
    { lang: 'en' },
    React.createElement(
      'body',
      { className: 'antialiased bg-white text-gray-900' },
      children
    )
  );
}
