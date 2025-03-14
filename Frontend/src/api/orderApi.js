// src/api/orderApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3300/api/orders'; // Base URL for orders

// Function to update order status
export const updateOrderStatus = async (orderId, statusData) => {
    try {
        const response = await axios.put(`${API_URL}/${orderId}/status`, statusData); // PUT to /api/orders/:id/status
        return response.data;
    } catch (error) {
        throw error.response.data; // Handle error response
    }
};