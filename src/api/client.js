import axios from 'axios';
import toast from 'react-hot-toast';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    timeout: 15000,
});

/**
 * Shared refresh "lock" to prevent concurrent refresh calls.
 * This matters because your backend rotates refresh tokens (revokes old one),
 * so two refresh calls in parallel will cause one to fail and log the user out.
 */
let refreshPromise = null;

export async function refreshAccessToken() {
    if (refreshPromise) return refreshPromise;

    refreshPromise = (async () => {
        const refreshClient = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL,
            withCredentials: true,
            timeout: 15000,
        });

        const response = await refreshClient.post('/api/v1/auth/refresh');
        const { accessToken } = response.data || {};

        window.__ACCESS_TOKEN__ = accessToken || null;
        return accessToken || null;
    })().finally(() => {
        refreshPromise = null;
    });

    return refreshPromise;
}

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

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return apiClient(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const accessToken = await refreshAccessToken();

                if (accessToken) {
                    processQueue(null, accessToken);
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return apiClient(originalRequest);
                } else {
                    processQueue(new Error('Refresh failed'), null);
                    window.__ACCESS_TOKEN__ = null;
                }
            } catch (refreshError) {
                processQueue(refreshError, null);
                window.__ACCESS_TOKEN__ = null;
                console.error('Session expired, please log in again.');
            } finally {
                isRefreshing = false;
            }
        }

        let message = error.response?.data?.message || error.response?.data?.error?.message || error.response?.data?.error || error.message || 'Something went wrong';

        // Ensure message is a string before passing to react-hot-toast to prevent "Objects are not valid as a React child"
        if (typeof message === 'object' && message !== null) {
            message = message.message || JSON.stringify(message);
        }

        // Don't show toast if skipToast is true
        if (error.config?.skipToast) {
            return Promise.reject(error);
        }

        // Don't show toast for the initial 401 error if we are attempting a retry
        if (error.response?.status !== 401 || originalRequest._retry === false) {
            toast.error(message, { id: error.config?.toastId });
        }


        console.error('API ERROR:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
