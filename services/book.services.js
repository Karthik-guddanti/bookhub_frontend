// --- book.service.js ---
// This file is in /frontend/src/services/

import api from './api'; // Import your central axios instance

/**
 * @desc    Get all books for the user dashboard (with filters)
 * @param   {object} [filters] - Optional filters, e.g., { author: 'John Doe' }
 * @returns {array} Array of book objects
 */
const getAllBooks = async (filters = {}) => {
  try {
    // Pass the filters object as query parameters
    const response = await api.get('/books', { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching books.';
  }
};

// --- ADMIN-SPECIFIC FUNCTIONS ---

/**
 * @desc    Get all books added by the logged-in admin
 * @returns {array} Array of book objects
 */
const getMyBooks = async () => {
  try {
    const response = await api.get('/admin/books'); // Calls the admin route
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching your books.';
  }
};

/**
 * @desc    Add a new book
 * @param   {object} bookData - { title, author, description, imageUrl }
 * @returns {object} The newly created book object
 */
const addBook = async (bookData) => {
  try {
    const response = await api.post('/admin/books', bookData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error adding book.';
  }
};

/**
 * @desc    Update a book
 * @param   {string} bookId - The ID of the book to update
 * @param   {object} bookData - { title, author, description, imageUrl }
 * @returns {object} The updated book object
 */
const updateBook = async (bookId, bookData) => {
  try {
    const response = await api.put(`/admin/books/${bookId}`, bookData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error updating book.';
  }
};

/**
 * @desc    Delete a book by its ID
 * @param   {string} bookId
 * @returns {object} Success message
 */
const deleteBook = async (bookId) => {
  try {
    const response = await api.delete(`/admin/books/${bookId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error deleting book.';
  }
};

const bookService = {
  getAllBooks,
  getMyBooks,
  addBook,
  updateBook,
  deleteBook,
};

export default bookService;