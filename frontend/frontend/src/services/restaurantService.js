import api from "./api";

// GET /restaurants
export const getAllRestaurants = async () => {
  const response = await api.get("/restaurants");
  return response.data;
};

// GET /restaurants/{restaurantId}/menu
export const getRestaurantMenu = async (restaurantId) => {
  const response = await api.get(`/restaurants/${restaurantId}/menu`);
  return response.data;
};
