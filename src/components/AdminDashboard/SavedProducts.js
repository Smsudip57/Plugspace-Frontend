import React, { useState, useEffect, useCallback } from 'react';
import { Trash2, Search, ExternalLink, Edit2} from 'lucide-react';
import axios from 'axios';
import CategoriesNav from '../HomePage/CategoriesNav';
import useCategories from '../../hooks/useCategories';
import EditForm from './EditForm';  // Add this import

const SavedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSubCategory, setSelectedSubCategory] = useState('All');
    const [selectedProducts, setSelectedProducts] = useState(new Set());
    const [editingProduct, setEditingProduct] = useState(null);
    const [updateForm, setUpdateForm] = useState({
        title: '',
        price: '',
        imageUrl: '',
        imageFile: null
    });
    const [uploadType, setUploadType] = useState('url'); // 'url' or 'file'
    const [uploading, setUploading] = useState(false);

    const {
        getMainCategories,
        getSubCategories,
        loading: categoriesLoading
    } = useCategories();

    const mainCategories = getMainCategories();

    const getImageUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http') || url.startsWith('/uploads/')) {
            return url;
        }
        if (url.startsWith('//')) {
            return `https:${url}`;
        }
        return url;
    };

    const fetchSavedProducts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASEURL}/api/products`,
                {
                    params: {
                        page: currentPage,
                        search: searchTerm,
                        category: selectedCategory !== 'All' ? selectedCategory : undefined,
                        subcategory: selectedSubCategory !== 'All' ? selectedSubCategory : undefined,
                    },
                    withCredentials: true
                }
            );
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching saved products:', error);
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchTerm, selectedCategory, selectedSubCategory]);

    useEffect(() => {
        fetchSavedProducts();
    }, [fetchSavedProducts]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedSubCategory('All');
        setCurrentPage(1);
    };

    const handleSubCategorySelect = (subcategory) => {
        setSelectedSubCategory(subcategory);
        setCurrentPage(1);
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdateForm(prev => ({
                ...prev,
                imageFile: file,
                // Create a temporary preview URL
                imageUrl: URL.createObjectURL(file)
            }));
        }
    };
    // For single product delete (trash button)
    const handleDelete = async (e, productId) => {
        e.stopPropagation(); // Prevent checkbox triggering
        if (!window.confirm('Delete this product?')) return;

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_BASEURL}/api/admin/products/${productId}`,
                {
                    params: { email: process.env.REACT_APP_ADMIN_EMAIL }
                }
            );

            if (response.status === 200) {
                // Refresh the products list
                fetchSavedProducts();
            }
        } catch (error) {
            alert('Failed to delete product');
        }
    };

    // For checkbox selection
    const toggleProductSelection = (productId) => {
        setSelectedProducts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });
    };

    // For bulk delete
    const handleBulkDelete = async () => {
        if (!window.confirm(`Delete ${selectedProducts.size} selected products?`)) return;

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASEURL}/api/admin/products/bulk-delete`,
                {
                    productIds: Array.from(selectedProducts)
                },
                {
                    params: { email: process.env.REACT_APP_ADMIN_EMAIL }  // Add the admin email in params
                }
            );

            if (response.status === 200) {
                setSelectedProducts(new Set());
                fetchSavedProducts();
            }
        } catch (error) {
            console.error("Error deleting products:", error);
            alert("Failed to delete products");
        }
    };

    // Add this function to handle edit button click
    const handleEditClick = (product) => {
        setEditingProduct(product);
        setUpdateForm({
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl
        });
    };
    // Handle form submission with image upload
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let finalImageUrl = updateForm.imageUrl;

            // If there's a file to upload
            if (uploadType === 'file' && updateForm.imageFile) {
                const formData = new FormData();
                formData.append('image', updateForm.imageFile);

                const uploadResponse = await axios.post(
                    `${process.env.REACT_APP_API_BASEURL}/api/admin/upload-image`,
                    formData,
                    {
                        params: { email: process.env.REACT_APP_ADMIN_EMAIL },
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }
                );

                if (uploadResponse.data.success) {
                    finalImageUrl = uploadResponse.data.imageUrl;
                }
            }

            // Update product with the new image URL
            const response = await axios.put(
                `${process.env.REACT_APP_API_BASEURL}/api/admin/products/${editingProduct.productId}`,
                {
                    ...updateForm,
                    imageUrl: finalImageUrl
                },
                {
                    params: { email: process.env.REACT_APP_ADMIN_EMAIL }
                }
            );

            if (response.data.success) {
                fetchSavedProducts();
                setEditingProduct(null);
                alert('Product updated successfully!');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        } finally {
            setUploading(false);
        }
    };


    // Update the product card render to include edit button
    const renderProductCard = (product) => (
        <div
            key={product.productId}
            className="relative overflow-hidden bg-gray-800 rounded-xl hover:ring-2 hover:ring-[#2ab6e4] transition-all"
        >
            {/* Checkbox */}
            <input
                type="checkbox"
                className="absolute z-20 w-5 h-5 top-3 left-3"
                checked={selectedProducts.has(product.productId)}
                onChange={() => toggleProductSelection(product.productId)}
            />

            <div className="relative">
                <img
                    src={getImageUrl(product.imageUrl)}
                    alt={product.title}
                    className="object-cover w-full aspect-square"
                />
                <div className="absolute flex gap-2 top-2 right-2">
                    <button
                        onClick={() => handleEditClick(product)}
                        className="p-2 transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
                    >
                        <Edit2 className="w-5 h-5 text-white" />
                    </button>
                    <a
                        href={product.detailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                    <button
                        onClick={(e) => handleDelete(e, product.productId)}
                        className="p-2 transition-colors bg-red-500 rounded-full hover:bg-red-600"
                    >
                        <Trash2 className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>

            {/* Rest of the product card content */}
            <div className="p-4">
                <h4 className="mb-2 font-semibold text-white line-clamp-2">
                    {product.title}
                </h4>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through">${(product.price).toFixed(2)}</span>
                        <span className="px-2 py-0.5 text-xs font-semibold text-green-500 bg-green-500/10 rounded">+30%</span>
                        </div>
                        <p className="text-[#2ab6e4] font-bold text-xl">
                        ${((product.price * 1.3).toFixed(2))}
                        </p>
                    </div>
                    <p className="text-sm text-gray-400">
                        {product.seller}
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm">
                        <span className="text-gray-400">Category:</span>
                        <span className="ml-2 px-2 py-0.5 bg-gray-700 rounded text-white">
                            {product.category}
                        </span>
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-gray-400">Subcategory:</span>
                        <span className="ml-2 px-2 py-0.5 bg-gray-700 rounded text-white">
                            {product.subcategory}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-gray-900">
            {/* Categories Navigation */}
            <CategoriesNav
                mainCategories={mainCategories}
                selectedCategory={selectedCategory}
                selectedSubCategory={selectedSubCategory}
                onCategorySelect={handleCategorySelect}
                onSubCategorySelect={handleSubCategorySelect}
                getSubCategories={getSubCategories}
                loading={categoriesLoading}
            />


            <div className="container px-4 pt-6 mx-auto">
                {/* Search Bar */}
                <div className="p-4 mb-6 bg-gray-800 rounded-xl">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Search saved products..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset page when searching
                            }}
                            className="w-full px-4 py-2 pl-10 text-white bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#2ab6e4] focus:outline-none"
                        />
                        <Search className="absolute w-5 h-5 text-gray-400 left-3" />
                    </div>
                </div>
                {/* Bulk Delete Button */}
                {selectedProducts.size > 0 && (
                    <button
                        onClick={handleBulkDelete}
                        className="px-4 py-2 mb-4 text-white bg-red-600 rounded hover:bg-red-700"
                    >
                        Delete Selected ({selectedProducts.size})
                    </button>
                )}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {products.map(product => renderProductCard(product))}
                </div>
                {/* Products Grid with Loading State */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#2ab6e4]"></div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {products.map(product => renderProductCard(product))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <Search className="w-12 h-12 mb-4" />
                        <p>No products found</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 py-6 mt-6">
                        {/* Previous Page Button */}
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 text-white bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-700"
                        >
                            Previous
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => {
                            const pageNum = i + 1;
                            // Show first page, last page, current page, and one page before and after current
                            if (
                                pageNum === 1 ||
                                pageNum === totalPages ||
                                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                            ) {
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-3 py-1 rounded ${currentPage === pageNum
                                            ? 'bg-[#2ab6e4] text-white'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            } else if (
                                pageNum === currentPage - 2 ||
                                pageNum === currentPage + 2
                            ) {
                                return <span key={pageNum} className="px-2 text-gray-400">...</span>;
                            }
                            return null;
                        })}

                        {/* Next Page Button */}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-white bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-700"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            {editingProduct && (
                <EditForm
                    editingProduct={editingProduct}
                    setEditingProduct={setEditingProduct}
                    updateForm={updateForm}
                    setUpdateForm={setUpdateForm}
                    handleUpdateSubmit={handleUpdateSubmit}
                    uploadType={uploadType}
                    setUploadType={setUploadType}
                    handleFileChange={handleFileChange}
                    uploading={uploading}
                />
            )}
        </div>
    );
};

export default SavedProducts;