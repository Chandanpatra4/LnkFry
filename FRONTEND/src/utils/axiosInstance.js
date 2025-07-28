

import axios from 'axios';
import { store } from '../store/store.js';

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000, // 10 seconds timeout
    withCredentials: true, // Include cookies in requests
    headers: {
        'Content-Type': 'application/json',
    }
})

// Request interceptor to add token to headers as fallback
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from Redux store if available
        const state = store.getState();
        const token = state.auth.token;
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        // console.log('Response received:', response);
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx causes this function to trigger
        console.error('Response error:', error);
        
        // Handle different types of errors
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;
            
            switch (status) {
                case 400:
                    console.error('Bad Request:', data.message || 'Invalid request');
                    break;
                case 401:
                    console.error('Unauthorized:', data.message || 'Authentication failed');
                    // You might want to redirect to login page
                    break;
                case 403:
                    console.error('Forbidden:', data.message || 'Access denied');
                    break;
                case 404:
                    console.error('Not Found:', data.message || 'Resource not found');
                    break;
                case 422:
                    console.error('Validation Error:', data.message || 'Validation failed');
                    break;
                case 500:
                    console.error('Server Error:', data.message || 'Internal server error');
                    break;
                default:
                    console.error(`HTTP Error ${status}:`, data.message || 'Something went wrong');
            }
            
            // Return a more user-friendly error message
            const errorMessage = data?.message || `Server error (${status})`;
            return Promise.reject(new Error(errorMessage));
            
        } else if (error.request) {
            // Request was made but no response received
            console.error('Network error:', error.request);
            return Promise.reject(new Error('Network error - please check your connection'));
            
        } else {
            // Something else happened
            console.error('Error:', error.message);
            return Promise.reject(new Error(error.message || 'Something went wrong'));
        }
    }
);

export default axiosInstance;

