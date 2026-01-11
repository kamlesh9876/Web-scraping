'use client';

import { useNavigation, useNavigationBySlug } from '@/hooks/useNavigation';
import { useProducts } from '@/hooks/useProducts';
import { Layout } from '@/components/Layout';
import { Loader2, ArrowLeft, Book, Heart, ShoppingCart, Star, Filter, Grid, List, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { data: navigation } = useNavigation();
  const { data: currentNav } = useNavigationBySlug(params.slug);
  const { data: productsData, isLoading, error } = useProducts({
    categorySlug: params.slug,
    page: 1,
    limit: 20,
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');

  const currentCategory = currentNav || navigation?.find(nav => nav.slug === params.slug);

  if (isLoading && !productsData) {
    return (
      <Layout navigation={navigation}>
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

  return (
    <Layout navigation={navigation}>
      <div className="space-y-8">
        {/* Enhanced Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-primary-600 transition-colors flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium bg-primary-50 px-2 py-1 rounded">
            {currentCategory?.title || params.slug}
          </span>
        </nav>

        {/* Enhanced Category Header */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 border border-primary-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentCategory?.title || 'Category'}
              </h1>
              <p className="text-gray-600 text-lg">
                {productsData?.total || 0} books available in this collection
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <Book className="h-8 w-8 text-primary-600" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {productsData?.products?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Books</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="relevance">Most Relevant</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title">Title: A-Z</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'} transition-colors`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'} transition-colors`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="text-red-800">
              <h3 className="font-semibold mb-2">Failed to load products</h3>
              <p className="text-sm">Please try again later.</p>
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        {productsData?.products && productsData.products.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {productsData.products.map((product, index) => (
              <div
                key={product.source_id}
                className={`bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 ${
                  viewMode === 'grid' ? '' : 'flex'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Link href={`/product/${product.source_id}`} className={viewMode === 'list' ? 'flex flex-1' : ''}>
                  <div className={viewMode === 'grid' ? 'p-4' : 'flex p-4 space-x-4 flex-1'}>
                    {/* Product Image */}
                    <div className={
                      viewMode === 'grid' 
                        ? "aspect-w-3 aspect-h-4 bg-gray-100 rounded-lg mb-4 overflow-hidden"
                        : "w-24 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                    }>
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className={`w-full h-full object-cover hover:scale-110 transition-transform duration-500 ${
                            viewMode === 'list' ? 'rounded-lg' : 'rounded-lg'
                          }`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Book className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className={`space-y-3 ${viewMode === 'grid' ? '' : 'flex-1'}`}>
                      <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors group">
                        {product.title}
                      </h3>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">(4.5)</span>
                      </div>

                      <div className={`items-center justify-between ${viewMode === 'grid' ? 'flex' : 'flex'}`}>
                        <div>
                          <span className="text-xl font-bold text-primary-600">
                            {product.currency} {product.price.toFixed(2)}
                          </span>
                          <div className="text-sm text-gray-500 line-through">
                            {product.currency} {(product.price * 1.5).toFixed(2)}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                            30% OFF
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Used
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 pt-2">
                        <button className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center text-sm">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          !error && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto space-y-6">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                  <Book className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No books found</h3>
                  <p className="text-gray-600 mb-6">
                    There are currently no books available in this category. Try browsing other categories or check back later.
                  </p>
                </div>
                <Link 
                  href="/"
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Browse Other Categories
                </Link>
              </div>
            </div>
          )
        )}

        {/* Enhanced Pagination */}
        {productsData && productsData.total > productsData.products.length && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{productsData.products.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{productsData.total}</span> books
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50">
                  Previous
                </button>
                <div className="flex items-center space-x-1">
                  <button className="px-3 py-2 bg-primary-600 text-white rounded-lg">1</button>
                  <button className="px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg">2</button>
                  <button className="px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg">3</button>
                  <span className="px-3 py-2">...</span>
                  <button className="px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg">10</button>
                </div>
                <button className="px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
