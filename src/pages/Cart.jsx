import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const subtotal = getCartTotal();
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 999 ? 0 : 99;
  const grandTotal = subtotal + tax + shipping;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      return;
    }

    setIsProcessing(true);

    // Create order
    const order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || item.images?.[0] || item.img,
      })),
      total: grandTotal,
      subtotal: subtotal,
      tax: tax,
      shipping: shipping,
      status: 'Processing',
      date: new Date().toISOString(),
      shippingAddress: 'Address will be collected during checkout',
    };

    // Save order to localStorage
    const existingOrders = localStorage.getItem('orders');
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    clearCart();

    // Navigate to order details
    setTimeout(() => {
      navigate(`/orders/${order.id}`);
      setIsProcessing(false);
    }, 500);
  };

  if (cart.length === 0) {
    return (
      <div className="pt-24 md:pt-32 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag size={80} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/"
            className="inline-block bg-[#88013C] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#88013C]/90 transition-all"
          >
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
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-[#88013C] transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Continue Shopping</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <div className="text-sm text-gray-600">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.slug}`}
                    className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.image || item.images?.[0] || item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.slug}`}
                        className="text-lg font-bold text-gray-900 hover:text-[#88013C] transition-colors mb-2 block"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xl font-bold text-[#88013C]">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.mrp && item.mrp > item.price && (
                          <span className="text-gray-400 line-through text-sm">
                            ₹{item.mrp.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {item.material && (
                        <p className="text-sm text-gray-600">Material: {item.material}</p>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} className={item.quantity <= 1 ? 'text-gray-300' : 'text-gray-700'} />
                        </button>
                        <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={16} className="text-gray-700" />
                        </button>
                      </div>

                      <div className="flex flex-col items-end sm:items-start gap-2">
                        <div className="text-lg font-bold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className=" border-1 border-red-700 py-2 px-4 rounded-lg flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-semibold transition-colors hover:cursor-pointer"
                        >
                          <Trash2 size={16} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (GST 18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                {subtotal < 999 && (
                  <p className="text-sm text-green-600">
                    Add ₹{(999 - subtotal).toLocaleString()} more for free shipping
                  </p>
                )}
                <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#88013C]">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing || cart.length === 0}
                  className="w-full bg-[#88013C] text-white py-2 rounded-lg font-bold hover:bg-[#88013C]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                <Link
                  to="/"
                  className="block w-full text-center border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:border-gray-400 transition-all"
                >
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full inline-block bg-[#88013C] text-white py-2 rounded-lg font-semibold hover:bg-[#88013C]/90 transition-all hover:cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-green-600">✓</span>
                  <span>Free delivery on orders above ₹999</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-green-600">✓</span>
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-green-600">✓</span>
                  <span>7 days return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
