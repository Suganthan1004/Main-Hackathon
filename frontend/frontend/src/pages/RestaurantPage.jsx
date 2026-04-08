import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRestaurantMenu } from '../services/restaurantService';
import { isAuthenticated } from '../services/authService';

function RestaurantPage() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, [restaurantId]);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const data = await getRestaurantMenu(restaurantId);
      setMenu(data);
    } catch (err) {
      setError('Failed to load menu.');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      setCart(cart.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((c) => c.id !== itemId));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/restaurants')}>← Back</button>
        <h1 style={styles.title}>Menu</h1>
        <button style={styles.cartBtn} onClick={() => navigate('/cart')}>
          Cart ({cart.reduce((sum, c) => sum + c.quantity, 0)})
        </button>
      </div>

      {loading && <p style={styles.loading}>Loading menu...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.grid}>
        {menu.map((item, index) => (
          <div key={item.id || index} style={styles.card}>
            <h3 style={styles.cardTitle}>{item.name}</h3>
            <p style={styles.cardDesc}>{item.description || ''}</p>
            <p style={styles.price}>₹{item.price}</p>
            <button style={styles.addBtn} onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {!loading && !error && menu.length === 0 && (
        <p style={styles.empty}>No items on the menu.</p>
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
  cartBtn: {
    backgroundColor: '#ff6b00',
    color: '#ffffff',
    padding: '0.6rem 1.5rem',
    border: 'none',
    borderRadius: '999px',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '20px',
    boxShadow: '0 6px 20px rgba(255, 107, 0, 0.08)',
  },
  cardTitle: {
    color: '#ff6b00',
    fontWeight: '700',
    fontSize: '1.2rem',
    margin: '0 0 0.4rem 0'
  },
  cardDesc: {
    color: '#777',
    margin: '0 0 0.5rem 0',
    fontSize: '0.9rem'
  },
  price: {
    color: '#333',
    fontWeight: '700',
    fontSize: '1.1rem',
    margin: '0 0 0.75rem 0'
  },
  addBtn: {
    backgroundColor: '#ff6b00',
    color: '#ffffff',
    padding: '0.5rem 1.2rem',
    border: 'none',
    borderRadius: '999px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
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

export default RestaurantPage;