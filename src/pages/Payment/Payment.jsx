import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, CreditCard, Smartphone, Building2, Wallet, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Payment = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMethod, setSelectedMethod] = useState('googlepay');
  const [isProcessing, setIsProcessing] = useState(false);

  // Payment form data
  const [paymentData, setPaymentData] = useState({
    upi: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: '',
    bank: '',
  });

  const address = location.state?.address;
  const orderSummary = location.state?.orderSummary;

  const subtotal = orderSummary?.subtotal || getCartTotal();
  const tax = orderSummary?.tax || subtotal * 0.18;
  const shipping = orderSummary?.shipping || (subtotal > 999 ? 0 : 99);
  const discount = 0; // Can be calculated based on coupons/promotions
  const grandTotal = orderSummary?.total || subtotal + tax + shipping - discount;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (cart.length === 0 && !address) {
      navigate('/cart');
      return;
    }
    if (!address) {
      navigate('/checkout');
      return;
    }
  }, [isAuthenticated, cart.length, address, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    if (!address) {
      alert('Please select an address');
      navigate('/checkout');
      return;
    }

    // Validate payment method specific fields
    if (selectedMethod === 'upi' && !paymentData.upi) {
      alert('Please enter UPI ID');
      return;
    }
    if (selectedMethod === 'card') {
      if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.cardExpiry || !paymentData.cardCVV) {
        alert('Please fill all card details');
        return;
      }
    }
    if (selectedMethod === 'netbanking' && !paymentData.bank) {
      alert('Please select a bank');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

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
      subtotal,
      tax,
      shipping,
      discount,
      paymentMethod: selectedMethod,
      status: 'Processing',
      date: new Date().toISOString(),
      shippingAddress: address,
    };

    const existingOrders = localStorage.getItem('orders');
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart after successful payment (as per user preference, but typically we clear it)
    // clearCart(); // Commented as per user preference to keep cart

    setIsProcessing(false);
    navigate(`/orders/${order.id}`);
  };

  if (!isAuthenticated || !address) {
    return null;
  }

  const paymentMethods = [
    {
      id: 'googlepay',
      name: 'Google Pay',
      icon: Smartphone,
      description: 'Pay with Google Pay',
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Pay with any UPI app',
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay',
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building2,
      description: 'All major banks',
    },
    {
      id: 'wallets',
      name: 'Wallets',
      icon: Wallet,
      description: 'Paytm, PhonePe, Amazon Pay',
    },
  ];

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'IndusInd Bank',
  ];

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/checkout" className="flex items-center gap-2 text-gray-600 hover:text-[#88013C]">
            <ArrowLeft size={20} />
            <span>Back to Checkout</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Select Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;
                  return (
                    <div
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#88013C] bg-[#88013C]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-[#88013C] text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <Icon size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900">{method.name}</h3>
                            {isSelected && <Check size={20} className="text-[#88013C]" />}
                          </div>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>

                      {/* Method-specific forms */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-4 border-t border-gray-200"
                        >
                          {method.id === 'upi' && (
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                UPI ID
                              </label>
                              <input
                                type="text"
                                name="upi"
                                value={paymentData.upi}
                                onChange={handleInputChange}
                                placeholder="yourname@upi"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                              />
                            </div>
                          )}

                          {method.id === 'card' && (
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  Card Number
                                </label>
                                <input
                                  type="text"
                                  name="cardNumber"
                                  value={paymentData.cardNumber}
                                  onChange={handleInputChange}
                                  placeholder="1234 5678 9012 3456"
                                  maxLength="19"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  Cardholder Name
                                </label>
                                <input
                                  type="text"
                                  name="cardName"
                                  value={paymentData.cardName}
                                  onChange={handleInputChange}
                                  placeholder="John Doe"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Expiry (MM/YY)
                                  </label>
                                  <input
                                    type="text"
                                    name="cardExpiry"
                                    value={paymentData.cardExpiry}
                                    onChange={handleInputChange}
                                    placeholder="12/25"
                                    maxLength="5"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                                  <input
                                    type="text"
                                    name="cardCVV"
                                    value={paymentData.cardCVV}
                                    onChange={handleInputChange}
                                    placeholder="123"
                                    maxLength="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {method.id === 'netbanking' && (
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Bank
                              </label>
                              <select
                                name="bank"
                                value={paymentData.bank}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                              >
                                <option value="">Select a bank</option>
                                {banks.map((bank) => (
                                  <option key={bank} value={bank}>
                                    {bank}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {(method.id === 'wallets' || method.id === 'googlepay') && (
                            <div className="text-center py-4">
                              <p className="text-gray-600">You will be redirected to complete the payment</p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Address Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Address</h2>
              <div className="text-gray-700">
                <p className="font-semibold">{address.name}</p>
                <p className="text-sm">{address.phone}</p>
                <p className="text-sm mt-1">
                  {address.address1}, {address.address2 && `${address.address2}, `}
                  {address.city}, {address.state} - {address.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Product List */}
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image || item.images?.[0] || item.img}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-[#88013C]">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{discount.toLocaleString()}</span>
                  </div>
                )}
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

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-[#88013C] text-white py-3 rounded-lg font-bold hover:bg-[#88013C]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
