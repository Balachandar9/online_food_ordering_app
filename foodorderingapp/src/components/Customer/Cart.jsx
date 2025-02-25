
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCart, addPlusFoodItem, addMinusFoodItem, removeFoodItemFromCart } from '../../services/api';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import './Cart.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { userId } = useParams(); 
  const [cart, setCart] = useState(null);
  const [removedItems, setRemovedItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userId) {
          console.error('User ID is missing');
          toast.info('User ID is missing. Please log in again.');
          return;
        }

        const response = await getCart(userId);
        const filteredCart = response.data.cartDTO.filter(item => !removedItems.includes(item.foodItemId));
        const totalAmount = filteredCart.reduce((total, item) => total + item.price, 0);
        setCart({ ...response.data, cartDTO: filteredCart, amount: totalAmount });
      } catch (error) {
        console.error('Error fetching cart:', error);
        toast.error('Error fetching cart');
      }
    };
    fetchCart();
  }, [userId, removedItems]);

  const handleAddPlus = async (foodItemId) => {
    try {
      if (!userId) {
        console.error('User ID is missing');
        toast.info('User ID is missing. Please log in again.');
        return;
      }

      const response = await addPlusFoodItem(userId, foodItemId);
      const filteredCart = response.data.cartDTO.filter(item => !removedItems.includes(item.foodItemId));
      const totalAmount = filteredCart.reduce((total, item) => total + item.price, 0);
      setCart({ ...response.data, cartDTO: filteredCart, amount: totalAmount });
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Error updating cart');
    }
  };

  const handleAddMinus = async (foodItemId) => {
    try {
      if (!userId) {
        console.error('User ID is missing');
        toast.info('User ID is missing. Please log in again.');
        return;
      }

      const response = await addMinusFoodItem(userId, foodItemId);
      const filteredCart = response.data.cartDTO.filter(item => !removedItems.includes(item.foodItemId));
      const totalAmount = filteredCart.reduce((total, item) => total + item.price, 0);
      setCart({ ...response.data, cartDTO: filteredCart, amount: totalAmount });
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Error updating cart');
    }
  };

  const handleRemoveItem = async (foodItemId) => {
    try {
      if (!userId) {
        console.error('User ID is missing');
        toast.info('User ID is missing. Please log in again.');
        return;
      }

      await removeFoodItemFromCart(userId, foodItemId);

      setRemovedItems([...removedItems, foodItemId]);
      const updatedCart = cart.cartDTO.filter(item => item.foodItemId !== foodItemId);
      const totalAmount = updatedCart.reduce((total, item) => total + item.price, 0);
      if (updatedCart.length === 0) {
        setCart(null);
        toast.info('Cart is empty! Add Food item to the cart!');
        return;
      }
      setCart({ ...cart, cartDTO: updatedCart, amount: totalAmount });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Error removing item from cart');
    }
  };

  const handleCheckoutClick = () => {
    if (!cart || cart.cartDTO.length === 0) {
      toast.info('Cart is empty!');
      return;
    }
  };

  if (!cart || cart.amount === 0) {
    return (
      <div className="container bg-gray-800">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className='text-3xl font-bold text-orange-500 mb-4 text-center'><ShoppingCartIcon className='mr-2' /> Your Cart is Empty</h2>
          <p className='text-center text-white'>Add FoodItems to Cart!</p>
          <Link to="/customer/dashboard" className="mt-4 bg-orange-600 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition duration-300 inline-flex items-center no-underline">
            Go to Home Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 container cartbanner ">
      <h2 className='text-4xl font-bold text-orange-500 mb-8 bg-black '><ShoppingCartIcon /> Cart</h2>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartDTO.map((item) => (
            <tr key={item.id}>
              <td>{item.foodItemName}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>
                <button
                  onClick={() => handleAddMinus(item.foodItemId)}
                  className="btn btn-danger btn-sm me-2"
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <button
                  onClick={() => handleAddPlus(item.foodItemId)}
                  className="btn btn-success btn-sm"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveItem(item.foodItemId)}
                  className="btn btn-secondary btn-sm ms-2"
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Total Amount: ₹{cart.amount}</h4>

      <div className="mt-4">
        <Link
          to="/customer/search"
          className="bg-black rounded text-white py-2 px-4 hover:bg-gray-900 hover:animate-pulse transition duration-300 no-underline"
        >
          Add More Items
        </Link>
      </div>

      <div className="mt-4">
        <Link
          to="/customer/place-order"
          onClick={handleCheckoutClick}
          className="bg-orange-600 no-underline py-2 px-4 text-white rounded"
        >
          Proceed to Checkout
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;








