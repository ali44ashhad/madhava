import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const tax = subtotal * 0.18;
  const shipping = subtotal > 999 ? 0 : 99;
  const grandTotal = subtotal + tax + shipping;

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (cart.length === 0) return;
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="pt-24 md:pt-32 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag size={80} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="inline-block bg-[#88013C] text-white px-8 py-3 rounded-lg font-semibold">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-[#88013C]">
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <div className="text-sm text-gray-600">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 relative">

                <div className="flex gap-4">

                  {/* Image */}
                  <Link to={`/product/${item.slug}`} className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || item.images?.[0] || item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 pr-24 sm:pr-0">

                    <Link
                      to={`/product/${item.slug}`}
                      className="text-base sm:text-lg font-bold text-gray-900 hover:text-[#88013C] block"
                    >
                      {item.name}
                    </Link>

                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-lg sm:text-xl font-bold text-[#88013C]">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.mrp && item.mrp > item.price && (
                        <span className="text-gray-400 line-through text-sm">
                          ₹{item.mrp.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {item.material && (
                      <p className="text-sm text-gray-600 mt-1">Material: {item.material}</p>
                    )}

                  </div>

                  {/* RIGHT SIDE CONTROLS (MOBILE ABSOLUTE) */}
                  <div className="absolute top-4 right-1 flex flex-col items-end gap-1 sm:static sm:flex-row sm:items-center sm:gap-2">

                    {/* Quantity */}
                    <div className="flex items-center border-2 border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 sm:p-2"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>

                      <span className="px-2 sm:px-3 text-sm sm:text-base font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 sm:p-2"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Total */}
                    <div className="text-sm sm:text-lg font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="border border-red-700 py-1 px-2 sm:px-3 rounded-lg flex items-center gap-1 text-red-600 text-xs sm:text-sm font-semibold"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Summary Details */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18%)</span>
                  <span className="font-semibold text-gray-900">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                  <span>Total</span>
                  <span className="text-[#88013C]">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={cart.length === 0}
                className="w-full bg-[#88013C] text-white py-3 rounded-lg font-bold hover:bg-[#88013C]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                Buy Now
              </button>

              {/* Continue Shopping */}
              <Link
                to="/"
                className="w-full text-center border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-gray-400 transition-all block mb-4"
              >
                Continue Shopping
              </Link>

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="w-full text-red-600 border-2 border-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition-all"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
