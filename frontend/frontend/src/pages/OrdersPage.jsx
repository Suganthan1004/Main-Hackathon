import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllOrders, getOrderById, cancelOrder } from '../services/orderService';

function OrdersPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId);
    } else {
      fetchOrders();
    }
  }, [orderId]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
      setSelectedOrder(null);
    } catch (err) {
      setError('Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderById = async (id) => {
    setLoading(true);
    try {
      const data = await getOrderById(id);
      setSelectedOrder(data);
    } catch (err) {
      setError('Failed to load order details.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      await cancelOrder(id);
      if (orderId) {
        fetchOrderById(id);
      } else {
        fetchOrders();
      }
    } catch (err) {
      setError('Failed to cancel order.');
    }
  };

  // Detail view for a single order
  if (selectedOrder) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={() => navigate('/orders')}>← All Orders</button>
          <h1 style={styles.title}>Order Details</h1>
          <div />
        </div>
        <div style={styles.detailCard}>
          <p><strong>Order ID:</strong> {selectedOrder.id}</p>
          <p><strong>Status:</strong> <span style={styles.badge}>{selectedOrder.status}</span></p>
          <p><strong>Total:</strong> ₹{selectedOrder.totalAmount || selectedOrder.total}</p>
          {selectedOrder.items && (
            <div>
              <strong>Items:</strong>
              <ul style={styles.itemList}>
                {selectedOrder.items.map((item, i) => (
                  <li key={i}>{item.name} × {item.quantity} — ₹{item.price * item.quantity}</li>
                ))}
              </ul>
            </div>
          )}
          {selectedOrder.status !== 'CANCELLED' && (
            <button style={styles.cancelBtn} onClick={() => handleCancel(selectedOrder.id)}>
              Cancel Order
            </button>
          )}
        </div>
      </div>
    );
  }

  // List view
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/restaurants')}>← Home</button>
        <h1 style={styles.title}>My Orders</h1>
        <div />
      </div>

      {loading && <p style={styles.loading}>Loading orders...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.list}>
        {orders.map((order, index) => (
          <div
            key={order.id || index}
            style={styles.card}
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <div style={styles.cardRow}>
              <span style={styles.cardId}>Order #{order.id}</span>
              <span style={styles.badge}>{order.status}</span>
            </div>
            <p style={styles.cardTotal}>₹{order.totalAmount || order.total}</p>
            {order.status !== 'CANCELLED' && (
              <button
                style={styles.cancelBtnSmall}
                onClick={(e) => { e.stopPropagation(); handleCancel(order.id); }}
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>

      {!loading && !error && orders.length === 0 && (
        <p style={styles.empty}>No orders yet.</p>
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
    boxShadow: '0 6px 20px rgba(255, 107, 0, 0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  cardId: {
    fontWeight: '700',
    color: '#333',
    fontSize: '1.05rem'
  },
  badge: {
    backgroundColor: '#fff7f0',
    color: '#ff6b00',
    padding: '0.3rem 0.8rem',
    borderRadius: '999px',
    fontWeight: '600',
    fontSize: '0.85rem'
  },
  cardTotal: {
    color: '#555',
    fontWeight: '600',
    margin: '0 0 0.5rem 0'
  },
  cancelBtnSmall: {
    backgroundColor: 'transparent',
    color: '#e53935',
    padding: '0.4rem 1rem',
    border: '1.5px solid #e53935',
    borderRadius: '999px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  detailCard: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(255, 107, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto'
  },
  itemList: {
    paddingLeft: '1.2rem',
    marginTop: '0.5rem'
  },
  cancelBtn: {
    backgroundColor: '#e53935',
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '999px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem'
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

export default OrdersPage;