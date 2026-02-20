import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Attempt to get a new access token using the HttpOnly refresh token cookie
        const response = await authApi.refresh();
        window.__ACCESS_TOKEN__ = response.accessToken;

        // If successful, fetch the customer profile
        const customerProfile = await authApi.getMe();

        setCustomer(customerProfile);
        setIsAuthenticated(true);
      } catch (error) {
        // If refresh fails (e.g., token expired or missing), keep them logged out
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const setSession = (data) => {
    const { accessToken, customer } = data;
    window.__ACCESS_TOKEN__ = accessToken;
    setCustomer(customer);
    setIsAuthenticated(true);
  };

  const clearSession = () => {
    window.__ACCESS_TOKEN__ = null;
    setCustomer(null);
    setIsAuthenticated(false);
  };

  // --- Auth Actions ---

  const signupRequestOtp = async (data) => {
    return await authApi.signupRequestOtp(data);
  };

  const signupVerifyOtp = async (data) => {
    const response = await authApi.signupVerifyOtp(data);
    setSession(response);
    return response;
  };

  const loginRequestOtp = async (phone) => {
    return await authApi.loginRequestOtp(phone);
  };

  const loginVerifyOtp = async (phone, otp) => {
    const response = await authApi.loginVerifyOtp(phone, otp);
    setSession(response);
    return response;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      clearSession();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        isAuthenticated,
        isLoading,
        signupRequestOtp,
        signupVerifyOtp,
        loginRequestOtp,
        loginVerifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
