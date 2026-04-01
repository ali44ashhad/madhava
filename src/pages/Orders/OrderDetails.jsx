import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Package, Calendar, MapPin, Phone, Truck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getOrderById } from '../../api/orderApi';
import ReviewModal from '../../components/ReviewModal';

const OrderDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedOrderItemIdForReview, setSelectedOrderItemIdForReview] = useState(null);
  const [selectedReviewForModal, setSelectedReviewForModal] = useState(null);

  useEffect(() => {
    if (isAuthenticated && id) {
      fetchOrder();
    } else if (!isAuthenticated) {
      navigate('/login');
    }
  }, [id, isAuthenticated, navigate]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await getOrderById(id);
      setOrder(data);
    } catch (error) {
      console.error('Error loading order:', error);
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewClick = (orderItem) => {
    setSelectedOrderItemIdForReview(orderItem.id);
    setSelectedReviewForModal(orderItem.review || null);
    setReviewModalOpen(true);
  };

  const formatAddress = (addressSnapshot) => {
    if (!addressSnapshot) return '';
    const addr = typeof addressSnapshot === 'string' ? JSON.parse(addressSnapshot) : addressSnapshot;
    return `${addr.line1}, ${addr.line2 ? addr.line2 + ', ' : ''}${addr.city}, ${addr.state} - ${addr.pincode}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eff4f7] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#88013C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'PLACED':
      case 'CONFIRMED':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const isDelivered = order?.status === 'DELIVERED';

  const getStatusIcon = (status) => {
    switch (status) {
      case 'DELIVERED':
        return <CheckCircle className="w-5 h-5" />;
      case 'SHIPPED':
        return <Truck className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff4f7] to-white pb-16 px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#88013C] mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>

        {/* Order Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Order #{order.orderNumber}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Placed on {new Date(order.placedAt || order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-semibold ${getStatusColor(
                order.status
              )}`}
            >
              {getStatusIcon(order.status)}
              {order.status}
            </div>
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Items</p>
              <p className="text-xl font-bold text-gray-900">{order.orderItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Subtotal</p>
              <p className="text-xl font-bold text-gray-900">₹{Number(order.subtotalAmount || (Number(order.totalAmount) - (Number(order.shippingCost) || 0) - (Number(order.tax) || 0) - (Number(order.codFee) || 0) + (Number(order.discountAmount) || 0))).toLocaleString()}</p>
            </div>
            {Number(order.discountAmount) > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Discount {order.couponCode ? `(${order.couponCode})` : 'Applied'}</p>
                <p className="text-xl font-bold text-green-600">-₹{Number(order.discountAmount).toLocaleString()}</p>
              </div>
            )}
            {order.paymentMethod === 'COD' && Number(order.codFee) > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-1">COD Fee</p>
                <p className="text-xl font-bold text-gray-900">₹{Number(order.codFee).toLocaleString()}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-xl font-bold text-[#88013C]">₹{Number(order.totalAmount).toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        {order.addressSnapshot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#88013C]" />
              Shipping Address
            </h2>
            <p className="text-gray-700">{formatAddress(order.addressSnapshot)}</p>
          </motion.div>
        )}

        {/* Shipping Status Info */}
        {order.shippingInfo && order.status !== 'DELIVERED' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#88013C]" />
              Tracking Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Courier Partner</p>
                <p className="font-semibold text-gray-900">{order.shippingInfo.courier}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                <p className="font-mono text-gray-900 mb-2">{order.shippingInfo.trackingId}</p>
                {order.shippingInfo.trackingLink && (
                  <a
                    href={order.shippingInfo.trackingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#88013C] hover:text-[#6a0129] transition group"
                  >
                    Track Shipment
                    <ArrowLeft className="w-4 h-4 rotate-135 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
          <div className="space-y-4">
            {order.orderItems?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-4 p-4 border rounded-xl hover:shadow-md transition"
              >
                <img
                  src={item.sku?.images?.[0]?.imageUrl || item.sku?.product?.images?.[0]?.imageUrl || 'https://via.placeholder.com/150'}
                  alt={item.skuSnapshot?.productName || 'Product Image'}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{item.skuSnapshot?.productName || 'Unknown Product'}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.quantity} × ₹{Number((Number(item.discountAmount || 0) > 0 && item.netPricePerUnit) ? item.netPricePerUnit : (item.pricePerUnit || item.skuSnapshot?.sellingPrice || 0)).toLocaleString()}
                  </p>
                  {Number(item.discountAmount || 0) > 0 && item.netPricePerUnit ? (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 text-xs">
                        <span className="line-through">
                          ₹{Number((item.pricePerUnit || item.skuSnapshot?.sellingPrice || 0) * item.quantity).toLocaleString()}
                        </span>
                      </p>
                      <p className="text-lg font-bold text-[#88013C]">
                        ₹{Number(item.netTotalPrice || (item.netPricePerUnit * item.quantity)).toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <p className="text-lg font-bold text-[#88013C]">
                      ₹{Number(item.totalPrice || (Number(item.pricePerUnit || item.skuSnapshot?.sellingPrice || 0) * item.quantity)).toLocaleString()}
                    </p>
                  )}

                  {isDelivered && (
                    <div className="mt-4 flex flex-col sm:items-start gap-2">
                      {!item.review && (
                        <button
                          type="button"
                          onClick={() => handleReviewClick(item)}
                          className="w-full sm:w-auto px-4 py-2.5 text-sm font-bold border rounded-lg transition-colors text-[#88013C] border-[#88013C] hover:bg-[#88013C] hover:text-white"
                        >
                          Write Review
                        </button>
                      )}

                      {item.review?.status === 'PENDING' && (
                        <button
                          type="button"
                          onClick={() => handleReviewClick(item)}
                          className="w-full sm:w-auto px-4 py-2.5 text-sm font-bold border rounded-lg transition-colors text-indigo-700 border-indigo-200 bg-indigo-50 hover:bg-indigo-100"
                        >
                          Edit Review
                        </button>
                      )}

                      {item.review?.status === 'APPROVED' && (
                        <span className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 border border-green-200 rounded-lg text-center">
                          Review Approved
                        </span>
                      )}

                      {item.review?.status === 'REJECTED' && (
                        <div className="w-full sm:w-auto">
                          <span className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 rounded-lg text-center">
                            Review Rejected
                          </span>
                          {item.review?.rejectionReason ? (
                            <p className="mt-1 text-[11px] text-red-600 truncate">{item.review.rejectionReason}</p>
                          ) : null}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {reviewModalOpen && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => {
            setReviewModalOpen(false);
            setSelectedOrderItemIdForReview(null);
            setSelectedReviewForModal(null);
          }}
          orderItemId={selectedOrderItemIdForReview}
          review={selectedReviewForModal}
          onSubmitted={fetchOrder}
        />
      )}
    </div>
  );
};

export default OrderDetails;
