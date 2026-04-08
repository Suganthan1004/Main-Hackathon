import React, { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [restaurantId, setRestaurantId] = useState(null)

  const addItem = (item, restId) => {
    if (restaurantId && restaurantId !== restId) {
      setCartItems([])
    }
    setRestaurantId(restId)

    setCartItems(prev => {
      const existing = prev.find(ci => ci.menuItemId === item.id)
      if (existing) {
        return prev.map(ci =>
          ci.menuItemId === item.id
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        )
      }
      return [...prev, {
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        quantity: 1
      }]
    })
  }

  const removeItem = (itemId) => {
    setCartItems(prev => {
      const existing = prev.find(ci => ci.menuItemId === itemId)
      if (!existing) return prev
      if (existing.quantity === 1) {
        return prev.filter(ci => ci.menuItemId !== itemId)
      }
      return prev.map(ci =>
        ci.menuItemId === itemId
          ? { ...ci, quantity: ci.quantity - 1 }
          : ci
      )
    })
  }

  const deleteItem = (itemId) => {
    setCartItems(prev => prev.filter(ci => ci.menuItemId !== itemId))
  }

  const clearCart = () => {
    setCartItems([])
    setRestaurantId(null)
  }

  const getItemQuantity = (itemId) => {
    const found = cartItems.find(ci => ci.menuItemId === itemId)
    return found ? found.quantity : 0
  }

  const totalItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0)
  const totalPrice = cartItems.reduce((sum, ci) => sum + ci.price * ci.quantity, 0)

  return (
    <CartContext.Provider value={{
      cartItems, restaurantId,
      addItem, removeItem, deleteItem, clearCart,
      getItemQuantity, totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}
