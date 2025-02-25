import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
 
  if (!token) {
    return <Navigate to="/login" />;
  }
 
  
  const decodedToken = parseJwt(token);
  const userRole = decodedToken.role;
  const currentTime = Math.floor(Date.now() / 1000);
 
 
  if (decodedToken.exp < currentTime) {
    alert('Session expired. Please log in again.');
    localStorage.removeItem('token');  
    localStorage.removeItem('userId'); 
    localStorage.removeItem('role');
    return <Navigate to="/login" />;
  }
 
  
  if (allowedRoles.includes(userRole)) {
    return children;
  }
 
  return <Navigate to="/login" />;
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
 
export default ProtectedRoute;