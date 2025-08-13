//**************  Api's *************

import axios from "axios";
import { axiosInstance } from "./axiosInstance";


// Add Product
export const addProduct = async (formData) => {
    try {
        const response = await axiosInstance.post('/supplier/add-product', formData, {
            withCredentials: true,
        });
        console.log(response)
        return response?.data?.message
    } catch (error) {
        console.log(error)
        throw error.response?.data?.error || "Product couldn't created."
    }
};

// Get Categories
export const getCategories = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/categories`);
        console.log("Cartegories are called:", response)
        return response.data.data
    } catch (error) {
        console.error(error)
        return []; 
  
    }
};

// Supplier Get Products
export const getProducts = async (page = 1, limit = 10) => {
    try {
        const response = await axiosInstance.get(`/supplier/get-products?page=${page}&limit=${limit}`);
        return response.data
    } catch (error) {
        return error.response?.data
    }
};

// Delete Products
export const deleteProduct = async (productId) => {
    try {
          const response = await axiosInstance.delete(`/supplier/delete/${productId}`)
          return response.data
    } catch (error) {
        throw error.response?.data?.error || "Product couldn't be deleted.";
    } 
};

// Get Recommended Products
export const recommendedProducts = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/recommended`);
        return response.data.recommendedProducts
    } catch (error) {
        throw error.response?.data?.error || "Failed to load products"    }
}

// Get Eleectronics Products
export const getElectronicProducts = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/electronics-products`) 
        return response.data.products
    } catch (error) {
         throw error.response?.data?.error || "Failed to load products"
    }
}


// Product Detail
export const getProductDetail = async (productId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/detail/${productId}`)
        return response.data.productInfo
    } catch (error) {
        return error.response?.data?.error || "Failed to load product"
    }
}

// Product Related Products
export const getRelatedProduct = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/related`)
        return response.data
    } catch (error) {
        return error.response?.data?.error || "Failed to load product"
    }
}

// Search Products
export const searchProducts = async (params) => {
  try {
    const response = await axiosInstance.get('/product/search', { params });
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
    throw error.response?.data?.message || "Couldn't fetch search results.";
  }
};






