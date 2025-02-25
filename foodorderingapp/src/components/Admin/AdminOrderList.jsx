
import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../services/api';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.data);
      } catch (error) {
        toast.error('Error fetching orders');
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-4xl font-bold text-orange-500 mb-8 text-center">Orders</h2>
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead className="bg-black">
            <tr>
              <th className="py-3 px-4 text-left text-orange-600">ID</th>
              <th className="py-3 px-4 text-left  text-orange-600">USER <AccountCircleIcon className="ml-2" /></th>
              <th className="py-3 px-4 text-left text-orange-600">AMOUNT <AttachMoneyIcon className="ml-2" /></th>
              <th className="py-3 px-4 text-left text-orange-600">STATUS <AssignmentTurnedInIcon className="ml-2" /></th>
              <th className="py-3 px-4 text-left  text-orange-600">DATE <CalendarTodayIcon className="ml-2" /></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="bg-gray-700 border-b border-gray-600">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.username}</td>
                <td className="py-3 px-4">{order.amount}</td>
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
