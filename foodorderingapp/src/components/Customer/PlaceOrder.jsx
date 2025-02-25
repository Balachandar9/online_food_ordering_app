
import React, { useState, useEffect } from 'react';
import { placeOrder, getCart } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const [orderData, setOrderData] = useState({
    address: '',
    payment: '',
    orderDescription: '',
  });
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          alert('User ID is missing. Please log in again.');
          return;
        }
        const response = await getCart(userId);
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
        alert('Error fetching cart');
      }
    };
    fetchCart();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderData.address) {
      alert('Address is required!');
      return;
    }
    if (!cart || cart.cartDTO.length === 0) {
      toast.error('Cart is empty! Please add items to the cart.');
      return;
    }
    try {
      const userId = localStorage.getItem('userId');
      await placeOrder({ ...orderData, userId });
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };

  if (!cart || cart.cartDTO.length === 0) {
    return (
      <div className="container">
        <div className="container bg-gray-800">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-3xl font-bold text-orange-500 mb-4 text-center">
              <ShoppingCartIcon className="mr-2" /> Your Cart is Empty
            </h2>
            <p className="text-center text-white">
              To place order, add food items to the Cart
            </p>
            <Link
              to="/customer/dashboard"
              className="mt-4 bg-orange-600 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition duration-300 inline-flex items-center no-underline"
            >
              Go to Home Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-4xl font-bold text-orange-500 mb-8 text-center">Place Order</h2>
        <div className="space-y-6">
          <div className="flex items-center bg-gray-700 p-4 rounded-lg">
            <LocationOnIcon className="text-orange-500 mr-3" />
            <div className="flex-grow">
              <p className="text-sm">Address</p>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={orderData.address}
                onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex items-center bg-gray-700 p-4 rounded-lg">
            <PaymentIcon className="text-orange-500 mr-3" />
            <div className="flex-grow">
              <p className="text-sm">Payment Method</p>
              <select
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={orderData.payment}
                onChange={(e) => setOrderData({ ...orderData, payment: e.target.value })}
                required
              >
                <option value="" disabled>
                  Select Payment Method
                </option>
                <option value="CREDIT_CARD">Credit Card</option>
                <option value="PAYPAL">PayPal</option>
                <option value="UPI">UPI</option>
                <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
                <option value="DEBIT_CARD">Debit Card</option>
              </select>
            </div>
          </div>
          <div className="flex items-center bg-gray-700 p-4 rounded-lg">
            <DescriptionIcon className="text-orange-500 mr-3" />
            <div className="flex-grow">
              <p className="text-sm">Additional Requests</p>
              <textarea
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={orderData.orderDescription}
                onChange={(e) => setOrderData({ ...orderData, orderDescription: e.target.value })}
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md transition duration-300 flex items-center justify-center"
        >
          <DeliveryDiningIcon className="mr-2" /> Place Order
        </button>
        <div className="mt-3 w-full">
          <button
            type="button"
            className="bg-gray-700 hover:bg-gray-600 w-full text-white py-3 rounded-md transition duration-300 flex items-center justify-center"
            onClick={() => navigate('/customer/dashboard')}
          >
            <HomeIcon className="mr-2" /> Home
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default PlaceOrder;





