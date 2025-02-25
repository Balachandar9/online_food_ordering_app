
import React, { useEffect, useState } from 'react';
import { getAllCategories,deleteCategory } from '../../services/api';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';


const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await getAllCategories();
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //       toast.error('Error fetching categories');
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Error fetching categories');
    }
  };

  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category? All food items in this category will also be deleted."
    );
    if (!confirmDelete) return;

    try {
      await deleteCategory(categoryId);
      toast.success('Category and its food items deleted successfully');
      fetchCategories(); 
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-4xl font-bold text-orange-500 mb-8 text-center">Categories</h2>
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-orange-600 border-b border-orange-400">ID</th>
              <th className="py-3 px-4 text-left text-orange-600 border-b border-orange-400">NAME <InfoIcon className="ml-2" /></th>
              <th className="py-3 px-4 text-left text-orange-600 border-b border-orange-400">DESCRIPTION <DescriptionIcon className="ml-2" /></th>
              <th className="py-3 px-4 text-left text-orange-600 border-b border-orange-400">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="bg-gray-700 border-b border-gray-600">
                <td className="py-3 px-4">{category.id}</td>
                <td className="py-3 px-4">{category.name}</td>
                <td className="py-3 px-4">{category.description}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(category.id)}
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

export default CategoryList;
