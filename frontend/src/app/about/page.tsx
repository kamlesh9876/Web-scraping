'use client';

import { Layout } from '@/components/Layout';
import { Book, Users, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About World of Books Scraper</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A modern web application for discovering and browsing affordable used books
          </p>
        </div>

        {/* Mission */}
        <section className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Target className="h-6 w-6 text-primary-600 mr-3" />
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Accessible Books</h3>
              <p className="text-gray-700 leading-relaxed">
                We make it easy to discover and purchase affordable used books from World of Books, 
                helping you find great reads while saving money and reducing environmental impact.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Smart Discovery</h3>
              <p className="text-gray-700 leading-relaxed">
                Our intelligent categorization and search features help you find exactly what you're looking for, 
                whether it's a specific title, author, or just browsing by genre.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Book className="h-6 w-6 text-primary-600 mr-3" />
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Real-time Data</h3>
              <p className="text-gray-700">
                Up-to-date book information with automated scraping from World of Books
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Smart Caching</h3>
              <p className="text-gray-700">
                Intelligent caching system ensures fast loading times and fresh data
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsive Design</h3>
              <p className="text-gray-700">
                Works perfectly on desktop, tablet, and mobile devices
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">User-Friendly</h3>
              <p className="text-gray-700">
                Intuitive interface designed for book lovers of all technical levels
              </p>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Frontend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Next.js 14 with App Router</li>
                <li>• React 18 with TypeScript</li>
                <li>• Tailwind CSS for styling</li>
                <li>• React Query for data fetching</li>
                <li>• Lucide React for icons</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Backend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• NestJS with TypeScript</li>
                <li>• MongoDB for data storage</li>
                <li>• Crawlee + Playwright for scraping</li>
                <li>• BullMQ for job queuing</li>
                <li>• Redis for caching</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact/Team */}
        <section className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Users className="h-6 w-6 text-primary-600 mr-3" />
            Built With Care
          </h2>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-gray-700 mb-6">
              This project demonstrates modern full-stack development capabilities, 
              combining ethical web scraping with a user-friendly frontend interface.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/contact" 
                className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
              >
                Contact Us
              </a>
              <a 
                href="https://github.com/your-repo/world-of-books-scraper" 
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary-600 text-primary-600 px-6 py-3 rounded-md hover:bg-primary-50 transition-colors"
              >
                View Source
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
