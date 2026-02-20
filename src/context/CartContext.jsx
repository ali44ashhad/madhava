import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartApi } from '../api/cartApi';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const fetchCart = async () => {
    try {
      const response = await cartApi.getCart();
      // Map backend response to match frontend expectations
      const items = response.data.items.map(item => ({
        id: item.itemId,       // CartItem ID for updates/removes
        productId: item.skuId, // Keep reference to product/sku ID
        title: item.productName,
        image: item.image,
        price: item.sellingPrice,
        quantity: item.quantity,
        ...item.skuAttributes
      }));
      setCart(items);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  // Sync cart with auth state
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [isAuthenticated]);

  const addToCart = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      alert("Please login to use the cart.");
      return;
    }
    try {
      const skuId = product.productId || product.id;
      await cartApi.addCartItem({ skuId, quantity });
      await fetchCart();
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await cartApi.removeCartItem(itemId);
      await fetchCart();
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }
    try {
      await cartApi.updateCartItem(itemId, { quantity });
      await fetchCart();
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clearCart();
      setCart([]);
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};