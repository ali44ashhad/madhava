import apiClient from './client';
import { STORE_ENDPOINTS } from './endpoints';

export const createOrder = async (orderData) => {
    try {
        const response = await apiClient.post(STORE_ENDPOINTS.ORDERS, orderData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Step 1 of the Razorpay payment-first flow.
 * Creates a Razorpay Order ID without touching the DB.
 * Returns { razorpayOrderId, amount, currency }.
 */
export const initiateRazorpaySession = async (payload) => {
    try {
        const response = await apiClient.post(STORE_ENDPOINTS.RAZORPAY_INITIATE, payload);
        return response.data.data; // { razorpayOrderId, amount, currency }
    } catch (error) {
        throw error;
    }
};

export const getMyOrders = async () => {
    try {
        const response = await apiClient.get(STORE_ENDPOINTS.ORDERS);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const getOrderById = async (orderId) => {
    try {
        const response = await apiClient.get(`${STORE_ENDPOINTS.ORDERS}/${orderId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const requestReturn = async (orderItemId, payload) => {
    try {
        const response = await apiClient.post(`${STORE_ENDPOINTS.ORDERS}/${orderItemId}/return`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const cancelOrder = async (orderId, reason) => {
    try {
        const response = await apiClient.post(`${STORE_ENDPOINTS.ORDERS}/${orderId}/cancel`, { reason });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const validateCoupon = async (payload, config = {}) => {
    try {
        const response = await apiClient.post(`${STORE_ENDPOINTS.COUPONS}/validate`, payload, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};
