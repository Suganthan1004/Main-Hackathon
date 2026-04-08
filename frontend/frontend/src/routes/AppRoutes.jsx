import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import RestaurantPage from '../pages/RestaurantPage';
import OrdersPage from '../pages/OrdersPage';
import ProfilePage from '../pages/ProfilePage';
import CartPage from '../pages/CartPage';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/restaurants" element={<HomePage />} />
      <Route path="/restaurants/:restaurantId/menu" element={<RestaurantPage />} />
      <Route path="/" element={<Navigate to="/restaurants" replace />} />

      {/* Protected Routes */}
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/orders" 
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/orders/:orderId" 
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/cart" 
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default AppRoutes;
