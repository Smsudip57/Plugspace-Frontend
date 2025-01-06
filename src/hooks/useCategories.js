import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASEURL}/api/admin/categories`, {
        params: { email: process.env.REACT_APP_ADMIN_EMAIL }
      });
      setCategories(response.data.categories || []);
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

  const getMainCategories = () => {
    return ['All', ...categories.map(cat => cat.name)];
  };

  const getSubCategories = (categoryName) => {
    if (categoryName === 'All') return [];
    const category = categories.find(cat => cat.name === categoryName);
    return category ? ['All', ...category.subcategories.map(sub => sub.name)] : [];
  };

  return {
    categories,
    loading,
    error,
    getMainCategories,
    getSubCategories,
    refreshCategories: fetchCategories
  };
};

export default useCategories;