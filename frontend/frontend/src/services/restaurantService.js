import api from "./api"
import { USE_MOCK } from "./config"

const delay = (ms) => new Promise(r => setTimeout(r, ms))

const mockRestaurants = [
  { id: 1, name: "Spice Garden", location: "Anna Nagar, Chennai", contact: "9876543210" },
  { id: 2, name: "Pizza Planet", location: "T Nagar, Chennai", contact: "9876543211" },
  { id: 3, name: "Dragon Wok", location: "Velachery, Chennai", contact: "9876543212" },
  { id: 4, name: "Burger Barn", location: "Adyar, Chennai", contact: "9876543213" },
]

const mockMenus = {
  1: [
    { id: 1, name: "Butter Chicken", price: 280, category: "MAIN_COURSE", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200&h=200&fit=crop" },
    { id: 2, name: "Paneer Tikka", price: 220, category: "STARTERS", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200&h=200&fit=crop" },
    { id: 3, name: "Dal Makhani", price: 180, category: "MAIN_COURSE", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&h=200&fit=crop" },
    { id: 4, name: "Chicken Biryani", price: 320, category: "RICE", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop" },
    { id: 5, name: "Gulab Jamun", price: 100, category: "DESSERTS", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1666190070948-37d81fae04b9?w=200&h=200&fit=crop" },
  ],
  2: [
    { id: 6, name: "Margherita Pizza", price: 350, category: "MAIN_COURSE", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop" },
    { id: 7, name: "Pepperoni Pizza", price: 420, category: "MAIN_COURSE", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop" },
    { id: 8, name: "Garlic Bread", price: 150, category: "STARTERS", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1619531040576-f9416aabed02?w=200&h=200&fit=crop" },
    { id: 9, name: "Pasta Alfredo", price: 300, category: "MAIN_COURSE", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=200&h=200&fit=crop" },
  ],
  3: [
    { id: 10, name: "Veg Manchurian", price: 200, category: "STARTERS", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=200&h=200&fit=crop" },
    { id: 11, name: "Chicken Fried Rice", price: 250, category: "RICE", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop" },
    { id: 12, name: "Spring Rolls", price: 180, category: "STARTERS", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1606525437817-0e30d3256965?w=200&h=200&fit=crop" },
  ],
  4: [
    { id: 13, name: "Classic Burger", price: 200, category: "MAIN_COURSE", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop" },
    { id: 14, name: "Veggie Burger", price: 180, category: "MAIN_COURSE", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=200&h=200&fit=crop" },
    { id: 15, name: "French Fries", price: 120, category: "STARTERS", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop" },
    { id: 16, name: "Chicken Wings", price: 280, category: "STARTERS", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1608039829572-9b0172e3c5e0?w=200&h=200&fit=crop" },
  ],
}

export const getAllRestaurants = async () => {
  if (USE_MOCK) {
    await delay(400)
    return mockRestaurants
  }
  const response = await api.get("/restaurants")
  return response.data
}

export const getRestaurantMenu = async (restaurantId) => {
  if (USE_MOCK) {
    await delay(400)
    return mockMenus[restaurantId] || []
  }
  const response = await api.get(`/restaurants/${restaurantId}/menu`)
  return response.data
}
