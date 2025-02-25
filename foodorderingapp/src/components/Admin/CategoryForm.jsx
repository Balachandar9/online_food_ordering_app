
import React, { useState } from 'react';
import { createCategory } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryForm = () => {
  const [category, setCategory] = useState({ name: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(category);
      toast.success('Category created successfully!');
    } catch (error) {
      toast.error('Error creating category');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-4xl font-bold text-orange-500 mb-8 text-center">Create Category</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col bg-gray-700 p-4 rounded-lg">
            <label className="text-orange-400 mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col bg-gray-700 p-4 rounded-lg">
            <label className="text-orange-400 mb-2">Description</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              required
            />
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

export default CategoryForm;
