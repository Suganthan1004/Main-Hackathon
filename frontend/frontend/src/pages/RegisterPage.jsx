import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { register } from '../services/authService';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data) => {
    setError('');
    setLoading(true);
    try {
      await register(data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <RegisterForm onRegister={handleRegister} />
      {error && <p style={styles.error}>{error}</p>}
      {loading && <p style={styles.loading}>Creating account...</p>}
      <p style={styles.linkText}>
        Already have an account? <a href="/login" style={styles.link}>Login here</a>
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

export default RegisterPage;
