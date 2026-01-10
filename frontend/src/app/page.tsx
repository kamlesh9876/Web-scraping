'use client';

import { useNavigation } from '@/hooks/useNavigation';
import { Layout } from '@/components/Layout';
import { Book, Search, RefreshCw, Loader2 } from 'lucide-react';

export default function HomePage() {
  const { data: navigation, isLoading, error, refetch } = useNavigation();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600">Loading navigation...</span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">Failed to load navigation</div>
          <button
            onClick={() => refetch()}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout navigation={navigation}>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Your Next Great Read
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Browse through thousands of affordable books across all genres
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Browse Books
              </button>
              <button
                onClick={() => refetch()}
                className="bg-white text-primary-600 border border-primary-600 px-6 py-3 rounded-md hover:bg-primary-50 transition-colors flex items-center"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Refresh Data
              </button>
            </div>
          </div>
        </section>

        {/* Navigation Categories */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          {navigation && navigation.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {navigation.map((item) => (
                <a
                  key={item.slug}
                  href={`/category/${item.slug}`}
                  className="group bg-white p-6 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-primary-100 p-3 rounded-full group-hover:bg-primary-200 transition-colors">
                      <Book className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Explore {item.title.toLowerCase()} collection
                  </p>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories available</h3>
              <p className="text-gray-600 mb-4">
                Start by refreshing the data to load book categories
              </p>
              <button
                onClick={() => refetch()}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                Load Categories
              </button>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose World of Books?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordable Prices</h3>
              <p className="text-gray-600">
                Find great deals on used books without compromising quality
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Thousands of titles across all genres and subjects
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Eco Friendly</h3>
              <p className="text-gray-600">
                Give books a second life and reduce environmental impact
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
