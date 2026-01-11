import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  showButton?: boolean;
}

export const SearchBar = ({ 
  onSearch, 
  placeholder = "Search for books, authors, ISBN...",
  className = "",
  showButton = true 
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className="relative">
        <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${
          isFocused ? 'text-primary-600' : 'text-gray-400'
        }`}>
          <Search className="h-5 w-5" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-12 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 ${
            isFocused ? 'bg-white border-primary-500' : ''
          }`}
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {showButton && (
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-700 transition-all duration-300 transform hover:scale-105"
        >
          Search
        </button>
      )}
    </form>
  );
};
