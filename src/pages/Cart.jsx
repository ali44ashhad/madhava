import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, Package, Tag, TrendingUp, Sparkles } from 'lucide-react';
import CircleLoader from "react-spinners/CircleLoader"

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Calculations based on the current state of the cart
  const subtotal = getCartTotal();
  const tax = 0; // Inclusive in price
  const shipping = 0; // Free shipping
  const grandTotal = subtotal; // Aligned with backend value

  // Calculate savings
  const totalSavings = cart.reduce((acc, item) => {
    const mrp = Number(item.mrp || 0);
    const price = Number(item.price || 0);
    const quantity = Number(item.quantity || 1);
    return acc + ((mrp - price) * quantity);
  }, 0);

  const handleBuyNow = () => {
    // if (!isAuthenticated) {
    //   navigate('/login');
    //   return;
    // }
    if (cart.length === 0) return;
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-24">
        <CircleLoader color="#88013c" size={60} />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-24 md:pt-32 min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="text-center bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
              <ShoppingBag size={64} className="text-[#88013C]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">Start adding products to see them here!</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#88013C] to-[#a0014a] text-white px-10 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
            >
              <Sparkles size={20} />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#88013C] mb-4 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
              <p className="text-gray-600">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>

            {totalSavings > 0 && (
              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} />
                  <div>
                    <p className="text-xs opacity-90">You're saving</p>
                    <p className="text-xl font-bold">₹{totalSavings.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const key = item.id || item.productId;
              const itemPrice = Number(item.price || 0);
              const itemMrp = Number(item.mrp || 0);
              const itemQuantity = Number(item.quantity || 1);
              const itemTotal = itemPrice * itemQuantity;
              const itemSavings = (itemMrp - itemPrice) * itemQuantity;
              const discountPercent = itemMrp > itemPrice ? Math.round(((itemMrp - itemPrice) / itemMrp) * 100) : 0;

              return (
                <div
                  key={key}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-all relative group"
                >
                  <div className="flex gap-4 md:gap-6">
                    {/* Image */}
                    <Link
                      to={`/product/${key}`}
                      className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform"
                    >
                      <img
                        src={item.imageUrl || item.image || 'https://placehold.co/200x200?text=Product'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 pr-2">
                          <Link
                            to={`/product/${key}`}
                            className="text-base sm:text-lg font-bold text-gray-900 hover:text-[#88013C] block line-clamp-2 mb-1"
                          >
                            {item.name}
                          </Link>

                          {item.category && (
                            <p className="text-xs text-gray-500 mb-2">
                              {item.category} {item.subcategory && `• ${item.subcategory}`}
                            </p>
                          )}
                        </div>

                        {/* Remove button - Desktop */}
                        <button
                          onClick={() => removeFromCart(key)}
                          className="hidden sm:flex text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {/* Price Info */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xl sm:text-2xl font-bold text-[#88013C]">
                            ₹{itemTotal.toLocaleString()}
                          </span>
                          {itemMrp > itemPrice && (
                            <>
                              <span className="text-sm text-gray-400 line-through">
                                ₹{(itemMrp * itemQuantity).toLocaleString()}
                              </span>
                              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                                {discountPercent}% OFF
                              </span>
                            </>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          Unit Price: ₹{itemPrice.toLocaleString()}
                        </span>
                        {itemSavings > 0 && (
                          <p className="text-xs text-green-600 font-medium mt-1">
                            You save ₹{itemSavings.toLocaleString()}
                          </p>
                        )}
                      </div>

                      {/* Quantity Controls & Remove - Mobile/Tablet */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center border-2 border-gray-200 rounded-lg bg-gray-50">
                          <button
                            onClick={() => updateQuantity(key, itemQuantity - 1)}
                            className="p-2 hover:bg-gray-200 disabled:opacity-30 transition-colors"
                            disabled={itemQuantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-1 font-bold min-w-[50px] text-center">
                            {itemQuantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(key, itemQuantity + 1)}
                            className="p-2 hover:bg-gray-200 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Remove button - Mobile */}
                        <button
                          onClick={() => removeFromCart(key)}
                          className="sm:hidden text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>

                        {item.stockQuantity && (
                          <span className="hidden sm:block text-xs text-gray-500">
                            <Package size={12} className="inline mr-1" />
                            {item.stockQuantity} in stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="w-full text-red-600 hover:text-red-700 text-sm font-medium py-3 rounded-xl border-2 border-dashed border-red-200 hover:border-red-300 hover:bg-red-50 transition-all"
            >
              Clear entire cart
            </button>
          </div>

          {/* Order Summary - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:sticky lg:top-28">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                <Tag className="text-[#88013C]" size={24} />
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600 bg-green-50 -mx-6 px-6 py-3">
                    <span className="font-medium">Total Savings</span>
                    <span className="font-bold">-₹{totalSavings.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>GST (Included)</span>
                  <span className="font-semibold text-green-600">
                    Inclusive
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-gray-200 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Grand Total</span>
                  <span className="text-2xl font-bold text-[#88013C]">
                    ₹{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-[#88013C] to-[#a0014a] text-white py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all shadow-lg mb-3"
              >
                Proceed to Checkout
              </button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;