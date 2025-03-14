// src/api/supplierApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3300/api/suppliers'; // Adjust the URL based on your backend server

// Function to add a new supplier
export const addSupplier = async (supplierData) => {
    try {
        const response = await axios.post(API_URL, supplierData); // POST to /api/suppliers
        return response.data;
    } catch (error) {
        throw error.response.data; // Handle error response
    }
};

// Function to get all suppliers
export const getSuppliers = async () => {
    try {
        const response = await axios.get(API_URL); // GET to /api/suppliers
        return response.data;
    } catch (error) {
        throw error.response.data; // Handle error response
    }
};

// Function to get a supplier by ID
export const getSupplierById = async (id) => {
    try {
        const response = await axios .get(`${API_URL}/${id}`); // GET to /api/suppliers/:id
        return response.data;
    } catch (error) {
        throw error.response.data; // Handle error response
    }
};

// Function to update a supplier
export const updateSupplier = async (id, supplierData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, supplierData); // PUT to /api/suppliers/:id
        return response.data;
    } catch (error) {
        throw error.response.data; // Handle error response
    }
};

// Function to delete a supplier
export const deleteSupplier = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`); // DELETE to /api/suppliers/:id
    } catch (error) {
        throw error.response.data; // Handle error response
    }
};

// Function to update dealership status
export const updateDealershipStatus = async (productId, statusData) => {
    try {
        const response = await axios.put(`${API_URL}/products/${productId}/status`, statusData); // PUT to /api/suppliers/products/:id/status
        return response.data;
    } catch (error) {
        throw error.response.data; // Handle error response
    }
};

