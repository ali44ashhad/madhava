import axios from 'axios';
import toast from 'react-hot-toast';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    timeout: 15000,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = window.__ACCESS_TOKEN__ || localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        toast.error(message);
        console.error('API ERROR:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
