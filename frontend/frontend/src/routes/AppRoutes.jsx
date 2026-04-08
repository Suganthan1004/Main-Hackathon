import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import MainLayout from "../layouts/MainLayout"

import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import HomePage from "../pages/HomePage"
import RestaurantPage from "../pages/RestaurantPage"
import OrdersPage from "../pages/OrdersPage"
import ProfilePage from "../pages/ProfilePage"
import CartPage from "../pages/CartPage"

const AppRoutes = () => {
  return (
    <Routes>
      {/* auth pages sit outside the main layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* everything else is inside the sidebar layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="restaurants" element={<Navigate to="/" replace />} />
        <Route path="restaurants/:restaurantId/menu" element={<RestaurantPage />} />

        <Route path="cart" element={
          <ProtectedRoute><CartPage /></ProtectedRoute>
        } />
        <Route path="orders" element={
          <ProtectedRoute><OrdersPage /></ProtectedRoute>
        } />
        <Route path="orders/:orderId" element={
          <ProtectedRoute><OrdersPage /></ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute><ProfilePage /></ProtectedRoute>
        } />
      </Route>
    </Routes>
  )
}

export default AppRoutes
