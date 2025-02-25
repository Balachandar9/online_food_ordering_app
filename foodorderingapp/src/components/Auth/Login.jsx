import React, { useState } from 'react';
import { login } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      const token = response.data.jwtToken;

      
      localStorage.setItem('token', token);

      
      const decodedToken = parseJwt(token);
      const userRole = decodedToken.role?.toUpperCase(); 
      const userId = decodedToken.userId;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId); 
      localStorage.setItem('role', userRole);

      console.log('Decoded Token:', decodedToken); 
      console.log('User Role:', userRole); 

     
      if (userRole === 'ADMIN') {
        navigate('/admin/dashboard'); 
      } else if (userRole === 'USER') {
        navigate('/customer/dashboard'); 
      } else {
        alert('Unknown user role');
      }
    } catch (error) {
      console.error('Login Error:', error); 
      alert('Invalid credentials');
    }
  };

  
  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-l from-black to-orange-700">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border-4 border-orange-600">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 mt-1 borderrounded-md shadow-sm focus:outline-6 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-6 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-50 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-900">Don't have an account? <Link to="/signup" className="text-orange-600 hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </div>

  );
};

export default Login;