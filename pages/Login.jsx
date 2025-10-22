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
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(https://www.shutterstock.com/image-illustration/interior-modern-public-library-concrete-260nw-2336527651.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-md w-full p-8 border border-gray-300 rounded-lg bg-white/95 backdrop-blur-sm shadow-xl">
      <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none bg-white hover:border-gray-400"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none bg-white hover:border-gray-400"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/25 text-white font-poppins font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:-translate-y-1 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="text-red-600 text-sm mt-4 text-center">{error}</p>}
      </form>
      <Link to="/signup" className="block text-center mt-6 text-blue-600 hover:text-blue-700 font-poppins">
        Don't have an account? Sign Up
      </Link>
      </div>
    </div>
  );
};

export default Login;