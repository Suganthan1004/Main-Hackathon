import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { login } from '../services/authService';
import { useAuth } from '../store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login: contextLogin } = useAuth();

  const handleLogin = async (credentials) => {
    setError('');
    setLoading(true);
    try {
      const data = await login(credentials);
      // data should contain { user, token }
      contextLogin(data.user, data.token);
      navigate('/restaurants');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={styles.page}>
      <LoginForm onLogin={handleLogin} />
      {error && <p style={styles.error}>{error}</p>}
      {loading && <p style={styles.loading}>Logging in...</p>}
      <p style={styles.linkText}>
        Don't have an account? <a href="/register" style={styles.link}>Register here</a>
      </p>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff3e0',
    padding: '1rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  linkText: {
    marginTop: '1.5rem',
    color: '#333'
  },
  link: {
    color: '#ff6b00',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  error: {
    color: '#e53935',
    marginTop: '1rem',
    fontWeight: '600',
    textAlign: 'center'
  },
  loading: {
    color: '#ff6b00',
    marginTop: '1rem',
    fontWeight: '600'
  }
};

export default LoginPage;
