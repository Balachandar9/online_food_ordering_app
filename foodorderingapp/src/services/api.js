import axios from 'axios';
 
const API_BASE_URL = 'http://localhost:8080'; // Replace with your backend URL
 
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
 
// Add a request interceptor to include the JWT token
//Adds a request interceptor to include the JWT token in the Authorization header of every request if the token exists in localStorage.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
 
// Authentication
export const login = (credentials) => api.post('/authenticate', credentials);
export const signup = (userData) => api.post('/sign-up', userData);
 
// Admin APIs
export const createCategory = (categoryData) => api.post('/api/admin/category', categoryData);
export const getAllCategories = () => api.get('/api/admin/categories');
export const createFoodItem = (categoryId, foodItemData) => api.post(`/api/admin/foodItem/${categoryId}`, foodItemData);
export const getAllFoodItems = () => api.get('/api/admin/foodItems');
export const deleteFoodItem = (foodItemId) => api.delete(`/api/admin/foodItem/${foodItemId}`);
export const updateFoodItem = (categoryId, foodItemId, foodItemData) => api.put(`/api/admin/${categoryId}/foodItem/${foodItemId}`, foodItemData);
export const getAllOrders = () => api.get('/api/admin/orders');
export const deleteCategory = (categoryId) => api.delete(`/api/admin/category/${categoryId}`);
 
// Customer APIs
export const searchFoodItems = (name) => api.get(`/api/customer/foodItem/search/${encodeURIComponent(name)}`);
export const addToCart = (cartData) => api.post('/api/customer/cart', cartData);
export const getCart = (userId) => api.get(`/api/customer/cart/${userId}`);
export const addMinusFoodItem = (userId, foodItemId) => api.get(`/api/customer/cart/${userId}/deduct/${foodItemId}`);
export const addPlusFoodItem = (userId, foodItemId) => api.get(`/api/customer/cart/${userId}/add/${foodItemId}`);
export const placeOrder = (orderData) => api.post('/api/customer/placeOrder', orderData);
export const getOrdersByUser = (userId) => api.get(`/api/customer/orders/${userId}`);
export const removeFoodItemFromCart = (userId, foodItemId) => api.delete(`/api/customer/cart/${userId}/remove/${foodItemId}`);



//This code sets up an API client for your React application using the axios library. 
//It centralizes the API configuration and defines various endpoints for interacting with your backend server.
 