import React, { useEffect } from "react"
import { useOrders } from "../store/orderStore"

const OrdersPage = () => {
  const { orders, loading, loadOrders, cancelOrder } = useOrders()

  useEffect(() => {
    loadOrders()
  }, [])

  const handleCancel = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      cancelOrder(orderId)
    }
  }

  if (loading) return <p className="loading-text">Loading orders...</p>

  return (
    <div>
      <h2 className="page-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-state">No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className="order-card">
            <div className="order-card-header">
              <span className="order-id">Order #{order.orderId}</span>
              <span className="order-status">{order.status}</span>
            </div>
            <div className="order-total">₹{order.totalAmount}</div>
            {order.address && (
              <div style={{ fontSize: "0.85rem", color: "#888", marginTop: "0.25rem" }}>
                Delivery: {order.address}
              </div>
            )}
            {order.items && (
              <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem", color: "#666", fontSize: "0.9rem" }}>
                {order.items.map((item, i) => (
                  <li key={i}>{item.name} x {item.quantity} — ₹{item.price * item.quantity}</li>
                ))}
              </ul>
            )}
            {order.status !== "CANCELLED" && (
              <button className="cancel-btn" onClick={() => handleCancel(order.orderId)}>
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default OrdersPage