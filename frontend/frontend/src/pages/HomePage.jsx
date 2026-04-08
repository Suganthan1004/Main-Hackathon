import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllRestaurants } from '../services/restaurantService';
import { useAuth } from '../store/authStore';

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated: loggedIn, logout: contextLogout } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const data = await getAllRestaurants();
      setRestaurants(data);
    } catch (err) {
      setError('Failed to load restaurants.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    contextLogout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Restaurants</h1>
        <div style={styles.nav}>
          {loggedIn ? (
            <>
              <button style={styles.navBtn} onClick={() => navigate('/orders')}>My Orders</button>
              <button style={styles.navBtn} onClick={() => navigate('/cart')}>Cart</button>
              <button style={styles.navBtn} onClick={() => navigate('/profile')}>Profile</button>
              <button style={styles.navBtnOutline} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button style={styles.navBtn} onClick={() => navigate('/login')}>Login</button>
              <button style={styles.navBtnOutline} onClick={() => navigate('/register')}>Register</button>
            </>
          )}
        </div>
      </div>

      {loading && <p style={styles.loading}>Loading restaurants...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.grid}>
        {restaurants.map((r, index) => (
          <div
            key={r.id || index}
            style={styles.card}
            onClick={() => navigate(`/restaurants/${r.id}/menu`)}
          >
            <h3 style={styles.cardTitle}>{r.name}</h3>
            <p style={styles.cardDesc}>{r.address || r.cuisine || 'View Menu →'}</p>
          </div>
        ))}
      </div>

      {!loading && !error && restaurants.length === 0 && (
        <p style={styles.empty}>No restaurants found.</p>
      )}
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
  nav: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
  navBtn: {
    backgroundColor: '#ff6b00',
    color: '#ffffff',
    padding: '0.6rem 1.5rem',
    border: 'none',
    borderRadius: '999px',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  navBtnOutline: {
    backgroundColor: '#ffffff',
    color: '#ff6b00',
    padding: '0.6rem 1.5rem',
    border: '2px solid #ff6b00',
    borderRadius: '999px',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '20px',
    boxShadow: '0 6px 20px rgba(255, 107, 0, 0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  cardTitle: {
    color: '#ff6b00',
    fontWeight: '700',
    fontSize: '1.3rem',
    margin: '0 0 0.5rem 0'
  },
  cardDesc: {
    color: '#777',
    margin: 0,
    fontSize: '0.95rem'
  },
  loading: {
    color: '#ff6b00',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '1.1rem'
  },
  error: {
    color: '#e53935',
    textAlign: 'center',
    fontWeight: '600'
  },
  empty: {
    color: '#999',
    textAlign: 'center',
    fontSize: '1.1rem',
    marginTop: '2rem'
  }
};

export default HomePage;