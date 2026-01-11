import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

export const LoadingSpinner = ({ 
  size = 'md', 
  message, 
  className = '' 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="relative">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-primary-600`} />
        <div className={`absolute inset-0 animate-ping bg-primary-200 rounded-full ${
          size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-12 w-12'
        }`}></div>
      </div>
      {message && (
        <div className="text-center space-y-3">
          <span className="text-gray-600 font-medium">{message}</span>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};
