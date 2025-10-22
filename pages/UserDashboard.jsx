// --- UserDashboard.jsx ---
// This file is in /frontend/src/pages/

import React, { useState, useEffect } from 'react';
import bookService from '../services/book.services';
import FilterSidebar from '../components/ui/FilterSidebar';
import BookCard from '../components/ui/BookCard';

const UserDashboard = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filters, setFilters] = useState({}); // State to hold the active filters
  const [sortBy, setSortBy] = useState('latest'); // State to hold the current sort option
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to sort books based on the current sort option
  const sortBooks = (books) => {
    const sortedBooks = [...books];
    
    switch (sortBy) {
      case 'title-asc':
        return sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
      case 'author-asc':
        return sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
      case 'author-desc':
        return sortedBooks.sort((a, b) => b.author.localeCompare(a.author));
      case 'latest':
      default:
        // Sort by ID (assuming higher IDs are newer) or keep original order
        return sortedBooks.sort((a, b) => {
          // Try to sort by ID if it's a MongoDB ObjectId or similar
          if (a._id && b._id) {
            return b._id.localeCompare(a._id);
          }
          // Fallback to original order
          return 0;
        });
    }
  };

  // This useEffect hook re-runs whenever the 'filters' or 'sortBy' state changes
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Pass the current filters to the service
        const books = await bookService.getAllBooks(filters);
        // Sort the books after fetching
        const sortedBooks = sortBooks(books);
        setAllBooks(sortedBooks);
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllBooks();
  }, [filters, sortBy]); // Dependency array: re-fetch when filters or sortBy change

  // This function is passed down to the sidebar
  const handleFilterChange = (newFilters) => {
    // Only keep filters that have a value
    const activeFilters = {};
    if (newFilters.author) {
      activeFilters.author = newFilters.author;
    }
    if (newFilters.title) {
      activeFilters.title = newFilters.title;
    }
    if (newFilters.description) {
      activeFilters.description = newFilters.description;
    }
    
    setFilters(activeFilters);
  };

  // Function to handle sort changes
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-white via-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <svg className="icon-lg text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-poppins font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Book Library</h1>
              <p className="text-gray-600 font-roboto">Discover and explore our collection of books</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          {/* Book Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-poppins font-bold text-gray-900">
                  {loading ? 'Loading...' : `${allBooks.length} Books Found`}
                </h2>
                {Object.keys(filters).length > 0 && (
                  <p className="text-gray-600 font-roboto mt-1">
                    Filtered by: {Object.entries(filters).map(([key, value]) => `${key}: "${value}"`).join(', ')}
                  </p>
                )}
              </div>
              
              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-roboto text-gray-600">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={handleSortChange}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-roboto focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none hover:border-blue-300 transition-colors duration-200 cursor-pointer"
                >
                  <option value="latest">Latest</option>
                  <option value="title-asc">Title A-Z</option>
                  <option value="title-desc">Title Z-A</option>
                  <option value="author-asc">Author A-Z</option>
                  <option value="author-desc">Author Z-A</option>
                </select>
                {sortBy !== 'latest' && (
                  <span className="text-xs text-blue-600 font-roboto">
                    {sortBy.includes('title') ? '📚' : '✍️'} 
                    {sortBy.includes('asc') ? ' ↑' : ' ↓'}
                  </span>
                )}
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-16">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <span className="text-gray-600 font-roboto">Loading books...</span>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3">
                  <svg className="icon-md text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-800 font-roboto">{error}</p>
                </div>
              </div>
            )}

            {/* Books Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {allBooks.length === 0 ? (
                  <div className="col-span-full text-center py-16">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="icon-lg text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">No books found</h3>
                    <p className="text-gray-600 font-roboto">Try adjusting your filters or check back later for new additions.</p>
                  </div>
                ) : (
                  allBooks.map((book) => (
                    <BookCard key={book._id} book={book} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;