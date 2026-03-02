import apiClient from './client';
import { STORE_ENDPOINTS } from './endpoints';

export const getAddresses = async (customerId) => {
    try {
        const response = await apiClient.get(STORE_ENDPOINTS.ADDRESSES, {
            params: { customerId }
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const createAddress = async (addressData) => {
    try {
        const response = await apiClient.post(STORE_ENDPOINTS.ADDRESSES, addressData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateAddress = async (addressId, addressData) => {
    try {
        const response = await apiClient.put(`${STORE_ENDPOINTS.ADDRESSES}/${addressId}`, addressData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteAddress = async (addressId) => {
    try {
        const response = await apiClient.delete(`${STORE_ENDPOINTS.ADDRESSES}/${addressId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
