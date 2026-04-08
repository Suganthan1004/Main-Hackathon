import React, { useState } from 'react';

const RegisterForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (onRegister) {
      onRegister({ name, email, password });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(255, 107, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    boxSizing: 'border-box'
  },
  title: {
    color: '#ff6b00',
    textAlign: 'center',
    marginBottom: '2rem',
    marginTop: 0,
    fontWeight: '800',
    fontSize: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  label: {
    color: '#555',
    fontSize: '0.95rem',
    fontWeight: '600',
    marginLeft: '0.5rem',
  },
  input: {
    padding: '1rem 1.2rem',
    border: '2px solid transparent',
    backgroundColor: '#fff7f0',
    borderRadius: '999px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
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
  }
};

export default RegisterForm;
