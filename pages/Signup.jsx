// --- Signup.jsx ---
// This file is in /frontend/src/pages/

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/auth.service';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Call the API service
      const userData = await authService.signup(username, password, role);

      // 2. Log the user in immediately
      auth.login(userData);

      // 3. Redirect based on role
      if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };
  
  // (Using the same styles object as Login for consistency)
  const styles = {
    container: { maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' },
    formGroup: { marginBottom: '1rem' },
    label: { display: 'block', marginBottom: '0.5rem' },
    input: { width: '100%', padding: '0.5rem', boxSizing: 'border-box' },
    button: { width: '100%', padding: '0.75rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    error: { color: 'red', marginTop: '1rem' },
    link: { display: 'block', textAlign: 'center', marginTop: '1rem' },
    radioGroup: { display: 'flex', gap: '1rem', marginBottom: '1rem' }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
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
        
        {/* --- This is your Role Selector --- */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Sign up as:</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === 'user'}
                onChange={(e) => setRole(e.target.value)}
              /> User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === 'admin'}
                onChange={(e) => setRole(e.target.value)}
              /> Admin
            </label>
          </div>
        </div>
        {/* --- End of Role Selector --- */}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
      <Link to="/login" style={styles.link}>Already have an account? Log In</Link>
    </div>
  );
};

export default Signup;