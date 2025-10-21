// --- UserDashboard.jsx ---
// This file is in /frontend/src/pages/

import React, { useState, useEffect } from 'react';
import bookService from '../services/book.services';
import FilterSidebar from '../components/ui/FilterSidebar';
import BookCard from '../components/ui/BookCard';

const UserDashboard = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filters, setFilters] = useState({}); // State to hold the active filters
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This useEffect hook re-runs whenever the 'filters' state changes
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Pass the current filters to the service
        const books = await bookService.getAllBooks(filters);
        setAllBooks(books);
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllBooks();
  }, [filters]); // Dependency array: re-fetch when filters change

  // This function is passed down to the sidebar
  const handleFilterChange = (newFilters) => {
    // Only keep filters that have a value
    const activeFilters = {};
    if (newFilters.author) {
      activeFilters.author = newFilters.author;
    }
    // Add other filters here
    
    setFilters(activeFilters);
  };

  // --- Styling ---
  const styles = {
    dashboard: {
      display: 'grid',
      gridTemplateColumns: '280px 1fr', // Sidebar and main content
      gap: '2rem',
      padding: '2rem',
    },
    bookGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // Responsive grid
      gap: '1.5rem',
    },
  };

  return (
    <div style={styles.dashboard}>
      {/* --- SIDEBAR --- */}
      <div>
        <FilterSidebar onFilterChange={handleFilterChange} />
      </div>

      {/* --- BOOK LISTING --- */}
      <div>
        <h2>All Books</h2>
        {loading && <p>Loading books...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {!loading && !error && (
          <div style={styles.bookGrid}>
            {allBooks.length === 0 && <p>No books found.</p>}
            
            {allBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;