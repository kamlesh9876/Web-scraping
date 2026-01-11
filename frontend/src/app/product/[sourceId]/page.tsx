'use client';

import { useProductBySourceId, useProductDetail, usePrefetchProduct } from '@/hooks/useProducts';
import { Layout } from '@/components/Layout';
import { Loader2, ArrowLeft, Star, Book, User, Calendar, Heart, ShoppingCart, Truck, Shield, ExternalLink, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ProductPageProps {
  params: {
    sourceId: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { data: product, isLoading: productLoading, error: productError } = useProductBySourceId(params.sourceId);
  const { data: productDetail, isLoading: detailLoading, error: detailError } = useProductDetail(params.sourceId);
  const prefetchProduct = usePrefetchProduct();
  const [selectedImage, setSelectedImage] = useState(0);

  const isLoading = productLoading || detailLoading;
  const error = productError || detailError;
  const data = product && productDetail ? { ...product, ...productDetail } : null;

  if (isLoading && !data) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto" />
              <div className="absolute inset-0 h-12 w-12 animate-ping bg-primary-200 rounded-full mx-auto"></div>
            </div>
            <span className="text-gray-600 text-lg font-medium">Loading book details...</span>
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
              <p className="text-gray-600">We couldn't load the book details. Please try again.</p>
            </div>
            <Link href="/" className="text-primary-600 hover:text-primary-700 inline-flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="text-center py-16">
          <div className="max-w-md mx-auto space-y-6">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
              <Book className="h-12 w-12 text-gray-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h3>
              <p className="text-gray-600 mb-6">
                The book you're looking for doesn't exist or has been removed from our collection.
              </p>
            </div>
            <Link href="/" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Browse Other Books
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Enhanced Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-primary-600 transition-colors flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium bg-primary-50 px-2 py-1 rounded max-w-xs truncate">
            {data.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Product Image */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <div className="aspect-w-3 aspect-h-4 bg-gray-100 rounded-xl overflow-hidden mb-4">
                {data.image_url ? (
                  <img
                    src={data.image_url}
                    alt={data.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Book className="h-24 w-24 text-gray-400" />
                  </div>
                )}
              </div>
              
              {/* Image Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedImage === i ? 'border-primary-500' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(i)}
                  >
                    {data.image_url ? (
                      <img
                        src={data.image_url}
                        alt={`${data.title} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Book className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 space-y-3">
                <button className="w-full bg-red-50 text-red-600 px-4 py-3 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </button>
                <button className="w-full bg-blue-50 text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Share Book
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Product Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Price */}
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 border border-primary-100">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight flex-1">
                  {data.title}
                </h1>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium ml-4">
                  In Stock
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-gray-700">(4.5/5.0)</span>
                <span className="text-sm text-gray-500">(234 reviews)</span>
              </div>

              <div className="flex items-end space-x-4">
                <div>
                  <span className="text-4xl font-bold text-primary-600">
                    {data.currency} {data.price.toFixed(2)}
                  </span>
                  <div className="text-lg text-gray-500 line-through">
                    {data.currency} {(data.price * 1.8).toFixed(2)}
                  </div>
                </div>
                <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                  45% OFF
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Quality Checked</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span>Best Price</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Sparkles className="h-4 w-4 text-orange-600" />
                  <span>Eco Friendly</span>
                </div>
              </div>
            </div>

            {/* Enhanced Metadata */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Book Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.author && (
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Author</div>
                      <div className="text-gray-900">{data.author}</div>
                    </div>
                  </div>
                )}
                {data.isbn && (
                  <div className="flex items-start space-x-3">
                    <Book className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">ISBN</div>
                      <div className="text-gray-900">{data.isbn}</div>
                    </div>
                  </div>
                )}
                {data.publisher && (
                  <div className="flex items-start space-x-3">
                    <div className="h-5 w-5 text-gray-400 mt-0.5">📖</div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Publisher</div>
                      <div className="text-gray-900">{data.publisher}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-start space-x-3">
                  <ExternalLink className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Source</div>
                    <a 
                      href={data.source_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 flex items-center"
                    >
                      View on World of Books
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Description */}
            {data.description && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {data.description}
                  </p>
                </div>
              </div>
            )}

            {/* Enhanced Reviews Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Write a Review
                </button>
              </div>
              
              <div className="text-center py-12">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Reviews Coming Soon</h3>
                <p className="text-gray-600 mb-4 max-w-md mx-auto">
                  We're working on bringing you authentic customer reviews and ratings for this book.
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="bg-primary-50 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors">
                    Get Notified
                  </button>
                  <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Recommendations */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
              <div className="text-center py-12">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Our AI-powered recommendation system will help you discover similar books based on your interests.
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Coming Soon
                  </button>
                  <button className="bg-white text-primary-600 px-4 py-2 rounded-lg border border-primary-600 hover:bg-primary-50 transition-colors">
                    Browse Similar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Actions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continue Browsing
            </Link>
            <a
              href={data.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-semibold"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Buy on World of Books
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
