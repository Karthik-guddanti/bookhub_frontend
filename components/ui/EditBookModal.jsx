// --- EditBookModal.jsx ---
// This file is in /frontend/src/components/ui/

import React, { useState, useEffect } from 'react';
import bookService from '../../services/book.services';

const EditBookModal = ({ book, onClose, onBookUpdated }) => {
  // State for the form fields, pre-filled with the book's data
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [imageUrl, setImageUrl] = useState(book.imageUrl);
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // This effect updates the form if the 'book' prop changes
  useEffect(() => {
    setTitle(book.title);
    setAuthor(book.author);
    setDescription(book.description);
    setImageUrl(book.imageUrl);
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedData = { title, author, description, imageUrl };
      const updatedBook = await bookService.updateBook(book._id, updatedData);
      
      onBookUpdated(updatedBook); // Pass the updated book back to the dashboard
      onClose(); // Close the modal
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  // --- Basic Modal Styling ---
  const styles = {
    modalOverlay: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    },
    modalContent: {
      backgroundColor: 'white', padding: '2rem', borderRadius: '8px',
      width: '90%', maxWidth: '500px',
    },
    formGroup: { marginBottom: '1rem' },
    label: { display: 'block', marginBottom: '0.5rem' },
    input: { width: '100%', padding: '0.5rem', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '0.5rem', minHeight: '80px', boxSizing: 'border-box' },
    buttonRow: { display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' },
    saveButton: { padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    cancelButton: { padding: '0.5rem 1rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    error: { color: 'red', marginTop: '1rem' },
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="edit-title" style={styles.label}>Title</label>
            <input type="text" id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="edit-author" style={styles.label}>Author</label>
            <input type="text" id="edit-author" value={author} onChange={(e) => setAuthor(e.target.value)} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="edit-description" style={styles.label}>Description</label>
            <textarea id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} required style={styles.textarea} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="edit-imageUrl" style={styles.label}>Image URL</label>
            <input type="text" id="edit-imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required style={styles.input} />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.buttonRow}>
            <button type="button" onClick={onClose} style={styles.cancelButton}>Cancel</button>
            <button type="submit" style={styles.saveButton} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;