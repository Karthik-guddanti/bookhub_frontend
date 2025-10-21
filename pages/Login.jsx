// --- Login.jsx ---
// This file is in /frontend/src/pages/

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/auth.service';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth(); // Get the login function from our context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Call the API service
      const userData = await authService.login(username, password);

      // 2. Update the global auth state
      auth.login(userData);

      // 3. Redirect based on user role
      if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.toString()); // Show error from the service
    } finally {
      setLoading(false);
    }
  };

  // Basic styling
  const styles = {
    container: { maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' },
    formGroup: { marginBottom: '1rem' },
    label: { display: 'block', marginBottom: '0.5rem' },
    input: { width: '100%', padding: '0.5rem', boxSizing: 'border-box' },
    button: { width: '100%', padding: '0.75rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    error: { color: 'red', marginTop: '1rem' },
    link: { display: 'block', textAlign: 'center', marginTop: '1rem' }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
      <Link to="/signup" style={styles.link}>Don't have an account? Sign Up</Link>
    </div>
  );
};

export default Login;