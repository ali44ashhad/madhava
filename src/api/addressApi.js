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

// Note: deleteAddress might not be fully supported by backend yet based on routes check, 
// but implementing it for frontend consistency.
export const deleteAddress = async (addressId) => {
    try {
        // Assuming DELETE endpoint structure if it existed, or it might be missing.
        // Based on routes file, there is no DELETE address route.
        // I will comment this out or handle it gracefully if the user tries to delete.
        // For now, I'll log a warning that it's not implemented on backend.
        console.warn('Delete address not implemented in backend yet');
        // const response = await apiClient.delete(`${STORE_ENDPOINTS.ADDRESSES}/${addressId}`);
        // return response.data;
    } catch (error) {
        throw error;
    }
};
