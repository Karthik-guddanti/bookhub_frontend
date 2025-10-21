// --- Home.jsx ---
// This file is in /frontend/src/pages/

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth(); // Check if a user is logged in

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: '#f4f7f6',
      height: 'calc(100vh - 200px)', // Adjust height as needed
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '1rem',
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#555',
      marginBottom: '2.5rem',
      maxWidth: '600px',
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
    },
    button: {
      display: 'inline-block',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#007bff',
      textDecoration: 'none',
      borderRadius: '8px',
      transition: 'background-color 0.3s ease',
    },
    buttonSecondary: {
      backgroundColor: '#6c757d',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to BookHub</h1>
      <p style={styles.subtitle}>
        Your personal digital library. Manage your collection as an admin, or
        browse the complete works as a user.
      </p>
      <div style={styles.buttonContainer}>
        {user ? (
          // --- If User is Logged In ---
          <Link
            to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
            style={styles.button}
          >
            Go to Your Dashboard
          </Link>
        ) : (
          // --- If User is Logged Out ---
          <>
            <Link to="/login" style={styles.button}>
              Login
            </Link>
            <Link
              to="/signup"
              style={{ ...styles.button, ...styles.buttonSecondary }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;