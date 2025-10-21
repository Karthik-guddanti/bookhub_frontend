// --- AdminDashboard.jsx ---
// This file is in /frontend/src/pages/

import React, { useState, useEffect } from 'react';
import bookService from '../services/book.services';
import EditBookModal from '../components/ui/EditBookModal'; // <-- IMPORT THE MODAL

const AdminDashboard = () => {
  // ... (existing states for myBooks, form fields, loading, error)
  const [myBooks, setMyBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // --- NEW STATES FOR THE MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // --- Fetch books on component mount ---
  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const books = await bookService.getMyBooks();
        setMyBooks(books);
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchMyBooks();
  }, []);

  // --- Handle adding a new book ---
  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const newBook = await bookService.addBook({ title, author, description, imageUrl });
      setMyBooks([newBook, ...myBooks]);
      // Clear form fields
      setTitle('');
      setAuthor('');
      setDescription('');
      setImageUrl('');
    } catch (err) {
      setError(err.toString());
    }
  };

  // --- Handle deleting a book ---
  const handleDeleteBook = async (bookId) => {
    try {
      await bookService.deleteBook(bookId);
      setMyBooks(myBooks.filter((book) => book._id !== bookId));
    } catch (err) {
      setError(err.toString());
    }
  };

  // --- NEW FUNCTIONS TO HANDLE THE MODAL ---
  const handleOpenEditModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleBookUpdated = (updatedBook) => {
    // Find the book in the state and replace it with the updated version
    setMyBooks(
      myBooks.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      )
    );
  };

  // --- Basic Styling ---
  const styles = {
    // ... (all your existing styles: container, formContainer, listContainer, etc.)
    container: { display: 'flex', gap: '2rem', padding: '2rem' },
    formContainer: { flex: 1, padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px' },
    listContainer: { flex: 2 },
    formGroup: { marginBottom: '1rem' },
    label: { display: 'block', marginBottom: '0.5rem' },
    input: { width: '100%', padding: '0.5rem', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '0.5rem', minHeight: '80px', boxSizing: 'border-box' },
    button: { width: '100%', padding: '0.75rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    bookItem: { display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #eee', marginBottom: '1rem', borderRadius: '8px' },
    bookImg: { width: '80px', height: '120px', objectFit: 'cover' },
    bookInfo: { flex: 1 },
    bookActions: { display: 'flex', flexDirection: 'column', gap: '0.5rem' }, // <-- NEW
    editButton: { backgroundColor: '#007bff', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }, // <-- NEW
    deleteButton: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' },
    error: { color: 'red', marginTop: '1rem' },
  };

  return (
    <div style={styles.container}>
      {/* --- ADD BOOK FORM --- */}
      <div style={styles.formContainer}>
        <h2>Add a New Book</h2>
        <form onSubmit={handleAddBook}>
          <div style={styles.formGroup}>
            <label htmlFor="title" style={styles.label}>Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="author" style={styles.label}>Author</label>
            <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.label}>Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required style={styles.textarea} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="imageUrl" style={styles.label}>Image URL</label>
            <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required style={styles.input} />
          </div>
          <button type="submit" style={styles.button}>Add Book</button>
        </form>
      </div>

      {/* --- LIST OF ADMIN'S BOOKS --- */}
      <div style={styles.listContainer}>
        <h2>My Added Books</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}
        <div>
          {!loading && !error && myBooks.length === 0 && <p>You haven't added any books yet.</p>}
          
          {myBooks.map((book) => (
            <div key={book._id} style={styles.bookItem}>
              <img src={book.imageUrl} alt={book.title} style={styles.bookImg} />
              <div style={styles.bookInfo}>
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                <p>{book.description.substring(0, 100)}...</p>
              </div>
              {/* --- UPDATED BUTTONS --- */}
              <div style={styles.bookActions}>
                <button 
                  onClick={() => handleOpenEditModal(book)} 
                  style={styles.editButton}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteBook(book._id)} 
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- RENDER THE MODAL --- */}
      {isModalOpen && selectedBook && (
        <EditBookModal
          book={selectedBook}
          onClose={handleCloseModal}
          onBookUpdated={handleBookUpdated}
        />
      )}
    </div>
  );
};

export default AdminDashboard;