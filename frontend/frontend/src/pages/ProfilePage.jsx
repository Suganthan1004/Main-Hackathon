import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../services/userService';

function ProfilePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const payload = {};
      if (name) payload.name = name;
      if (email) payload.email = email;
      if (password) payload.password = password;
      await updateUser(payload);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/restaurants')}>← Home</button>
        <h1 style={styles.title}>Profile</h1>
        <div />
      </div>

      <form onSubmit={handleUpdate} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder="Enter new name"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Enter new email"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter new password"
          />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fff3e0',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  title: {
    color: '#ff6b00',
    fontWeight: '800',
    fontSize: '2.5rem',
    margin: 0
  },
  backBtn: {
    backgroundColor: '#ffffff',
    color: '#ff6b00',
    padding: '0.6rem 1.5rem',
    border: '2px solid #ff6b00',
    borderRadius: '999px',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(255, 107, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem'
  },
  label: {
    color: '#555',
    fontSize: '0.95rem',
    fontWeight: '600',
    marginLeft: '0.5rem'
  },
  input: {
    padding: '1rem 1.2rem',
    border: '2px solid transparent',
    backgroundColor: '#fff7f0',
    borderRadius: '999px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease'
  },
  button: {
    backgroundColor: '#ff6b00',
    color: '#ffffff',
    padding: '1rem',
    border: 'none',
    borderRadius: '999px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
    boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
    transition: 'all 0.3s ease'
  },
  success: {
    color: '#2e7d32',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '0.5rem'
  },
  error: {
    color: '#e53935',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '0.5rem'
  }
};

export default ProfilePage;