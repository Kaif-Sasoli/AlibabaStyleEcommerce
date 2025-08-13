import axios from "axios";
import { axiosInstance } from "./axiosInstance";


export const addToCart = async (productId) => {
    try {
        const response = await axiosInstance.post('/cart/add', {productId}, {
            withCredentials: true,
        });
        return response?.data
    } catch (error) {
        throw error.response?.data?.message || "Couldn't fetch cart."
    }
}

// Remove product from cart
export const removeFromCart = async (productId) => {
    try {
        const response = await axiosInstance.delete(`/cart/remove`, {
            withCredentials: true,
            data: { productId }
        });
        return response?.data;
    } catch (error) {
        throw error.response?.data?.message || "Couldn't remove product from cart.";
    }
};

export const getCartItems = async () => {
    try {
        const response = await axiosInstance.get('/cart/items', {
            withCredentials: true,
        });
        console.log("Carrt in Service: ", response?.data?.cart.items?.product)
        return response?.data?.cart
    } catch (error) {
        throw error.response?.data?.error || "Couldn't fetch cart."
    }
}