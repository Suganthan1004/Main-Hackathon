import api from "./api"
import { USE_MOCK } from "./config"

const delay = (ms) => new Promise(r => setTimeout(r, ms))

// in-memory mock orders for testing
let mockOrders = []
let nextOrderId = 1

export const createOrder = async (orderData) => {
  if (USE_MOCK) {
    await delay(500)
    const newOrder = {
      id: nextOrderId++,
      ...orderData,
      status: "CONFIRMED",
      totalAmount: orderData.items?.reduce((s, i) => s + (i.quantity * 100), 0) || 0,
      createdAt: new Date().toISOString()
    }
    mockOrders.unshift(newOrder)
    return newOrder
  }
  const response = await api.post("/orders", orderData)
  return response.data
}

export const getAllOrders = async () => {
  if (USE_MOCK) {
    await delay(300)
    return mockOrders
  }
  const response = await api.get("/orders")
  return response.data
}

export const getOrderById = async (orderId) => {
  if (USE_MOCK) {
    await delay(300)
    return mockOrders.find(o => o.id === orderId) || null
  }
  const response = await api.get(`/orders/${orderId}`)
  return response.data
}

export const cancelOrder = async (orderId) => {
  if (USE_MOCK) {
    await delay(300)
    mockOrders = mockOrders.map(o =>
      o.id === orderId ? { ...o, status: "CANCELLED" } : o
    )
    return { message: "Order cancelled" }
  }
  const response = await api.put(`/orders/${orderId}/cancel`)
  return response.data
}
