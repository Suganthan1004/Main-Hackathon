import api from "./api"
import { USE_MOCK } from "./config"

const delay = (ms) => new Promise(r => setTimeout(r, ms))

export const updateUser = async (userData) => {
  if (USE_MOCK) {
    await delay(400)
    const current = JSON.parse(localStorage.getItem("user") || "{}")
    const updated = { ...current, ...userData }
    localStorage.setItem("user", JSON.stringify(updated))
    return { message: "User details updated successfully" }
  }
  const response = await api.put("/users/update", userData)
  return response.data
}
