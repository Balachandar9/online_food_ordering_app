
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrdersByUser } from '../../services/api';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderList = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!userId) {
          console.error('User ID is missing');
          toast.info('User ID is missing. Please log in again.');
          return;
        }
        const response = await getOrdersByUser(userId);
        const sortedOrders = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Error fetching orders');
      }
    };
    fetchOrders();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-4xl font-bold text-orange-500 mb-8 text-center">Orders</h2>
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead className="bg-black">
            <tr>
              <th className="py-3 px-4 text-left text-orange-600">ID</th>
              <th className="py-3 px-4 text-left text-orange-600">Amount <AttachMoneyIcon className="ml-2" /></th>
              <th className="py-3 px-4 text-left text-orange-600">Status <AssignmentTurnedInIcon className="ml-2" /></th>
              <th className="py-3 px-4 text-left text-orange-600">Date <CalendarTodayIcon className="ml-2" /></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="bg-gray-700 border-b border-gray-600">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">₹{order.amount}</td>
                <td className="py-3 px-4">{order.orderStatus}</td>
                <td className="py-3 px-4">{new Date(order.date).toLocaleDateString('en-GB')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default OrderList;
