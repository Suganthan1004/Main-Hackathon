import api from "./api"
import { USE_MOCK } from "./config"

// mock data
const mockRestaurants = [
  { id: "r1", name: "Spice Garden", location: "Anna Nagar, Chennai", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop", cuisine: "Indian" },
  { id: "r2", name: "Pizza Planet", location: "T Nagar, Chennai", imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop", cuisine: "Italian" },
  { id: "r3", name: "Dragon Wok", location: "Velachery, Chennai", imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop", cuisine: "Chinese" },
  { id: "r4", name: "Burger Barn", location: "Adyar, Chennai", imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop", cuisine: "American" },
]

const mockMenus = {
  r1: [
    { id: "m1", name: "Butter Chicken", price: 280, category: "Main Course", veg: false, imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200&h=200&fit=crop" },
    { id: "m2", name: "Paneer Tikka", price: 220, category: "Starters", veg: true, imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200&h=200&fit=crop" },
    { id: "m3", name: "Dal Makhani", price: 180, category: "Main Course", veg: true, imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&h=200&fit=crop" },
    { id: "m4", name: "Chicken Biryani", price: 320, category: "Rice", veg: false, imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop" },
    { id: "m5", name: "Gulab Jamun", price: 100, category: "Desserts", veg: true, imageUrl: "https://images.unsplash.com/photo-1666190070948-37d81fae04b9?w=200&h=200&fit=crop" },
  ],
  r2: [
    { id: "m6", name: "Margherita Pizza", price: 350, category: "Pizza", veg: true, imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop" },
    { id: "m7", name: "Pepperoni Pizza", price: 420, category: "Pizza", veg: false, imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop" },
    { id: "m8", name: "Garlic Bread", price: 150, category: "Sides", veg: true, imageUrl: "https://images.unsplash.com/photo-1619531040576-f9416aabed02?w=200&h=200&fit=crop" },
    { id: "m9", name: "Pasta Alfredo", price: 300, category: "Pasta", veg: true, imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=200&h=200&fit=crop" },
  ],
  r3: [
    { id: "m10", name: "Veg Manchurian", price: 200, category: "Starters", veg: true, imageUrl: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=200&h=200&fit=crop" },
    { id: "m11", name: "Chicken Fried Rice", price: 250, category: "Rice", veg: false, imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop" },
    { id: "m12", name: "Spring Rolls", price: 180, category: "Starters", veg: true, imageUrl: "https://images.unsplash.com/photo-1606525437817-0e30d3256965?w=200&h=200&fit=crop" },
  ],
  r4: [
    { id: "m13", name: "Classic Burger", price: 200, category: "Burgers", veg: false, imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop" },
    { id: "m14", name: "Veggie Burger", price: 180, category: "Burgers", veg: true, imageUrl: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=200&h=200&fit=crop" },
    { id: "m15", name: "French Fries", price: 120, category: "Sides", veg: true, imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop" },
    { id: "m16", name: "Chicken Wings", price: 280, category: "Sides", veg: false, imageUrl: "https://images.unsplash.com/photo-1608039829572-9b0172e3c5e0?w=200&h=200&fit=crop" },
  ],
}

const delay = (ms) => new Promise(r => setTimeout(r, ms))

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
