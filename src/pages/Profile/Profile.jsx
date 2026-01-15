import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import {
  User,
  Package,
  LogOut,
  MapPin,
  Mail,
  Edit2,
  Heart,
  Share2,
  Settings,
  X,
  Menu,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAddresses, deleteAddress, setDefaultAddress } from '../../utils/addressUtils';
import { getSharedProducts, removeSharedProduct } from '../../utils/sharedProductsUtils';

const Profile = () => {
  const { user, logout, deleteAccount, isAuthenticated } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [sharedProducts, setSharedProducts] = useState([]);
  const [activeSection, setActiveSection] = useState('overview');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    loadData();
  }, [user, isAuthenticated]);

  const loadData = () => {
    if (!user) return;

    // Load orders
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders.filter(order => order.userId === user.id));
      } catch (error) {
        console.error('Error loading orders:', error);
        setOrders([]);
      }
    }

    // Load addresses
    const userAddresses = getAddresses(user.id);
    setAddresses(userAddresses);

    // Load shared products
    const shared = getSharedProducts(user.id);
    setSharedProducts(shared);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      deleteAccount();
      navigate('/');
    }
    setShowDeleteConfirm(false);
    setShowProfileDropdown(false);
  };

  const handleDeleteAddress = (addressId) => {
    if (!user) return;
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress(user.id, addressId);
      loadData();
    }
  };

  const handleSetDefaultAddress = (addressId) => {
    if (!user) return;
    setDefaultAddress(user.id, addressId);
    loadData();
  };

  const handleRemoveSharedProduct = (productId) => {
    if (!user) return;
    removeSharedProduct(user.id, productId);
    loadData();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eff4f7] to-white flex items-center justify-center px-4 pt-32">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your profile</p>
          <Link
            to="/login"
            className="inline-block bg-[#88013C] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6a0129] transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Profile Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package, badge: orders.length },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, badge: wishlist.length },
    { id: 'shared', label: 'Shared Products', icon: Share2, badge: sharedProducts.length },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff4f7] to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="w-10 h-10 bg-[#88013C] rounded-full flex items-center justify-center text-white text-lg font-bold"
            >
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </button>
            <AnimatePresence>
              {showProfileDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfileDropdown(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setActiveSection('overview');
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <User size={16} />
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-red-600"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setShowDeleteConfirm(true);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-red-600 border-t border-gray-200"
                    >
                      <Trash2 size={16} />
                      Delete Account
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Desktop Header with Profile Dropdown */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
            >
              <div className="w-10 h-10 bg-[#88013C] rounded-full flex items-center justify-center text-white text-lg font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="font-semibold text-gray-900">{user?.name || 'User'}</span>
              {showProfileDropdown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <AnimatePresence>
              {showProfileDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfileDropdown(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setActiveSection('overview');
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                    >
                      <User size={18} />
                      <span>View Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-red-600"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setShowDeleteConfirm(true);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-red-600 border-t border-gray-200"
                    >
                      <Trash2 size={18} />
                      <span>Delete Account</span>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Menu */}
          <div
            className={`${
              sidebarOpen ? 'block' : 'hidden'
            } lg:block bg-white rounded-xl shadow-lg border border-gray-200 p-4 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]`}
          >
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? 'bg-[#88013C] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-semibold">{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          isActive ? 'bg-white text-[#88013C]' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              {/* Profile Overview */}
              {activeSection === 'overview' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b">
                    <div className="w-24 h-24 bg-[#88013C] rounded-full flex items-center justify-center text-white text-4xl font-bold">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{user?.name || 'User'}</h2>
                      <p className="text-gray-600 flex items-center gap-2">
                        <Mail size={18} />
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Wishlist Items</p>
                      <p className="text-2xl font-bold text-gray-900">{wishlist.length}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Saved Addresses</p>
                      <p className="text-2xl font-bold text-gray-900">{addresses.length}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders */}
              {activeSection === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
                      <p className="text-gray-600 mb-6">You haven't placed any orders yet</p>
                      <Link
                        to="/"
                        className="inline-block bg-[#88013C] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6a0129] transition"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border rounded-xl p-5 hover:shadow-md transition"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-bold text-gray-900">Order #{order.id.slice(-8)}</h4>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {new Date(order.date).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })}
                                  </p>
                                </div>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                  <p className="text-xs text-gray-500">Items</p>
                                  <p className="font-semibold">{order.items.length} item(s)</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Total</p>
                                  <p className="font-bold text-[#88013C]">₹{order.total.toLocaleString()}</p>
                                </div>
                              </div>
                            </div>
                            <Link
                              to={`/orders/${order.id}`}
                              className="flex items-center justify-center gap-2 bg-[#88013C] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#6a0129] transition whitespace-nowrap"
                            >
                              View Details
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist */}
              {activeSection === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
                      <p className="text-gray-600 mb-6">Start adding items you love!</p>
                      <Link
                        to="/"
                        className="inline-block bg-[#88013C] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6a0129] transition"
                      >
                        Browse Products
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map((item) => (
                        <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                          <Link to={`/product/${item.slug}`}>
                            <img
                              src={item.image || item.images?.[0] || item.img}
                              alt={item.name}
                              className="w-full h-48 object-cover"
                            />
                          </Link>
                          <div className="p-4">
                            <Link to={`/product/${item.slug}`}>
                              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                            </Link>
                            <p className="text-lg font-bold text-[#88013C] mb-3">
                              ₹{item.price?.toLocaleString() || 'N/A'}
                            </p>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="w-full border-2 border-red-600 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition"
                            >
                              Remove from Wishlist
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Shared Products */}
              {activeSection === 'shared' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shared Products</h2>
                  {sharedProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <Share2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No shared products</h3>
                      <p className="text-gray-600 mb-6">Products you share will appear here</p>
                      <Link
                        to="/"
                        className="inline-block bg-[#88013C] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6a0129] transition"
                      >
                        Browse Products
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sharedProducts.map((item) => (
                        <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                          <Link to={`/product/${item.slug}`}>
                            <img
                              src={item.image || item.images?.[0] || item.img}
                              alt={item.name}
                              className="w-full h-48 object-cover"
                            />
                          </Link>
                          <div className="p-4">
                            <Link to={`/product/${item.slug}`}>
                              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                            </Link>
                            <p className="text-sm text-gray-500 mb-2">
                              Shared on {new Date(item.sharedAt).toLocaleDateString()}
                            </p>
                            <p className="text-lg font-bold text-[#88013C] mb-3">
                              ₹{item.price?.toLocaleString() || 'N/A'}
                            </p>
                            <button
                              onClick={() => handleRemoveSharedProduct(item.id)}
                              className="w-full border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Addresses */}
              {activeSection === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                    <Link
                      to="/checkout"
                      className="bg-[#88013C] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#6a0129] transition"
                    >
                      Add Address
                    </Link>
                  </div>
                  {addresses.length === 0 ? (
                    <div className="text-center py-12">
                      <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No addresses saved</h3>
                      <p className="text-gray-600 mb-6">Add an address for faster checkout</p>
                      <Link
                        to="/checkout"
                        className="inline-block bg-[#88013C] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6a0129] transition"
                      >
                        Add Address
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div key={address.id} className="border-2 border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-gray-900">{address.name}</span>
                                {address.isDefault && (
                                  <span className="text-xs bg-[#88013C] text-white px-2 py-1 rounded">Default</span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{address.phone}</p>
                              <p className="text-sm text-gray-600 mt-2">
                                {address.address1}, {address.address2 && `${address.address2}, `}
                                {address.city}, {address.state} - {address.pincode}
                              </p>
                              {address.landmark && (
                                <p className="text-sm text-gray-500 mt-1">Landmark: {address.landmark}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!address.isDefault && (
                              <button
                                onClick={() => handleSetDefaultAddress(address.id)}
                                className="text-sm text-[#88013C] hover:underline"
                              >
                                Set as default
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteAddress(address.id)}
                              className="text-sm text-red-600 hover:underline ml-auto"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Settings */}
              {activeSection === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold text-gray-900 mb-2">Account Information</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Name</label>
                          <p className="font-semibold text-gray-900">{user?.name || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Email</label>
                          <p className="font-semibold text-gray-900">{user?.email || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold text-gray-900 mb-4">Danger Zone</h3>
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowDeleteConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Account</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently deleted.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Delete Account
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
