import api from "./api";

// PUT /users/update
export const updateUser = async (userData) => {
  const response = await api.put("/users/update", userData);
  return response.data;
};
