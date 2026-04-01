import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Package, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getMyOrders } from '../../api/orderApi';

const Orders = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) { // Backend statuses: PLACED, CONFIRMED, SHIPPED, DELIVERED, CANCELLED, etc.
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-800';
      case 'PLACED':
      case 'CONFIRMED':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAddress = (addressSnapshot) => {
    if (!addressSnapshot) return '';
    // addressSnapshot is stored as JSON in DB, might come as object or string?
    // Backend prisma type says Json. Api response should be object.
    const addr = typeof addressSnapshot === 'string' ? JSON.parse(addressSnapshot) : addressSnapshot;
    return `${addr.city}, ${addr.state}`;
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff4f7] to-white pb-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-[#88013C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <Package className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet</p>
            <Link
              to="/"
              className="inline-block bg-[#88013C] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6a0129] transition"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Order #{order.orderNumber}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.placedAt || order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Items</p>
                        <p className="font-semibold text-gray-900">{order.orderItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0} item(s)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                        <p className="font-bold text-[#88013C] text-lg">₹{Number(order.totalAmount).toLocaleString()}</p>
                      </div>
                    </div>

                    {order.addressSnapshot && (
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mt-0.5" />
                        <span>{formatAddress(order.addressSnapshot)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                    {order.shippingInfo?.trackingLink && order.status !== 'DELIVERED' && (
                      <a
                        href={order.shippingInfo.trackingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-white text-[#88013C] border-2 border-[#88013C] px-6 py-2.5 rounded-full font-semibold hover:bg-gray-50 transition whitespace-nowrap"
                      >
                        Track
                      </a>
                    )}
                    <Link
                      to={`/orders/${order.id}`}
                      className="flex items-center justify-center gap-2 bg-[#88013C] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6a0129] transition whitespace-nowrap"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
