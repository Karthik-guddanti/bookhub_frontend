// --- FilterSidebar.jsx ---
// This file is in /frontend/src/components/ui/

import React, { useState } from 'react';

const FilterSidebar = ({ onFilterChange }) => {
  const [author, setAuthor] = useState('');
  
  // You could add more filters here, like title or genre
  
  const handleApplyFilter = () => {
    // Pass the filter state up to the dashboard
    onFilterChange({ author });
  };
  
  const handleClearFilter = () => {
    setAuthor('');
    onFilterChange({}); // Pass an empty object to clear filters
  };

  const styles = {
    container: {
      padding: '1.5rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    },
    formGroup: { marginBottom: '1rem' },
    label: { display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' },
    input: { width: '100%', padding: '0.5rem', boxSizing: 'border-box' },
    button: { width: '100%', padding: '0.75rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '0.5rem' },
    clearButton: { width: '100%', padding: '0.75rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  };

  return (
    <div style={styles.container}>
      <h3>Filter Books</h3>
      <div style={styles.formGroup}>
        <label htmlFor="author" style={styles.label}>Author</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Filter by author..."
          style={styles.input}
        />
      </div>
      
      {/* Add more filter inputs here if needed */}

      <button onClick={handleApplyFilter} style={styles.button}>Apply Filter</button>
      <button onClick={handleClearFilter} style={styles.clearButton}>Clear Filter</button>
    </div>
  );
};

export default FilterSidebar;