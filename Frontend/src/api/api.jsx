import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Change this to your backend URL
  timeout: 10000, // Optional timeout in milliseconds
});

export default api;