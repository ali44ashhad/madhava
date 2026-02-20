import apiClient from './client';
import { STORE_ENDPOINTS } from './endpoints';

export const cartApi = {
    getCart: async () => {
        return await apiClient.get(STORE_ENDPOINTS.CART);
    },

    addCartItem: async (data) => {
        return await apiClient.post(`${STORE_ENDPOINTS.CART}/items`, data);
    },

    updateCartItem: async (itemId, data) => {
        return await apiClient.patch(`${STORE_ENDPOINTS.CART}/items/${itemId}`, data);
    },

    removeCartItem: async (itemId) => {
        return await apiClient.delete(`${STORE_ENDPOINTS.CART}/items/${itemId}`);
    },

    clearCart: async () => {
        return await apiClient.delete(STORE_ENDPOINTS.CART);
    }
};
