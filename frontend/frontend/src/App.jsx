import React from "react"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./store/authStore"
import { CartProvider } from "./store/cartStore"
import { OrderProvider } from "./store/orderStore"
import AppRoutes from "./routes/AppRoutes"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App