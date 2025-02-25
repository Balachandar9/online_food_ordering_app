
import { Button } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


const AdminDashboard = () => {
  const navigate = useNavigate();

  
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
     
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');

      
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-orange-500 mb-8 text-center"><AdminPanelSettingsIcon fontSize='inherit'/> Admin Dashboard </h2>
        <p className="text-lg text-gray-300 mb-6 text-center">Welcome, Admin!</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/admin/category" className="bg-black text-white hover:bg-orange-600 py-2 px-4 rounded-md transition duration-300 text-center w-full sm:w-auto no-underline">
            Manage Categories
          </Link>
          <Link to="/admin/foodItem" className="bg-orange-500 text-white hover:bg-gray-700 py-2 px-4 rounded-md transition duration-300 text-center w-full sm:w-auto no-underline">
            Manage FoodItems
          </Link>
          <Link to="/admin/orders" className="bg-gray-600 text-white hover:bg-orange-700 py-2 px-4 rounded-md transition duration-300 text-center w-full sm:w-auto no-underline">
            View Orders
          </Link>
          <Link to="/admin/categories" className="bg-black text-white hover:bg-orange-600 py-2 px-4 rounded-md transition duration-300 text-center w-full sm:w-auto no-underline">
            View Categories
          </Link>
          <Link to="/admin/fooditems" className="bg-orange-500 text-white hover:bg-gray-700 py-2 px-4 rounded-md transition duration-300 text-center w-full sm:w-auto no-underline">
            View FoodItems
          </Link>
          <Link to="/admin/update-foodItem" className="bg-gray-600 text-white hover:bg-orange-700 py-2 px-4 rounded-md transition duration-300 text-center w-full sm:w-auto no-underline">
            Update FoodItem Details
          </Link>
          <Button
            onClick={handleLogout}
            className="bg-red-600 text-white hover:bg-red-800 py-2 px-4 rounded-md transition duration-300 text-center w-full sm:w-auto no-underline"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

