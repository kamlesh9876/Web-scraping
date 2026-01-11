import { ReactNode, useState } from 'react';
import { Navigation } from '@/types';
import Link from 'next/link';
import { Search, Menu, X, ShoppingCart, User, BookOpen, Heart } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  navigation?: Navigation[];
}

export const Layout = ({ children, navigation = [] }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <BookOpen className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-all duration-300 transform group-hover:scale-110" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                World of Books
              </span>
            </Link>
            
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for books, authors, ISBN..."
                  className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.slug}
                  href={`/category/${item.slug}`}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary-50 relative group"
                >
                  {item.title}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300">
                <ShoppingCart className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300">
                <User className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-3 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.slug}
                  href={`/category/${item.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300"
                >
                  {item.title}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-200 flex justify-around">
                <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300">
                  <ShoppingCart className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300">
                  <User className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-primary-400" />
                <span className="text-xl font-bold">World of Books</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Discover affordable used books while supporting sustainable reading. 
                Your gateway to a world of knowledge and imagination.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="p-2 bg-gray-700 hover:bg-primary-600 rounded-full transition-all duration-300 transform hover:scale-110">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 bg-gray-700 hover:bg-primary-600 rounded-full transition-all duration-300 transform hover:scale-110">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 bg-gray-700 hover:bg-primary-600 rounded-full transition-all duration-300 transform hover:scale-110">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Browse</h3>
              <ul className="space-y-3">
                {navigation.slice(0, 5).map((item) => (
                  <li key={item.slug}>
                    <Link 
                      href={`/category/${item.slug}`} 
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-primary-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Help & Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-0.5 bg-primary-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-0.5 bg-primary-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-0.5 bg-primary-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-0.5 bg-primary-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    Shipping Info
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Newsletter</h3>
              <p className="text-gray-300 text-sm">
                Get updates on new arrivals and special offers
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                />
                <button className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                &copy; 2024 World of Books Scraper. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
