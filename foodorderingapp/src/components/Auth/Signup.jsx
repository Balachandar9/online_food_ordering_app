import React, { useState } from 'react';
import { signup } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => { 
    e.preventDefault(); 
    try {
      await signup(userData);
      toast.success('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 406) {
        toast.error("email already exists, use different email..");
      } else {
        alert('Error during signup');
      }
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-orange-700">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border-4 border-orange-600">
        <h2 className="text-3xl font-bold text-center text-black">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-4 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-4 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-4 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-4 focus:ring-2 focus:ring-offset-2 focus:ring-orange-50 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-900">Already have an account? <Link to="/login" className="text-orange-600 hover:underline">Login</Link></p>
        </div>
      </div>
      <ToastContainer/>  
    </div>


  );
};

export default Signup;