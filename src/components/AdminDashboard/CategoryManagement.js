import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, AlertCircle,Pen } from 'lucide-react';
import axios from 'axios';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategories, setNewSubcategories] = useState({});
  const [cat, setCat] = useState('');

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_BASEURL}/api/admin/categories`, {
        params: { email: process.env.REACT_APP_ADMIN_EMAIL }
      });
      setCategories(response.data.categories);
      setError(null);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      await axios.post(
       `${process.env.REACT_APP_API_BASEURL}/api/admin/categories`,
        { name: newCategory.trim() },
        { params: { email: process.env.REACT_APP_ADMIN_EMAIL } }
      );
      setNewCategory('');
      await fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add category');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASEURL}/api/admin/categories/${categoryId}`,
        { params: { email: process.env.REACT_APP_ADMIN_EMAIL } }
      );
      await fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete category');
    }
  };

  const handleAddSubcategory = async (categoryId) => {
    const subcategoryName = newSubcategories[categoryId]?.trim();
    if (!subcategoryName) return;

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASEURL}/api/admin/categories/${categoryId}/subcategories`,
        { subcategoryName },
        { params: { email: process.env.REACT_APP_ADMIN_EMAIL } }
      );
      setNewSubcategories(prev => ({ ...prev, [categoryId]: '' }));
      await fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add subcategory');
    }
  };

  const handleDeleteSubcategory = async (categoryId, subcategoryId) => {
    try {
      await axios.delete(
      `${process.env.REACT_APP_API_BASEURL}/api/admin/categories/${categoryId}/subcategories/${subcategoryId}`,
        { params: { email: process.env.REACT_APP_ADMIN_EMAIL } }
      );
      setError(null);
      await fetchCategories(); // Refresh the categories list
    } catch (err) {
      console.error('Error deleting subcategory:', err);
      setError(err.response?.data?.message || 'Failed to delete subcategory');
    }
  };

  const chnageCat = async (e) => {
    if (e.key !== 'Enter') return; 
    const id = e.target.dataset.id; // Retrieve the category ID from the input's dataset
    const newName = e.target.value; 
  
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASEURL}/api/admin/changesubcategory`,
        { prev: id, neww: newName, email: process.env.REACT_APP_ADMIN_EMAIL },
        { params: { email: process.env.REACT_APP_ADMIN_EMAIL } }
      );
      await fetchCategories(); // Re-fetch categories after update
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update category');
    }
    finally {
      setCat('');
    }
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#2ab6e4]"></div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto">
      {error && (
        <div className="p-4 mb-4 text-red-500 bg-red-100 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Add New Category */}
      <div className="p-6 mb-6 bg-gray-800 rounded-xl">
        <h3 className="mb-4 text-xl font-bold text-white">Add New Category</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name"
            className="flex-1 px-4 py-2 text-white bg-gray-700 rounded focus:ring-2 focus:ring-[#2ab6e4] focus:outline-none"
          />
          <button
            onClick={handleAddCategory}
            disabled={!newCategory.trim()}
            className="px-6 py-2 text-white rounded bg-[#2ab6e4] hover:bg-[#2ab6e4]/80 disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category._id} className="p-6 bg-gray-800 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{category.name}</h3>
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className="p-2 text-red-500 rounded hover:bg-gray-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Subcategories */}
            <div className="pl-6 mt-4 space-y-2">
              {category.subcategories?.map((subcategory) => (
                <div key={subcategory._id} className="flex items-center justify-between group">
                  <span className="text-gray-300">{cat===subcategory.name?
                    <input
                    type="text" 
                    placeholder='Press Enter to save'
                    onKeyDown={(e) => chnageCat(e)}
                    data-id={subcategory.name} 
                    className='w-full px-3 py-2 text-white bg-gray-700 rounded focus:ring-2 focus:ring-[#2ab6e4]'
                  />
                  :<span>{subcategory.name}</span>}</span>
                  <span>

                  <button
                    onClick={() => setCat(subcategory.name)}
                    className="invisible p-1 text-gray-500 rounded group-hover:visible hover:bg-gray-700"
                    >
                    <Pen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSubcategory(category._id, subcategory._id)}
                    className="invisible p-1 text-red-500 rounded group-hover:visible hover:bg-gray-700"
                    >
                    <X className="w-4 h-4" />
                  </button>
                    </span>
                </div>
              ))}
              {/* Add New Subcategory */}
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  value={newSubcategories[category._id] || ''}
                  onChange={(e) => setNewSubcategories(prev => ({
                    ...prev,
                    [category._id]: e.target.value
                  }))}
                  placeholder="Add subcategory"
                  className="flex-1 px-4 py-2 text-white bg-gray-700 rounded focus:ring-2 focus:ring-[#2ab6e4] focus:outline-none"
                />
                <button
                  onClick={() => handleAddSubcategory(category._id)}
                  disabled={!newSubcategories[category._id]?.trim()}
                  className="px-4 py-2 text-white rounded bg-[#2ab6e4] hover:bg-[#2ab6e4]/80 disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;