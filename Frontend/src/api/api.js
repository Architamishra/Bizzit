// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3300/api/inventory'; // Adjust the URL based on your backend server

export const addProduct = async (productData) => {
    try {
        const response = await axios.post(`${API_URL}/add`, productData);
        return response.data;
    } catch (error) {
        throw error.response.data; // Handle error response
    }
};