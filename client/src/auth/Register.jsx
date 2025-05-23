import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import useAuth from './useAuth';

const Register = () => {
  const navigate = useNavigate();
const { setUser } = useAuth();


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await API.post('/auth/register', formData);

      // Save token and user in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Update auth context
      setUser(res.data.user);

      // Redirect based on role
      const role = res.data.user.role;
      navigate(role === 'admin' ? '/admin' : '/dashboard');

    } catch (err) {
      console.error(err);
      if (err.response) {
        // Server responded with an error (4xx or 5xx)
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else if (err.request) {
        // Request was made but no response received (network issues)
        setError('Network error. Please check your connection.');
      } else {
        // Something else happened
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
       
       <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
