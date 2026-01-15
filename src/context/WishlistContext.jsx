import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist));
        } catch (error) {
          console.error('Error loading wishlist from localStorage:', error);
          setWishlist([]);
        }
      }
    } else {
      setWishlist([]);
    }
  }, [user]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (user && wishlist.length >= 0) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToWishlist = (product) => {
    if (!user) return;
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isWishlisted = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const getWishlist = () => {
    return wishlist;
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        getWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
