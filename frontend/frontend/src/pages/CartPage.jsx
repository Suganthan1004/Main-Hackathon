import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../store/cartStore"
import { createOrder } from "../services/orderService"
import ItemCard from "../components/restaurant/ItemCard"
import RemovalWarningPopup from "../components/cart/RemovalWarningPopup"

const CartPage = () => {
  const navigate = useNavigate()
  const { cartItems, addItem, removeItem, deleteItem, getItemQuantity, clearCart, totalPrice, restaurantId } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [removalTarget, setRemovalTarget] = useState(null)

  const handleAdd = (item) => {
    addItem(item, restaurantId)
  }

  const handleRemove = (item) => {
    const qty = getItemQuantity(item.menuItemId)
    if (qty === 1) {
      setRemovalTarget(item)
    } else {
      removeItem(item.menuItemId)
    }
  }

  const confirmRemoval = () => {
    if (removalTarget) {
      deleteItem(removalTarget.menuItemId)
      setRemovalTarget(null)
    }
  }

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return
    setLoading(true)
    setError("")
    try {
      const payload = {
        restaurantId,
        items: cartItems.map((ci) => ({
          menuItemId: ci.menuItemId,
          quantity: ci.quantity
        }))
      }
      await createOrder(payload)
      clearCart()
      setOrderPlaced(true)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order")
    } finally {
      setLoading(false)
    }
  }

  // order success overlay
  if (orderPlaced) {
    return (
      <div className="order-success-overlay">
        <div className="order-success-icon">✓</div>
        <div className="order-success-text">Order placed successfully!</div>
        <button
          className="form-submit-btn"
          style={{ marginTop: "1.5rem" }}
          onClick={() => navigate("/orders")}
        >
          View My Orders
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="page-title">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty</p>
          <button className="form-submit-btn" style={{ marginTop: "1rem" }} onClick={() => navigate("/")}>
            Browse Restaurants
          </button>
        </div>
      ) : (
        <>
          {cartItems.map((ci) => (
            <ItemCard
              key={ci.menuItemId}
              item={{ id: ci.menuItemId, name: ci.name, price: ci.price, imageUrl: ci.imageUrl }}
              quantity={ci.quantity}
              onAdd={() => handleAdd({ id: ci.menuItemId, name: ci.name, price: ci.price, imageUrl: ci.imageUrl })}
              onRemove={() => handleRemove(ci)}
              context="cart"
            />
          ))}

          <div className="cart-summary">
            <div className="cart-total">Total: ₹{totalPrice}</div>
            <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
              {loading ? "Placing..." : "Place Order"}
            </button>
          </div>
          {error && <p className="msg-error" style={{ marginTop: "1rem" }}>{error}</p>}
        </>
      )}

      {removalTarget && (
        <RemovalWarningPopup
          itemName={removalTarget.name}
          onCancel={() => setRemovalTarget(null)}
          onConfirm={confirmRemoval}
        />
      )}
    </div>
  )
}

export default CartPage