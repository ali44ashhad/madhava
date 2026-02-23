import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, CreditCard, Smartphone, Building2, Wallet, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createOrder } from '../../api/orderApi';
import toast from 'react-hot-toast';

const Payment = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { customer, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMethod, setSelectedMethod] = useState('razorpay');
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
  const isBuyNow = location.state?.isBuyNow;

  const subtotal = orderSummary?.subtotal || getCartTotal();
  const tax = 0; // Inclusive in price
  const shipping = 0; // Free shipping
  const discount = 0; // Can be calculated based on coupons/promotions
  const codFee = selectedMethod === 'cod' ? 50 : 0;
  const grandTotal = subtotal + shipping - discount + codFee;

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

  const products = location.state?.products || cart;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!address) {
      toast.error('Please select an address');
      navigate('/checkout');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Prepare Order Payload
      const paymentMethod = selectedMethod === 'cod' ? 'COD' : 'RAZORPAY';
      const items = products.map(item => ({
        skuId: item.productId || item.id, // Handle both cart items and direct buy items
        quantity: item.quantity
      }));

      const orderPayload = {
        customerId: customer.id,
        addressId: address.id,
        paymentMethod,
        paymentReference: null, // Will be updated for Razorpay later if needed, but backend takes it null initially
        items
      };

      // 2. Create Order
      const response = await createOrder(orderPayload);
      console.log("Order created successfully", response);

      const { orderId, orderNumber, totalAmount, razorpayOrderId } = response.data; // Assuming backend returns this

      // 3. Handle Payment Flow
      if (paymentMethod === 'COD') {
        // Success for COD
        if (!isBuyNow) {
          clearCart();
        }
        navigate('/orders', { replace: true });
        toast.success(`Order Placed Successfully! Order # ${orderNumber}`);
      } else {
        // Handle Razorpay
        const res = await loadRazorpay();
        if (!res) {
          toast.error('Razorpay process failed to load. Are you online?');
          setIsProcessing(false);
          return;
        }

        const rzpKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_SCpSDW8dAGzOEK';

        if (!rzpKey || !rzpKey.startsWith('rzp_test_')) {
          toast.error("Invalid Razorpay Test Key");
          setIsProcessing(false);
          return;
        }

        const options = {
          key: rzpKey,
          amount: Math.round(grandTotal * 100), // Mandatory
          currency: 'INR', // Mandatory
          name: 'Nesta Toys',
          description: `Order #${orderNumber}`,
          order_id: razorpayOrderId, // Mandatory
          prefill: {
            name: address?.name || customer?.name || "Customer",
            email: customer?.email || "customer@example.com",
            contact: address?.phone || customer?.phone || "9999999999",
          },
          theme: {
            color: '#88013C',
          },
          handler: async function (response) {
            alert(JSON.stringify(response));
            toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
            if (!isBuyNow) {
              clearCart();
            }
            navigate('/orders', { replace: true });
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            }
          }
        };

        const razorpayInstance = new window.Razorpay(options);

        razorpayInstance.on('payment.failed', function (response) {
          console.error('Razorpay payment failed', response.error);
          toast.error(`Payment Failed: ${response.error.description || 'Unknown error'}`);
          setIsProcessing(false);
        });

        razorpayInstance.open();
      }

    } catch (error) {
      console.error('Payment failed:', error);
      toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated || !address) {
    return null;
  }

  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: CreditCard,
      description: 'Cards, UPI, Netbanking, Wallets',
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: Wallet,
      description: 'Pay when you receive',
    },
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
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${isSelected
                        ? 'border-[#88013C] bg-[#88013C]/5'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#88013C] text-white' : 'bg-gray-100 text-gray-600'
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
                  <span>Tax (Included)</span>
                  <span className="font-semibold text-green-600">Inclusive</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900">
                    Free
                  </span>
                </div>
                {selectedMethod === 'cod' && (
                  <div className="flex justify-between text-gray-600">
                    <span>COD Fee</span>
                    <span className="font-semibold text-gray-900">
                      ₹{codFee}
                    </span>
                  </div>
                )}
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
