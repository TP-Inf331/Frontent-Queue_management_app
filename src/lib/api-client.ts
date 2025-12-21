import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from '../api/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding the bearer token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('nowait_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors (401, 403)
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            if (error.response.status === 401) {
                // Unauthorized: clear token and redirect to login if necessary
                localStorage.removeItem('nowait_token');
                if (window.location.pathname !== '/login' && window.location.pathname !== '/auth/login') {
                    window.location.href = '/auth/login';
                }
            } else if (error.response.status === 403) {
                console.error('Forbidden action');
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Network Error: No response received from server. Make sure your backend is running at:', API_URL);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
