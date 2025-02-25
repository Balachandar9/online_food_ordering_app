import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import CategoryForm from './components/Admin/CategoryForm';
import FoodItemForm from './components/Admin/FoodItemForm';
import AdminOrderList from './components/Admin/AdminOrderList';
import CategoryList from './components/Admin/CategoryList';
import FoodItemList from './components/Admin/FoodItemList';
import UpdateFoodItem from './components/Admin/UpdateFoodItem';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserDashboard from './components/Customer/UserDashboard';
import FoodItemSearch from './components/Customer/FoodItemSearch';
import Cart from './components/Customer/Cart';
import PlaceOrder from './components/Customer/PlaceOrder';
import CustomerOrderList from './components/Customer/CustomerOrderList';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes> 
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <CategoryForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/foodItem"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <FoodItemForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminOrderList />
            </ProtectedRoute>
          }
        />

        
        
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute allowedRoles={['USER']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/search"
          element={
            <ProtectedRoute allowedRoles={['USER']}>
              <FoodItemSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/cart/:userId"
          element={
            <ProtectedRoute allowedRoles={['USER']}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/place-order"
          element={
            <ProtectedRoute allowedRoles={['USER']}>
              <PlaceOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/orders/:userId"
          element={
            <ProtectedRoute allowedRoles={['USER']}>
              <CustomerOrderList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <CategoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/foodItems"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <FoodItemList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/update-foodItem"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <UpdateFoodItem />
            </ProtectedRoute>
          }
        />

       
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;


