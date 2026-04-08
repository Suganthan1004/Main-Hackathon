import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getRestaurantMenu } from "../services/restaurantService"
import { useCart } from "../store/cartStore"
import ItemCard from "../components/restaurant/ItemCard"
import RemovalWarningPopup from "../components/cart/RemovalWarningPopup"

const RestaurantPage = () => {
  const { restaurantId } = useParams()
  const navigate = useNavigate()
  const { cartItems, addItem, removeItem, deleteItem, getItemQuantity, totalItems } = useCart()

  const [menu, setMenu] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [removalTarget, setRemovalTarget] = useState(null)

  useEffect(() => {
    fetchMenu()
  }, [restaurantId])

  const fetchMenu = async () => {
    setLoading(true)
    try {
      const data = await getRestaurantMenu(restaurantId)
      setMenu(data)
      setFiltered(data)
    } catch (err) {
      setError("Failed to load menu")
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (type) => {
    setActiveFilter(type)
    if (type === "all") {
      setFiltered(menu)
    } else if (type === "veg") {
      setFiltered(menu.filter((item) => item.veg === true))
    } else if (type === "nonveg") {
      setFiltered(menu.filter((item) => item.veg === false))
    }
  }

  // get unique categories from menu
  const categories = [...new Set(menu.map((item) => item.category).filter(Boolean))]

  const handleFilterByCategory = (cat) => {
    setActiveFilter(cat)
    setFiltered(menu.filter((item) => item.category === cat))
  }

  const handleAdd = (item) => {
    addItem(item, restaurantId)
  }

  const handleRemove = (item) => {
    const qty = getItemQuantity(item.id)
    if (qty === 1) {
      // show warning before removing last one
      setRemovalTarget(item)
    } else {
      removeItem(item.id)
    }
  }

  const confirmRemoval = () => {
    if (removalTarget) {
      deleteItem(removalTarget.id)
      setRemovalTarget(null)
    }
  }

  if (loading) return <p className="loading-text">Loading menu...</p>
  if (error) return <p className="msg-error">{error}</p>

  return (
    <div>
      <button className="back-btn" onClick={() => navigate("/")}>← Back to Restaurants</button>
      <h2 className="page-title">Menu</h2>

      {/* filter row */}
      <div className="filter-row">
        <button
          className={`filter-pill ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => handleFilter("all")}
        >All</button>
        <button
          className={`filter-pill ${activeFilter === "veg" ? "active" : ""}`}
          onClick={() => handleFilter("veg")}
        >Veg</button>
        <button
          className={`filter-pill ${activeFilter === "nonveg" ? "active" : ""}`}
          onClick={() => handleFilter("nonveg")}
        >Non-Veg</button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-pill ${activeFilter === cat ? "active" : ""}`}
            onClick={() => handleFilterByCategory(cat)}
          >{cat}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No items found</p>
      ) : (
        filtered.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            quantity={getItemQuantity(item.id)}
            onAdd={handleAdd}
            onRemove={handleRemove}
            context="restaurant"
          />
        ))
      )}

      {totalItems > 0 && (
        <button className="view-cart-btn" onClick={() => navigate("/cart")}>
          View Cart ({totalItems} items)
        </button>
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

export default RestaurantPage