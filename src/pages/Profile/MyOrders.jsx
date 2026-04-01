import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { Package, Clock, CheckCircle, Truck, XCircle, AlertCircle, RotateCcw } from 'lucide-react';
import ReturnItemModal from '../../components/ReturnItemModal';
import CancelOrderModal from '../../components/CancelOrderModal';
import { requestReturn, cancelOrder } from '../../api/orderApi';
import toast from 'react-hot-toast';
import ReviewModal from '../../components/ReviewModal';
const formatDate = (dateString) => {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }) + ' \u2022 ' + d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getReturnWindowState = (order) => {
  const isDelivered = order?.status === 'DELIVERED';
  const deliveredAt = order?.deliveredAt ? new Date(order.deliveredAt) : null;
  const hasDeliveredAt = Boolean(deliveredAt) && !Number.isNaN(deliveredAt?.getTime());

  if (!isDelivered || !hasDeliveredAt) {
    return {
      isDelivered,
      hasDeliveredAt,
      isReturnWindowExpired: false,
    };
  }

  const returnWindowEnd = new Date(deliveredAt);
  returnWindowEnd.setDate(returnWindowEnd.getDate() + 7);

  return {
    isDelivered,
    hasDeliveredAt,
    isReturnWindowExpired: new Date() > returnWindowEnd,
  };
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [selectedReturnItem, setSelectedReturnItem] = useState(null);
  const [returnLoading, setReturnLoading] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedOrderToCancel, setSelectedOrderToCancel] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedOrderItemIdForReview, setSelectedOrderItemIdForReview] = useState(null);
  const [selectedReviewForModal, setSelectedReviewForModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/api/v1/store/orders');
      if (response.data?.success) {
        setOrders(response.data.data);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      setError(err.message || 'Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  const handleReturnClick = (item, order) => {
    setSelectedReturnItem({ ...item, order });
    setReturnModalOpen(true);
  };

  const handleReturnSubmit = async (payload) => {
    try {
      setReturnLoading(true);
      await requestReturn(selectedReturnItem.id, payload);
      setReturnModalOpen(false);
      setSelectedReturnItem(null);
      // Refresh orders list to show updated status
      await fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to request return');
    } finally {
      setReturnLoading(false);
    }
  };

  const handleCancelClick = (order) => {
    setSelectedOrderToCancel(order);
    setCancelModalOpen(true);
  };

  const handleCancelSubmit = async (reason) => {
    try {
      setCancelLoading(true);
      await cancelOrder(selectedOrderToCancel.id, reason);
      setCancelModalOpen(false);
      setSelectedOrderToCancel(null);
      toast.success('Order cancelled successfully');
      await fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to cancel order');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleReviewClick = (orderItem) => {
    setSelectedOrderItemIdForReview(orderItem.id);
    setSelectedReviewForModal(orderItem.review || null);
    setReviewModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'PAID': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'APPROVED': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      case 'SHIPPED': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'DELIVERED': return 'text-green-600 bg-green-50 border-green-200';
      case 'CANCELLED': return 'text-red-600 bg-red-50 border-red-200';
      case 'ON_HOLD': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING':
      case 'ON_HOLD': return <Clock size={16} />;
      case 'PAID':
      case 'APPROVED': return <CheckCircle size={16} />;
      case 'SHIPPED': return <Truck size={16} />;
      case 'DELIVERED': return <CheckCircle size={16} />;
      case 'CANCELLED': return <XCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#88013C]"></div>
        <p className="mt-4 text-gray-500 font-medium tracking-wide">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
        <AlertCircle size={48} className="text-red-400 mb-4" />
        <p className="text-red-500 font-medium text-lg mb-2">{error}</p>
        <button
          onClick={fetchOrders}
          className="px-6 py-2 bg-[#88013C] text-white rounded-full font-semibold hover:bg-[#6a0129] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
        <div className="bg-gray-50 p-6 rounded-full mb-6">
          <Package size={64} className="text-gray-300" strokeWidth={1} />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h3>
        <p className="text-gray-500 text-center max-w-md mb-8">
          Looks like you haven't placed any orders yet. Start exploring our beautiful collections.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-8 py-3 bg-[#88013C] text-white rounded-full font-bold shadow-md hover:bg-[#6a0129] hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Package className="text-[#88013C]" />
          My Orders
        </h2>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
        </span>
      </div>

      <div className="grid gap-6">
        {orders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage).map((order) => {
          const { isDelivered, hasDeliveredAt, isReturnWindowExpired } = getReturnWindowState(order);

          return (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Order Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center py-4 justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Order Number</p>
                <p className="text-lg font-bold text-gray-800">#{order.orderNumber}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Placed on {formatDate(order.placedAt || order.createdAt)}
                </p>
                {isDelivered && hasDeliveredAt && (
                  <p className="text-sm text-green-700 mt-1 font-medium">
                    Delivered on {formatDate(order.deliveredAt)}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:items-end gap-3 sm:gap-2">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wide w-fit self-start sm:self-end ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {order.paymentMethod === 'COD' && Number(order.codFee) > 0 && (
                    <div className="mb-1">
                      COD Fee: <span className="text-gray-900 font-bold">₹{Number(order.codFee).toFixed(2)}</span>
                    </div>
                  )}
                  Total: <span className="text-gray-900 font-bold text-lg">₹{Number(order.totalAmount).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="space-y-4">
                {order.orderItems?.map((item, idx) => {
                  const snapshot = item.skuSnapshot || {};
                  const productName = snapshot.productName || 'Unknown Product';
                  const skuCode = snapshot.skuCode || 'Unknown SKU';
                  const price = Number(item.pricePerUnit).toFixed(2);
                  const hasNet = Number(item.discountAmount || 0) > 0 && item.netPricePerUnit && item.netTotalPrice;
                  const netUnit = hasNet ? Number(item.netPricePerUnit).toFixed(2) : null;
                  const imageUrl = snapshot.imageUrl;

                  return (
                    <div key={item.id || idx} className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex items-start sm:items-center gap-4 flex-1">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                          {imageUrl || item.sku?.images?.[0]?.imageUrl || item.sku?.product?.images?.[0]?.imageUrl ? (
                            <img 
                              src={imageUrl || item.sku?.images?.[0]?.imageUrl || item.sku?.product?.images?.[0]?.imageUrl} 
                              alt={productName} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Package size={24} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-bold text-gray-800 truncate mb-1">{productName}</h4>
                          <p className="text-sm text-gray-500 font-medium">SKU: {skuCode}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <p className="text-sm text-gray-600 font-semibold bg-gray-50 px-2 py-0.5 rounded">
                              {item.quantity} × ₹{hasNet ? netUnit : price}
                            </p>
                            {hasNet ? (
                              <div className="flex items-center gap-2">
                                <p className="text-xs text-gray-500 line-through">₹{Number(item.pricePerUnit * item.quantity).toFixed(2)}</p>
                                <p className="text-sm font-bold text-gray-900">₹{Number(item.netTotalPrice).toFixed(2)}</p>
                              </div>
                            ) : (
                              <p className="text-sm font-bold text-gray-900">₹{Number(item.totalPrice || (Number(item.pricePerUnit) * item.quantity)).toFixed(2)}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Return Logic */}
                      <div className="w-full sm:w-auto mt-2 sm:mt-0 flex justify-end">
                        <div className="flex flex-col sm:items-end gap-2">
                          {isDelivered && !item.return && (
                            <button
                              onClick={() => handleReturnClick(item, order)}
                              disabled={isReturnWindowExpired}
                              className={`flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 sm:px-3 sm:py-1.5 text-sm font-bold border rounded-lg transition-colors ${
                                isReturnWindowExpired
                                  ? 'text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed'
                                  : 'text-[#88013C] border-[#88013C] hover:bg-[#88013C] hover:text-white'
                              }`}
                            >
                              <RotateCcw size={16} />
                              {isReturnWindowExpired ? 'Return Window Closed' : 'Return Item'}
                            </button>
                          )}

                          {item.return && (
                            <span className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 sm:px-3 sm:py-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-200 rounded-lg">
                              Return {item.return.status}
                            </span>
                          )}

                          {hasDeliveredAt && (
                            <>
                              {!item.review && (
                                <button
                                  onClick={() => handleReviewClick(item)}
                                  className="w-full sm:w-auto px-4 py-2.5 sm:px-3 sm:py-1.5 text-sm font-bold border rounded-lg transition-colors text-[#88013C] border-[#88013C] hover:bg-[#88013C] hover:text-white"
                                >
                                  Write Review
                                </button>
                              )}

                              {item.review?.status === 'PENDING' && (
                                <button
                                  onClick={() => handleReviewClick(item)}
                                  className="w-full sm:w-auto px-4 py-2.5 sm:px-3 sm:py-1.5 text-sm font-bold border rounded-lg transition-colors text-indigo-700 border-indigo-200 bg-indigo-50 hover:bg-indigo-100"
                                >
                                  Edit Review
                                </button>
                              )}

                              {item.review?.status === 'APPROVED' && (
                                <span className="w-full sm:w-auto px-4 py-2.5 sm:px-3 sm:py-1.5 text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 border border-green-200 rounded-lg text-center">
                                  Review Approved
                                </span>
                              )}

                              {item.review?.status === 'REJECTED' && (
                                <div className="w-full sm:w-auto text-right">
                                  <span className="block px-4 py-2.5 sm:px-3 sm:py-1.5 text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 rounded-lg text-center">
                                    Review Rejected
                                  </span>
                                  {item.review?.rejectionReason ? (
                                    <p className="mt-1 text-[11px] text-red-600 max-w-[220px] truncate">
                                      {item.review.rejectionReason}
                                    </p>
                                  ) : null}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Footer - Details (Payment & Tracking) */}
            <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <div className="text-sm">
                  <span className="text-gray-500 font-medium mr-2">Payment Method:</span>
                  <span className="font-semibold text-gray-800 bg-white border px-2 py-1 rounded inline-block">{order.paymentMethod}</span>
                </div>

                {order.shippingInfo && order.status !== 'DELIVERED' && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="text-sm flex items-center flex-wrap gap-1">
                      <span className="text-gray-500 font-medium">Tracking ID:</span>
                      <span className="font-semibold text-[#88013C]">{order.shippingInfo.trackingId}</span>
                      {order.shippingInfo.courier && <span className="text-gray-500">({order.shippingInfo.courier})</span>}
                    </div>
                    {order.shippingInfo.trackingLink && (
                      <a
                        href={order.shippingInfo.trackingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-white text-[#88013C] border border-[#88013C] px-3 py-1 rounded text-xs font-semibold hover:bg-gray-50 transition whitespace-nowrap"
                      >
                        Track
                      </a>
                    )}
                  </div>
                )}
              </div>

              {(order.status === 'PLACED' || order.status === 'CONFIRMED') && (
                <button
                  onClick={() => handleCancelClick(order)}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors whitespace-nowrap"
                >
                  Cancel Order
                </button>
              )}
            </div>
            </div>
          );
        })}
      </div>

      {orders.length > ordersPerPage && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-[#88013C] hover:border-[#88013C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex items-center gap-1 mx-2">
            {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${currentPage === i + 1
                  ? 'bg-[#88013C] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(orders.length / ordersPerPage)))}
            disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-[#88013C] hover:border-[#88013C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {selectedReturnItem && (
        <ReturnItemModal
          isOpen={returnModalOpen}
          onClose={() => {
            setReturnModalOpen(false);
            setSelectedReturnItem(null);
          }}
          onSubmit={handleReturnSubmit}
          item={selectedReturnItem}
          loading={returnLoading}
        />
      )}

      {selectedOrderToCancel && (
        <CancelOrderModal
          isOpen={cancelModalOpen}
          onClose={() => {
            setCancelModalOpen(false);
            setSelectedOrderToCancel(null);
          }}
          onSubmit={handleCancelSubmit}
          order={selectedOrderToCancel}
          loading={cancelLoading}
        />
      )}

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
          onSubmitted={fetchOrders}
        />
      )}
    </div>
  );
};

export default MyOrders;
