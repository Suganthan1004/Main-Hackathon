import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { AuthProvider } from "./store/authStore"
import { CartProvider } from "./store/cartStore"
import { OrderProvider } from "./store/orderStore"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  </StrictMode>
)



