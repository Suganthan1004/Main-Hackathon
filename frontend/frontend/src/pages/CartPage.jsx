import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';

function CartPage() {
  const navigate = useNavigate();
  // In a real app, cart state would come from context or global store.
  // For now, this demonstrates the createOrder API call flow.
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQuantity = (id, delta) => {
    setCart(cart.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const orderPayload = {
        items: cart.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
      };
      await createOrder(orderPayload);
      setSuccess('Order placed successfully!');
      setCart([]);
      setTimeout(() => navigate('/orders'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>
        <h1 style={styles.title}>Your Cart</h1>
        <div />
      </div>

      {cart.length === 0 && !success && (
        <div style={styles.emptyState}>
          <p style={styles.empty}>Your cart is empty.</p>
          <button style={styles.shopBtn} onClick={() => navigate('/restaurants')}>
            Browse Restaurants
          </button>
        </div>
      )}

      <div style={styles.list}>
        {cart.map((item, index) => (
          <div key={item.id || index} style={styles.card}>
            <div style={styles.cardRow}>
              <span style={styles.itemName}>{item.name}</span>
              <span style={styles.itemPrice}>₹{item.price * item.quantity}</span>
            </div>
            <div style={styles.cardActions}>
              <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, -1)}>−</button>
              <span style={styles.qty}>{item.quantity}</span>
              <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, 1)}>+</button>
              <button style={styles.removeBtn} onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={styles.footer}>
          <p style={styles.total}>Total: ₹{totalAmount}</p>
          <button
            style={styles.orderBtn}
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      )}

      {success && <p style={styles.success}>{success}</p>}
      {error && <p style={styles.error}>{error}</p>}
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
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '600px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '20px',
    boxShadow: '0 6px 20px rgba(255, 107, 0, 0.08)'
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem'
  },
  itemName: {
    fontWeight: '700',
    color: '#333',
    fontSize: '1.05rem'
  },
  itemPrice: {
    fontWeight: '700',
    color: '#ff6b00',
    fontSize: '1.05rem'
  },
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  qtyBtn: {
    backgroundColor: '#fff7f0',
    color: '#ff6b00',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qty: {
    fontWeight: '700',
    fontSize: '1rem',
    minWidth: '24px',
    textAlign: 'center'
  },
  removeBtn: {
    backgroundColor: 'transparent',
    color: '#e53935',
    border: '1.5px solid #e53935',
    borderRadius: '999px',
    padding: '0.3rem 0.8rem',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: 'auto'
  },
  footer: {
    maxWidth: '600px',
    margin: '2rem auto 0',
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '20px',
    boxShadow: '0 6px 20px rgba(255, 107, 0, 0.08)',
    textAlign: 'center'
  },
  total: {
    fontSize: '1.3rem',
    fontWeight: '800',
    color: '#333',
    marginBottom: '1rem'
  },
  orderBtn: {
    backgroundColor: '#ff6b00',
    color: '#ffffff',
    padding: '1rem 2.5rem',
    border: 'none',
    borderRadius: '999px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
    transition: 'all 0.3s ease'
  },
  shopBtn: {
    backgroundColor: '#ff6b00',
    color: '#ffffff',
    padding: '0.8rem 2rem',
    border: 'none',
    borderRadius: '999px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  emptyState: {
    textAlign: 'center',
    marginTop: '3rem'
  },
  empty: {
    color: '#999',
    fontSize: '1.1rem'
  },
  success: {
    color: '#2e7d32',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: '1rem'
  },
  error: {
    color: '#e53935',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: '1rem'
  }
};

export default CartPage;