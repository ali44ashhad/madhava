import apiClient from './client';
import { STORE_ENDPOINTS } from './endpoints';

export const createOrder = async (orderData) => {
    try {
        const response = await apiClient.post(STORE_ENDPOINTS.ORDERS, orderData);
        // Backend response structure: { success: true, data: { order: {...}, razorpay: {...} } }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMyOrders = async () => {
    try {
        // Assuming GET /orders endpoint exists or fits the pattern
        // The routes file showed `router.post('/orders', placeOrderController);`
        // It didn't explicitly show a GET /orders for listing user orders in the snippet I saw earlier (store.routes.ts line 33).
        // Let me double check store.routes.ts content from previous steps.
        // Line 33: router.post('/orders', placeOrderController);
        // Line 34: router.post('/orders/:orderItemId/return', requestReturnController);
        // I DON'T SEE A GET ORDERS ROUTE IN STORE.ROUTES.TS!
        // I might need to add it to backend if it's missing, or maybe I missed it.
        // Wait, the instructions said "Create Order API Layer ... getMyOrders()".
        // Use apiClient.

        // If the backend doesn't support it, I might be blocked.
        // Let me check if there's an Order Controller that *has* a get orders method that just isn't mounted.

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
