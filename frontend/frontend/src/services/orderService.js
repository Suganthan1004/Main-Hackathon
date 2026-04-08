import api from "./api"
import { USE_MOCK } from "./config"

const delay = (ms) => new Promise(r => setTimeout(r, ms))

let mockOrders = []
let nextOrderId = 100

export const createOrder = async (orderData) => {
  if (USE_MOCK) {
    await delay(500)
    const totalAmount = orderData.items?.reduce((sum, item) => sum + (item.quantity * item.price), 0) || 0
    const order = {
      orderId: nextOrderId++,
      status: "PLACED",
      totalAmount,
      address: orderData.address || "Default Address",
      items: orderData.items
    }
    mockOrders.unshift(order)
    return order
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
    return mockOrders.find(o => o.orderId === orderId) || null
  }
  const response = await api.get(`/orders/${orderId}`)
  return response.data
}

export const cancelOrder = async (orderId) => {
  if (USE_MOCK) {
    await delay(300)
    mockOrders = mockOrders.map(o =>
      o.orderId === orderId ? { ...o, status: "CANCELLED" } : o
    )
    return { message: "Order cancelled successfully" }
  }
  const response = await api.put(`/orders/${orderId}/cancel`)
  return response.data
}
