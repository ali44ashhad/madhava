import apiClient from './client';
import { AUTH_ENDPOINTS } from './endpoints';

export const authApi = {
    // Signup
    signupRequestOtp: async (data) => {
        const response = await apiClient.post(AUTH_ENDPOINTS.SIGNUP, data);
        return response.data;
    },

    signupVerifyOtp: async (data) => {
        const response = await apiClient.post(AUTH_ENDPOINTS.SIGNUP_VERIFY, data);
        return response.data;
    },

    // Login
    loginRequestOtp: async (phone) => {
        const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN_OTP, { phone });
        return response.data;
    },

    loginVerifyOtp: async (phone, otp) => {
        const response = await apiClient.post(AUTH_ENDPOINTS.VERIFY_OTP, { phone, otp });
        return response.data;
    },

    // User
    getMe: async () => {
        const response = await apiClient.get(AUTH_ENDPOINTS.GET_ME);
        return response.data;
    },

    logout: async () => {
        const response = await apiClient.post('/api/auth/logout');
        return response.data;
    }
};
