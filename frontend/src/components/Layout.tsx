import { ReactNode } from 'react';
import { Navigation } from '@/types';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
  navigation?: Navigation[];
}

export const Layout = ({ children, navigation = [] }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
              World of Books
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.slug}
                  href={`/category/${item.slug}`}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-primary-600 p-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-primary-600">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-primary-600">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Browse</h3>
              <ul className="space-y-2">
                {navigation.slice(0, 3).map((item) => (
                  <li key={item.slug}>
                    <Link href={`/category/${item.slug}`} className="text-gray-600 hover:text-primary-600">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Help</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-gray-600 hover:text-primary-600">FAQ</Link></li>
                <li><Link href="/shipping" className="text-gray-600 hover:text-primary-600">Shipping</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-primary-600">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12zm0-1.5c5.998 0 10.5-4.502 10.5-10.5s-4.502-10.5-10.5-10.5-10.5 4.502-10.5 10.5 4.502 10.5 10.5z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2024 World of Books Scraper. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
