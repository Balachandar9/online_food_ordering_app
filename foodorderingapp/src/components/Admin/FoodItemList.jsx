
import React, { useEffect, useState } from 'react';
import { getAllFoodItems, deleteFoodItem } from '../../services/api';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await getAllFoodItems();
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching foodItems:', error);
        toast.error('Error fetching foodItems');
      }
    };
    fetchFoodItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (!window.confirm('Are you sure you want to delete this foodItem?')) {
        return; 
      }

      await deleteFoodItem(id); 
      setFoodItems((prevFoodItems) => prevFoodItems.filter((foodItem) => foodItem.id !== id)); 
      toast.success('FoodItem deleted successfully!');
    } catch (error) {
      console.error('Error deleting foodItem:', error);
      toast.error('Error deleting foodItem');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-4xl font-bold text-orange-500 mb-8 text-center">FoodItems</h2>
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-orange-600 border-b border-orange-400">ID</th>
              <th className="py-3 px-4 text-left text-orange-600 border-b border-orange-400">NAME <FastfoodIcon className="ml-2" /></th>
              <th className="py-3 px-4 text-left text-orange-600 border-b border-orange-400">DESCRIPTION <DescriptionIcon className="ml-2" /></th>
              <th className="py-3 px-4 text-left text-orange-600 border-b border-orange-400">PRICE <AttachMoneyIcon className="ml-2" /></th>
              <th className="py-3 px-4 text-left text-orange-600 border-b border-orange-400">CATEGORY <CategoryIcon className="ml-2" /></th>
              <th className="py-3 px-4 text-left text-orange-600 border-b border-orange-400">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((foodItem) => (
              <tr key={foodItem.id} className="bg-gray-700 border-b border-gray-600">
                <td className="py-3 px-4">{foodItem.id}</td>
                <td className="py-3 px-4">{foodItem.name}</td>
                <td className="py-3 px-4">{foodItem.description}</td>
                <td className="py-3 px-4">₹{foodItem.price}</td>
                <td className="py-3 px-4">{foodItem.categoryName}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(foodItem.id)}
                    className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
                  >
                    <DeleteIcon className="mr-2" /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default FoodItemList;
