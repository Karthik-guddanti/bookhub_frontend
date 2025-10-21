// --- Navbar.jsx ---
// This file is in /frontend/src/components/common/

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth(); // Get user and logout function from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  // Basic styling
  const styles = {
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#f8f8f8',
      borderBottom: '1px solid #ddd',
    },
    logo: {
      textDecoration: 'none',
      color: '#333',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    link: {
      textDecoration: 'none',
      color: '#555',
    },
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    welcome: {
      marginRight: '1rem',
    }
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        BookHub
      </Link>
      <div style={styles.navLinks}>
        {user ? (
          // --- Show if user IS logged in ---
          <>
            <span style={styles.welcome}>
              Welcome, {user.username} ({user.role})
            </span>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          // --- Show if user is NOT logged in ---
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/signup" style={styles.link}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;