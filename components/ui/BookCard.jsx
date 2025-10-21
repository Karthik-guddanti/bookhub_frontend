// --- BookCard.jsx ---
// This file is in /frontend/src/components/ui/

import React from 'react';

const BookCard = ({ book }) => {
  const styles = {
    card: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
    },
    img: {
      width: '100%',
      height: '300px',
      objectFit: 'cover',
    },
    content: {
      padding: '1rem',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    author: {
      fontSize: '1rem',
      color: '#555',
      marginBottom: '0.5rem',
    },
    description: {
      fontSize: '0.9rem',
      color: '#777',
    },
  };

  return (
    <div style={styles.card}>
      <img src={book.imageUrl} alt={book.title} style={styles.img} />
      <div style={styles.content}>
        <h3 style={styles.title}>{book.title}</h3>
        <p style={styles.author}>by {book.author}</p>
        <p style={styles.description}>
          {book.description.substring(0, 150)}...
        </p>
      </div>
    </div>
  );
};

export default BookCard;