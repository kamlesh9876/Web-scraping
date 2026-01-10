'use client';

import { useNavigation, useNavigationBySlug } from '@/hooks/useNavigation';
import { useProducts } from '@/hooks/useProducts';
import { Layout } from '@/components/Layout';
import { Loader2, ArrowLeft, Book } from 'lucide-react';
import Link from 'next/link';

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

  const currentCategory = currentNav || navigation?.find(nav => nav.slug === params.slug);

  if (isLoading && !productsData) {
    return (
      <Layout navigation={navigation}>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600">Loading products...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout navigation={navigation}>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">
            {currentCategory?.title || params.slug}
          </span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentCategory?.title || 'Category'}
              </h1>
              <p className="text-gray-600 mt-1">
                {productsData?.total || 0} books available
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Book className="h-8 w-8 text-primary-600" />
              <span className="text-gray-600">
                {productsData?.products?.length || 0} books
              </span>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="text-red-800">
              <h3 className="font-semibold mb-2">Failed to load products</h3>
              <p className="text-sm">Please try again later.</p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {productsData?.products && productsData.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsData.products.map((product) => (
              <div
                key={product.source_id}
                className="bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200"
              >
                <Link href={`/product/${product.source_id}`}>
                  <div className="p-4">
                    {/* Product Image */}
                    <div className="aspect-w-3 aspect-h-4 bg-gray-100 rounded-md mb-4 overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Book className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary-600">
                          {product.currency} {product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          Used Book
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          !error && (
            <div className="text-center py-12">
              <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                There are currently no books available in this category.
              </p>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                Browse Other Categories
              </button>
            </div>
          )
        )}

        {/* Pagination */}
        {productsData && productsData.total > productsData.products.length && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <span className="text-gray-600">
              Showing {productsData.products.length} of {productsData.total} books
            </span>
          </div>
        )}
      </div>
    </Layout>
  );
}
