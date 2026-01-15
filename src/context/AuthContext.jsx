import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (email, password) => {
    // Simulate login - in real app, this would be an API call
    const userData = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
    };
    setUser(userData);
    return Promise.resolve(userData);
  };

  const signup = (name, email, password) => {
    // Simulate signup - in real app, this would be an API call
    const userData = {
      id: Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString(),
    };
    setUser(userData);
    return Promise.resolve(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('orders'); // Clear orders on logout
  };

  const deleteAccount = () => {
    if (user) {
      const userId = user.id;
      // Clear user data
      setUser(null);
      localStorage.removeItem('user');
      
      // Clear user-specific data
      localStorage.removeItem('orders');
      localStorage.removeItem(`wishlist_${userId}`);
      localStorage.removeItem(`addresses_${userId}`);
      localStorage.removeItem(`shared_products_${userId}`);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        deleteAccount,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
