import { Product } from '@/types';
import { Book, Heart, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  index?: number;
  viewMode?: 'grid' | 'list';
}

export const ProductCard = ({ product, index = 0, viewMode = 'grid' }: ProductCardProps) => {
  const discount = 30; // Example discount percentage
  const originalPrice = product.price * (1 + discount / 100);
  const rating = 4.5; // Example rating

  return (
    <div
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
              ? "aspect-w-3 aspect-h-4 bg-gray-100 rounded-lg mb-4 overflow-hidden relative group"
              : "w-24 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative group"
          }>
            {product.image_url ? (
              <>
                <img
                  src={product.image_url}
                  alt={product.title}
                  className={`w-full h-full object-cover hover:scale-110 transition-transform duration-500 ${
                    viewMode === 'list' ? 'rounded-lg' : 'rounded-lg'
                  }`}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Book className="h-12 w-12 text-gray-400" />
              </div>
            )}
            
            {/* Discount Badge */}
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{discount}%
            </div>
          </div>

          {/* Product Info */}
          <div className={`space-y-3 ${viewMode === 'grid' ? '' : 'flex-1'}`}>
            <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors group">
              {product.title}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({rating})</span>
            </div>

            {/* Price and Actions */}
            <div className={`items-center justify-between ${viewMode === 'grid' ? 'flex' : 'flex'}`}>
              <div>
                <span className="text-xl font-bold text-primary-600">
                  {product.currency} {product.price.toFixed(2)}
                </span>
                <div className="text-sm text-gray-500 line-through">
                  {product.currency} {originalPrice.toFixed(2)}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                  Save {discount}%
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  Used
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 pt-2">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  // Add to cart logic
                }}
                className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center text-sm"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  // Add to wishlist logic
                }}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
