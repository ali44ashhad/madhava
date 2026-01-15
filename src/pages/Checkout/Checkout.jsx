import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Plus, Edit2, Trash2, X, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAddresses, saveAddress, deleteAddress, setDefaultAddress, getDefaultAddress } from '../../utils/addressUtils';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
  const { cart, getCartTotal } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
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

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const subtotal = getCartTotal();
  const tax = subtotal * 0.18;
  const shipping = subtotal > 999 ? 0 : 99;
  const grandTotal = subtotal + tax + shipping;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }
    loadAddresses();
  }, [user, isAuthenticated, cart.length, navigate]);

  const loadAddresses = () => {
    if (user) {
      const userAddresses = getAddresses(user.id);
      setAddresses(userAddresses);
      const defaultAddr = getDefaultAddress(user.id);
      setSelectedAddress(defaultAddr || (userAddresses.length > 0 ? userAddresses[0] : null));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const addressData = {
        ...formData,
        id: editingAddress?.id,
      };
      saveAddress(user.id, addressData);
      loadAddresses();
      resetForm();
      setShowAddressForm(false);
      setIsEditing(false);
      setEditingAddress(null);
    } catch (error) {
      alert('Error saving address. Please try again.');
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setFormData({
      name: address.name || '',
      phone: address.phone || '',
      address1: address.address1 || '',
      address2: address.address2 || '',
      city: address.city || '',
      state: address.state || '',
      pincode: address.pincode || '',
      landmark: address.landmark || '',
      isDefault: address.isDefault || false,
    });
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

  const handleSetDefault = (addressId) => {
    if (!user) return;
    setDefaultAddress(user.id, addressId);
    loadAddresses();
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
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    // In a real app, this would call an API
    alert('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowPasswordForm(false);
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      alert('Please select or add a delivery address');
      return;
    }
    navigate('/payment', {
      state: {
        address: selectedAddress,
        orderSummary: {
          subtotal,
          tax,
          shipping,
          total: grandTotal,
        },
      },
    });
  };

  const handleNewAddress = () => {
    resetForm();
    setIsEditing(false);
    setEditingAddress(null);
    setShowAddressForm(true);
  };

  if (!isAuthenticated || cart.length === 0) {
    return null;
  }

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/cart" className="flex items-center gap-2 text-gray-600 hover:text-[#88013C]">
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <img
                      src={item.image || item.images?.[0] || item.img}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-lg font-bold text-[#88013C] mt-1">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
                <button
                  onClick={handleNewAddress}
                  className="flex items-center gap-2 text-[#88013C] hover:text-[#6a0129] font-semibold"
                >
                  <Plus size={20} />
                  Add New Address
                </button>
              </div>

              {/* Address List */}
              {addresses.length > 0 && (
                <div className="space-y-3 mb-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedAddress?.id === address.id
                          ? 'border-[#88013C] bg-[#88013C]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-gray-900">{address.name}</span>
                            {address.isDefault && (
                              <span className="text-xs bg-[#88013C] text-white px-2 py-1 rounded">Default</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{address.phone}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {address.address1}, {address.address2 && `${address.address2}, `}
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          {address.landmark && (
                            <p className="text-sm text-gray-500 mt-1">Landmark: {address.landmark}</p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAddress(address);
                            }}
                            className="p-2 text-gray-600 hover:text-[#88013C] hover:bg-gray-100 rounded"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAddress(address.id);
                            }}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      {!address.isDefault && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetDefault(address.id);
                          }}
                          className="mt-2 text-sm text-[#88013C] hover:underline"
                        >
                          Set as default
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {addresses.length === 0 && !showAddressForm && (
                <div className="text-center py-8 text-gray-500">
                  <p>No addresses saved. Add an address to continue.</p>
                </div>
              )}

              {/* Address Form */}
              <AnimatePresence>
                {showAddressForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-2 border-[#88013C] rounded-lg p-4 mt-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900">
                        {isEditing ? 'Edit Address' : 'Add New Address'}
                      </h3>
                      <button
                        onClick={() => {
                          setShowAddressForm(false);
                          resetForm();
                          setIsEditing(false);
                          setEditingAddress(null);
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <form onSubmit={handleSaveAddress} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            pattern="[0-9]{10}"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Address Line 1 *
                        </label>
                        <input
                          type="text"
                          name="address1"
                          value={formData.address1}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          name="address2"
                          value={formData.address2}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">City *</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">State *</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Pincode *</label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            required
                            pattern="[0-9]{6}"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Landmark</label>
                        <input
                          type="text"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
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
                        <label htmlFor="isDefault" className="text-sm text-gray-700">
                          Set as default address
                        </label>
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="flex-1 bg-[#88013C] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#6a0129] transition"
                        >
                          Save Address
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddressForm(false);
                            resetForm();
                            setIsEditing(false);
                            setEditingAddress(null);
                          }}
                          className="flex-1 border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:border-gray-400 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Change Password Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock size={20} className="text-gray-600" />
                  <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
                </div>
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="text-[#88013C] hover:text-[#6a0129] font-semibold"
                >
                  {showPasswordForm ? 'Cancel' : 'Change Password'}
                </button>
              </div>

              <AnimatePresence>
                {showPasswordForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleChangePassword}
                    className="mt-4 space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88013C] focus:border-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#88013C] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#6a0129] transition"
                    >
                      Update Password
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Price Summary</h2>
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
              <button
                onClick={handleContinue}
                disabled={!selectedAddress}
                className="w-full bg-[#88013C] text-white py-3 rounded-lg font-bold hover:bg-[#88013C]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
