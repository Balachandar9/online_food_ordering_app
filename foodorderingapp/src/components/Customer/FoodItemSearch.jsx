
import React, { useState } from 'react';
import { searchFoodItems, addToCart } from '../../services/api';
import { Link } from 'react-router-dom';
import { Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodItemSearch = () => {
  const [name, setName] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setError('');
      const response = await searchFoodItems(name.trim());
      setFoodItems(response.data);
      if(response.data.length === 0){
        toast.info("No food item available...")
      }
    } catch (error) {
      console.error('Error searching foodItems:', error);
      setError('Error searching food items');
    }
  };

  const handleAddToCart = async (foodItemId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID is missing in localStorage');
        toast.info('User ID is missing. Please log in again.');
        return;
      }

      const cartData = { userId, foodItemId };
      console.log('Sending cart data:', cartData);

      if (!cartData.userId || !cartData.foodItemId) {
        console.error('Missing userId or foodItemId in payload:', cartData);
        toast.error('Invalid data. Please try again.');
        return;
      }

      const response = await addToCart(cartData);
      console.log('API Response:', response.data);
      toast.success('FoodItem added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error.message);
      toast.error('Error adding to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-4xl font-bold text-orange-500 mb-8 text-center">Search FoodItems</h2>
        <div className="mb-8">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter food item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-orange-500" />
                </InputAdornment>
              ),
              style: { backgroundColor: '#2d3748', color: 'white' },
            }}
          />
          <Button
            onClick={handleSearch}
            className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition duration-300 flex items-center justify-center"
          >
            <SearchIcon className="mr-2" /> Search
          </Button>
        </div>
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <ul className="space-y-4">
          {foodItems.map((foodItem) => (
            <li key={foodItem.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h4 className="text-xl font-bold">{foodItem.name}</h4>
                <p className="text-sm">{foodItem.description}</p>
                <p className="text-orange-500 font-semibold">₹{foodItem.price}</p>
              </div>
              <Button
                onClick={() => handleAddToCart(foodItem.id)}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300"
              >
                Add to Cart
              </Button>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          <Link
            to={`/customer/cart/${localStorage.getItem('userId')}`}
            className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-md transition duration-300 inline-flex items-center"
          >
            <ShoppingCartIcon className="mr-2" /> Go to Cart
          </Link>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default FoodItemSearch;
