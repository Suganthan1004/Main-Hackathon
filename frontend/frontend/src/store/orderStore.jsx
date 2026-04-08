import React, { createContext, useContext, useState } from "react"
import { getAllOrders as fetchOrders, cancelOrder as cancelOrderApi } from "../services/orderService"

const OrderContext = createContext()

export const useOrders = () => useContext(OrderContext)

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const loadOrders = async () => {
    setLoading(true)
    try {
      const data = await fetchOrders()
      setOrders(data)
    } catch (err) {
      console.error("could not fetch orders", err)
    } finally {
      setLoading(false)
    }
  }

  const cancelOrder = async (orderId) => {
    try {
      await cancelOrderApi(orderId)
      setOrders(prev =>
        prev.map(o => o.orderId === orderId ? { ...o, status: "CANCELLED" } : o)
      )
    } catch (err) {
      console.error("cancel failed", err)
    }
  }

  return (
    <OrderContext.Provider value={{
      orders, loading, loadOrders, cancelOrder
    }}>
      {children}
    </OrderContext.Provider>
  )
}
