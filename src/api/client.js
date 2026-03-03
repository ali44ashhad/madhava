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
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and we haven't already retried this request
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Determine if this is a customer or admin request based on the URL or existing tokens
                // For simplicity, we try the customer refresh endpoint first
                // A dedicated axios instance is used to prevent interceptor infinite loops
                const refreshClient = axios.create({
                    baseURL: import.meta.env.VITE_API_BASE_URL,
                    withCredentials: true,
                });

                const response = await refreshClient.post('/api/auth/refresh');
                const { accessToken } = response.data;

                if (accessToken) {
                    window.__ACCESS_TOKEN__ = accessToken;

                    // Update Authorization header for the retried request
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                    // Retry the original request with the new token
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                // If refresh fails, clear the memory token. 
                // The user will need to log in again.
                window.__ACCESS_TOKEN__ = null;
                console.error('Session expired, please log in again.');
            }
        }

        let message = error.response?.data?.message || error.response?.data?.error?.message || error.response?.data?.error || error.message || 'Something went wrong';

        // Ensure message is a string before passing to react-hot-toast to prevent "Objects are not valid as a React child"
        if (typeof message === 'object' && message !== null) {
            message = message.message || JSON.stringify(message);
        }

        // Don't show toast for the initial 401 error if we are attempting a retry
        if (error.response?.status !== 401 || originalRequest._retry === false) {
            toast.error(message);
        }

        console.error('API ERROR:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
