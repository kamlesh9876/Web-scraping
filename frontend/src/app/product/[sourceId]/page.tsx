'use client';

import { useProductBySourceId, useProductDetail, usePrefetchProduct } from '@/hooks/useProducts';
import { Layout } from '@/components/Layout';
import { Loader2, ArrowLeft, Star, Book, User, Calendar } from 'lucide-react';
import Link from 'next/link';

interface ProductPageProps {
  params: {
    sourceId: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { data: product, isLoading: productLoading, error: productError } = useProductBySourceId(params.sourceId);
  const { data: productDetail, isLoading: detailLoading, error: detailError } = useProductDetail(params.sourceId);
  const prefetchProduct = usePrefetchProduct();

  const isLoading = productLoading || detailLoading;
  const error = productError || detailError;
  const data = product && productDetail ? { ...product, ...productDetail } : null;

  if (isLoading && !data) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600">Loading product details...</span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">Failed to load product</div>
          <Link href="/" className="text-primary-600 hover:text-primary-700">
            ← Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="text-center py-12">
          <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h3>
          <p className="text-gray-600 mb-4">
            The book you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
            Browse Other Books
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">
            {data.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Image */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="aspect-w-3 aspect-h-4 bg-gray-100 rounded-lg overflow-hidden">
                {data.image_url ? (
                  <img
                    src={data.image_url}
                    alt={data.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Book className="h-24 w-24 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Price */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {data.title}
              </h1>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-primary-600">
                  {data.currency} {data.price.toFixed(2)}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  In Stock
                </span>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {data.author && (
                  <div>
                    <span className="font-medium text-gray-700">Author:</span>
                    <span className="text-gray-600 ml-2">{data.author}</span>
                  </div>
                )}
                {data.isbn && (
                  <div>
                    <span className="font-medium text-gray-700">ISBN:</span>
                    <span className="text-gray-600 ml-2">{data.isbn}</span>
                  </div>
                )}
                {data.publisher && (
                  <div>
                    <span className="font-medium text-gray-700">Publisher:</span>
                    <span className="text-gray-600 ml-2">{data.publisher}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Source:</span>
                  <a 
                    href={data.source_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 ml-2"
                  >
                    View Original
                  </a>
                </div>
              </div>
            </div>

            {/* Description */}
            {data.description && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {data.description}
                  </p>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Reviews</h2>
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Reviews coming soon</p>
                <p className="text-sm text-gray-500">
                  We're working on bringing you customer reviews and ratings for this book.
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">You might also like</h2>
              <div className="text-center py-8">
                <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Recommendations coming soon</p>
                <p className="text-sm text-gray-500">
                  Our recommendation system will help you discover similar books.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Link>
          <a
            href={data.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
          >
            <Book className="h-4 w-4 mr-2" />
            View on World of Books
          </a>
        </div>
      </div>
    </Layout>
  );
}
