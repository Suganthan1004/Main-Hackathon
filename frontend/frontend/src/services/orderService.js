import api from "./api";

// POST /orders
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

// GET /orders
export const getAllOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// GET /orders/{orderId}
export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

// PUT /orders/{orderId}/cancel
export const cancelOrder = async (orderId) => {
  const response = await api.put(`/orders/${orderId}/cancel`);
  return response.data;
};
