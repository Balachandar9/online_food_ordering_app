
import React, { useState } from 'react';
import { createFoodItem } from '../../services/api';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodItemForm = () => {
  const [foodItemData, setFoodItemData] = useState({ name: '', description: '', price: '', categoryId: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFoodItem(foodItemData.categoryId, foodItemData);
      toast.success('FoodItem created successfully!');
    } catch (error) {
      toast.error('Error creating foodItem');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-4xl font-bold text-orange-500 mb-8 text-center">Create FoodItem</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center bg-gray-700 p-4 rounded-lg">
            <FastfoodIcon className="text-orange-500 mr-3" />
            <div className="flex-grow">
              <label className="text-orange-400 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={foodItemData.name}
                onChange={(e) => setFoodItemData({ ...foodItemData, name: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex items-center bg-gray-700 p-4 rounded-lg">
            <DescriptionIcon className="text-orange-500 mr-3" />
            <div className="flex-grow">
              <label className="text-orange-400 mb-2">Description</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={foodItemData.description}
                onChange={(e) => setFoodItemData({ ...foodItemData, description: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex items-center bg-gray-700 p-4 rounded-lg">
            <AttachMoneyIcon className="text-orange-500 mr-3" />
            <div className="flex-grow">
              <label className="text-orange-400 mb-2">Price</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={foodItemData.price}
                onChange={(e) => setFoodItemData({ ...foodItemData, price: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex items-center bg-gray-700 p-4 rounded-lg">
            <CategoryIcon className="text-orange-500 mr-3" />
            <div className="flex-grow">
              <label className="text-orange-400 mb-2">Category ID</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={foodItemData.categoryId}
                onChange={(e) => setFoodItemData({ ...foodItemData, categoryId: e.target.value })}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md transition duration-300 flex items-center justify-center"
          >
            Create
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default FoodItemForm;
