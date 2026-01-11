'use client';

import { useNavigation } from '@/hooks/useNavigation';
import { Layout } from '@/components/Layout';
import { Book, Search, RefreshCw, Loader2, Star, Truck, Shield, Heart, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const { data: navigation, isLoading, error, refetch } = useNavigation();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto" />
              <div className="absolute inset-0 h-12 w-12 animate-ping bg-primary-200 rounded-full mx-auto"></div>
            </div>
            <span className="text-gray-600 text-lg font-medium">Loading amazing books...</span>
            <div className="flex space-x-1 justify-center">
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="max-w-md mx-auto space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="text-red-600 text-lg font-semibold mb-2">Oops! Something went wrong</div>
              <p className="text-gray-600">We couldn't load the book categories. Please try again.</p>
            </div>
            <button
              onClick={() => refetch()}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center mx-auto"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout navigation={navigation}>
      <div className="space-y-12">
        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 rounded-2xl shadow-2xl">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-32 -mb-32"></div>
          
          <div className="relative max-w-4xl mx-auto px-8 py-16 text-center">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                Discover Your Next Great Read
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Thousands of
              <span className="block text-yellow-300">Affordable Books</span>
              Waiting for You
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Browse through our extensive collection of used books across all genres. 
              Quality reads at prices that won't break the bank.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center group">
                <Search className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Browse Books
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => refetch()}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Refresh Data
              </button>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-white/80 text-sm">Books Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white mb-1">100+</div>
                <div className="text-white/80 text-sm">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-white/80 text-sm">Browse Anytime</div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Navigation Categories */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find exactly what you're looking for in our carefully organized categories
            </p>
          </div>
          
          {navigation && navigation.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {navigation.map((item, index) => (
                <a
                  key={item.slug}
                  href={`/category/${item.slug}`}
                  className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-100 to-transparent rounded-full -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Book className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    Explore {item.title.toLowerCase()} collection
                  </p>
                  
                  <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700">
                    <span>Browse Now</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto space-y-6">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                  <Book className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No categories available</h3>
                  <p className="text-gray-600 mb-6">
                    Start by refreshing data to load book categories and begin your reading journey
                  </p>
                </div>
                <button
                  onClick={() => refetch()}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center mx-auto"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Load Categories
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Enhanced Features Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose World of Books?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the joy of reading while making smart, sustainable choices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center">
              <div className="bg-gradient-to-br from-green-400 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Affordable Prices</h3>
              <p className="text-gray-600 leading-relaxed">
                Find great deals on used books without compromising quality or your budget
              </p>
            </div>
            
            <div className="group text-center">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Wide Selection</h3>
              <p className="text-gray-600 leading-relaxed">
                Thousands of titles across all genres, subjects, and reading levels
              </p>
            </div>
            
            <div className="group text-center">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Eco Friendly</h3>
              <p className="text-gray-600 leading-relaxed">
                Give books a second life and reduce your environmental impact
              </p>
            </div>
            
            <div className="group text-center">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assured</h3>
              <p className="text-gray-600 leading-relaxed">
                Every book is carefully inspected to ensure good condition and readability
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-white/80">Books Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-white/80">Happy Readers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-white/80">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Customer Support</div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
