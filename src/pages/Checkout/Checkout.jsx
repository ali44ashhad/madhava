import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  X,
  Lock,
  MapPin,
  Package,
  Shield,
  CheckCircle2
} from 'lucide-react';
import {
  getAddresses,
  saveAddress,
  deleteAddress,
  setDefaultAddress,
  getDefaultAddress
} from '../../utils/addressUtils';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
  const { cart, getCartTotal } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /* 🔥 BUY NOW SUPPORT */
  const buyNowProduct = location.state?.buyNowProduct;
  const products = buyNowProduct ? [buyNowProduct] : cart;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    isDefault: false,
  });

  const subtotal = buyNowProduct
    ? buyNowProduct.price * buyNowProduct.quantity
    : getCartTotal();

  const tax = subtotal * 0.18;
  const shipping = subtotal > 999 ? 0 : 99;
  const grandTotal = subtotal + tax + shipping;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!buyNowProduct && cart.length === 0) {
      navigate('/cart');
      return;
    }

    loadAddresses();
  }, [isAuthenticated, cart.length]);

  const loadAddresses = () => {
    if (!user) return;
    const userAddresses = getAddresses(user.id);
    setAddresses(userAddresses);
    setSelectedAddress(
      getDefaultAddress(user.id) || userAddresses[0] || null
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveAddress = () => {
    if (!user) return;

    if (!formData.name || !formData.phone || !formData.address1 || 
        !formData.city || !formData.state || !formData.pincode) {
      alert('Please fill all required fields');
      return;
    }

    const addressData = {
      ...formData,
      id: isEditing ? editingAddress.id : Date.now().toString()
    };

    saveAddress(user.id, addressData);

    if (formData.isDefault) {
      setDefaultAddress(user.id, addressData.id);
    }

    loadAddresses();
    resetForm();
  };

  const handleEditAddress = (address) => {
    setFormData(address);
    setEditingAddress(address);
    setIsEditing(true);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (addressId) => {
    if (!user) return;
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress(user.id, addressId);
      loadAddresses();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      isDefault: false,
    });
    setShowAddressForm(false);
    setIsEditing(false);
    setEditingAddress(null);
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    navigate('/payment', {
      state: {
        products,
        address: selectedAddress,
        orderSummary: {
          subtotal,
          tax,
          shipping,
          total: grandTotal,
        },
        isBuyNow: !!buyNowProduct
      }
    });
  };

  if (!isAuthenticated) return null;

  return (
    <div className="pt-30 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to={buyNowProduct ? `/product/${buyNowProduct.id}` : '/cart'}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#88013C] transition-colors mb-4 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to {buyNowProduct ? 'Product' : 'Cart'}</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Shield size={16} className="text-green-600" />
                Your information is safe and secure
              </p>
            </div>
            
            {/* Progress Steps */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#88013C] text-white flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <span className="text-sm font-medium text-[#88013C]">Checkout</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span className="text-sm font-medium text-gray-500">Payment</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="text-sm font-medium text-gray-500">Confirmation</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT - Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* ORDER SUMMARY */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#88013C] to-[#a8014a] p-6">
                <div className="flex items-center gap-3 text-white">
                  <Package size={24} />
                  <h2 className="text-xl font-bold">Order Summary</h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {products.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex gap-4 pb-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="relative">
                      <img
                        src={item.image || item.images?.[0]}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl shadow-sm"
                      />
                      <div className="absolute -top-2 -right-2 bg-[#88013C] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Quantity: {item.quantity} × ₹{item.price.toLocaleString()}
                      </p>
                      <p className="font-bold text-[#88013C] text-lg">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* DELIVERY ADDRESS SECTION */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#88013C] to-[#a8014a] p-6">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <MapPin size={24} />
                    <h2 className="text-xl font-bold">Delivery Address</h2>
                  </div>
                  {!showAddressForm && (
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Plus size={18} />
                      <span className="font-medium">Add New</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {showAddressForm ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">
                          {isEditing ? 'Edit Address' : 'Add New Address'}
                        </h3>
                        <button
                          onClick={resetForm}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent outline-none transition-all"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent outline-none transition-all"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address Line 1 *
                        </label>
                        <input
                          type="text"
                          name="address1"
                          value={formData.address1}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent outline-none transition-all"
                          placeholder="House No., Building Name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          name="address2"
                          value={formData.address2}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent outline-none transition-all"
                          placeholder="Street, Area"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent outline-none transition-all"
                            placeholder="Mumbai"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State *
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent outline-none transition-all"
                            placeholder="Maharashtra"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pincode *
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent outline-none transition-all"
                            placeholder="400001"
                            maxLength="6"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent outline-none transition-all"
                          placeholder="Near Police Station"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="isDefault"
                          id="isDefault"
                          checked={formData.isDefault}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#88013C] border-gray-300 rounded focus:ring-[#88013C]"
                        />
                        <label htmlFor="isDefault" className="text-sm text-gray-700 cursor-pointer">
                          Set as default address
                        </label>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={handleSaveAddress}
                          className="flex-1 bg-[#88013C] hover:bg-[#a8014a] text-white py-3 rounded-lg font-semibold transition-colors"
                        >
                          {isEditing ? 'Update Address' : 'Save Address'}
                        </button>
                        <button
                          onClick={resetForm}
                          className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      {addresses.length === 0 ? (
                        <div className="text-center py-12">
                          <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                          <p className="text-gray-500 mb-4">No saved addresses</p>
                          <button
                            onClick={() => setShowAddressForm(true)}
                            className="inline-flex items-center gap-2 bg-[#88013C] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#a8014a] transition-colors"
                          >
                            <Plus size={18} />
                            Add Your First Address
                          </button>
                        </div>
                      ) : (
                        addresses.map((address) => (
                          <motion.div
                            key={address.id}
                            whileHover={{ scale: 1.01 }}
                            className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${
                              selectedAddress?.id === address.id
                                ? 'border-[#88013C] bg-[#88013C]/5 shadow-md'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedAddress(address)}
                          >
                            {selectedAddress?.id === address.id && (
                              <div className="absolute top-4 right-4">
                                <CheckCircle2 size={24} className="text-[#88013C]" />
                              </div>
                            )}
                            
                            <div className="pr-12">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-bold text-gray-900">{address.name}</h4>
                                {address.isDefault && (
                                  <span className="text-xs bg-[#88013C] text-white px-2 py-0.5 rounded">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
                              <p className="text-sm text-gray-600">
                                {address.address1}, {address.address2 && `${address.address2}, `}
                                {address.city}, {address.state} - {address.pincode}
                              </p>
                              {address.landmark && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Landmark: {address.landmark}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-2 mt-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditAddress(address);
                                }}
                                className="flex items-center gap-1 text-sm text-[#88013C] hover:text-[#a8014a] font-medium"
                              >
                                <Edit2 size={14} />
                                Edit
                              </button>
                              <span className="text-gray-300">|</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteAddress(address.id);
                                }}
                                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>

          {/* RIGHT - Price Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-[#88013C] to-[#a8014a] p-6">
                <h2 className="text-xl font-bold text-white">Price Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-gray-700">
                  <span>Tax (18% GST)</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>

                {shipping === 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs text-green-700 flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      You saved ₹99 on shipping!
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-[#88013C]">
                      ₹{grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  disabled={!selectedAddress}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                    selectedAddress
                      ? 'bg-gradient-to-r from-[#88013C] to-[#a8014a] hover:shadow-lg'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  <Lock size={18} />
                  Continue to Payment
                </button>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield size={16} className="text-green-600" />
                    <span>100% Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Package size={16} className="text-blue-600" />
                    <span>Free Delivery on orders above ₹999</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;