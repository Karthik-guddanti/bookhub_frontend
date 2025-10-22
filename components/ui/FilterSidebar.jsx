// --- FilterSidebar.jsx ---
// This file is in /frontend/src/components/ui/

import React, { useState } from 'react';

const FilterSidebar = ({ onFilterChange }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleApplyFilter = () => {
    // Pass the filter state up to the dashboard
    onFilterChange({ author, title, description });
  };
  
  const handleClearFilter = () => {
    setAuthor('');
    setTitle('');
    setDescription('');
    onFilterChange({}); // Pass an empty object to clear filters
  };

  return (
    <div className="card-gradient p-6 h-fit sticky top-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <svg className="icon-sm text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
        </div>
        <h3 className="text-xl font-poppins font-bold text-gray-800">Filter Books</h3>
      </div>

      {/* Filter Form */}
      <div className="space-y-5">
        {/* Author Filter */}
        <div className="space-y-2">
          <label htmlFor="author" className="block text-sm font-poppins font-semibold text-gray-700 uppercase tracking-wide">
            Author
          </label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 icon-sm text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Search by author name..."
              className="input-field pl-10"
            />
          </div>
        </div>
        
        {/* Title Filter */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-poppins font-semibold text-gray-700 uppercase tracking-wide">
            Title
          </label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 icon-sm text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Search by book title..."
              className="input-field pl-10"
            />
          </div>
        </div>
        
        {/* Description Filter */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-poppins font-semibold text-gray-700 uppercase tracking-wide">
            Description
          </label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 icon-sm text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Search by book description..."
              className="input-field pl-10"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        <button 
          onClick={handleApplyFilter} 
          className="btn-primary w-full flex items-center justify-center gap-2 font-poppins"
        >
          <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Apply Filters
        </button>
        <button 
          onClick={handleClearFilter} 
          className="btn-secondary w-full flex items-center justify-center gap-2 font-poppins"
        >
          <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;