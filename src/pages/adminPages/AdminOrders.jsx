import React, { useState, useEffect } from 'react';
import {
  listOrders,
  approveOrder,
  putOrderOnHold,
  cancelOrder,
  markOrderAsShipped,
  markOrderAsDelivered,
  initiateRefund,
} from './adminApi';

const STATUS_COLORS = {
  PENDING: 'bg-amber-100 text-amber-800',
  APPROVED: 'bg-blue-100 text-blue-800',
  ON_HOLD: 'bg-gray-100 text-gray-800',
  SHIPPED: 'bg-indigo-100 text-indigo-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  REFUNDED: 'bg-purple-100 text-purple-800',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [actionLoading, setActionLoading] = useState(null); // orderId being acted on
  const [modal, setModal] = useState(null); // { type: 'cancel'|'ship'|'refund', orderId, order }

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await listOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load orders');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const refreshOrders = async () => {
    try {
      const data = await listOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      // keep existing list
    }
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setError('');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleApprove = async (orderId) => {
    setActionLoading(orderId);
    setError('');
    try {
      await approveOrder(orderId);
      showSuccess('Order approved successfully');
      await refreshOrders();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to approve order');
    } finally {
      setActionLoading(null);
    }
  };

  const handleOnHold = async (orderId) => {
    setActionLoading(orderId);
    setError('');
    try {
      await putOrderOnHold(orderId);
      showSuccess('Order put on hold');
      await refreshOrders();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to put order on hold');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (orderId, reason) => {
    if (!reason?.trim()) {
      setError('Cancellation reason is required');
      return;
    }
    setActionLoading(orderId);
    setError('');
    setModal(null);
    try {
      await cancelOrder(orderId, { reason: reason.trim() });
      showSuccess('Order cancelled');
      await refreshOrders();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to cancel order');
    } finally {
      setActionLoading(null);
    }
  };

  const handleShip = async (orderId, { courier, trackingId }) => {
    if (!courier?.trim() || !trackingId?.trim()) {
      setError('Courier and tracking ID are required');
      return;
    }
    setActionLoading(orderId);
    setError('');
    setModal(null);
    try {
      await markOrderAsShipped(orderId, { courier: courier.trim(), trackingId: trackingId.trim() });
      showSuccess('Order marked as shipped');
      await refreshOrders();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to mark as shipped');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeliver = async (orderId) => {
    setActionLoading(orderId);
    setError('');
    try {
      await markOrderAsDelivered(orderId);
      showSuccess('Order marked as delivered');
      await refreshOrders();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to mark as delivered');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRefund = async (orderId, body) => {
    setActionLoading(orderId);
    setError('');
    setModal(null);
    try {
      await initiateRefund(orderId, body || {});
      showSuccess('Refund initiated');
      await refreshOrders();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to initiate refund');
    } finally {
      setActionLoading(null);
    }
  };

  const canApprove = (status) => status === 'PENDING';
  const canOnHold = (status) => ['PENDING', 'APPROVED'].includes(status);
  const canCancel = (status) => !['CANCELLED', 'DELIVERED', 'REFUNDED'].includes(status);
  const canShip = (status) => status === 'APPROVED';
  const canDeliver = (status) => status === 'SHIPPED';
  const canRefund = (status) => ['DELIVERED', 'SHIPPED'].includes(status);

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>

      {error && (
        <div className="mb-4 p-3 text-sm bg-red-50 text-red-700 border border-red-200 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 text-sm bg-green-50 text-green-700 border border-green-200 rounded-lg">
          {success}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Order #</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Items</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Payment</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => {
                  const status = (order.status || order.orderStatus || '').toUpperCase().replace(/\s/g, '_');
                  const statusClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
                  const itemCount = Array.isArray(order.items) ? order.items.length : order.itemCount ?? 0;
                  const orderNumber = order.orderNumber || order.order_number || order.id?.slice(-8) || order.id;
                  const date = order.createdAt || order.created_at || order.date;
                  const busy = actionLoading === order.id;

                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        #{typeof orderNumber === 'string' ? orderNumber : String(orderNumber)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {date ? new Date(date).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                          {status.replace(/_/g, ' ') || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{itemCount}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {order.paymentMethod || order.payment_method || '—'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex flex-wrap gap-2 justify-end">
                          {canApprove(status) && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => handleApprove(order.id)}
                              className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                              {busy ? '...' : 'Approve'}
                            </button>
                          )}
                          {canOnHold(status) && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => handleOnHold(order.id)}
                              className="px-3 py-1.5 text-xs font-medium bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
                            >
                              On Hold
                            </button>
                          )}
                          {canShip(status) && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => setModal({ type: 'ship', orderId: order.id, order })}
                              className="px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                            >
                              Ship
                            </button>
                          )}
                          {canDeliver(status) && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => handleDeliver(order.id)}
                              className="px-3 py-1.5 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                            >
                              Deliver
                            </button>
                          )}
                          {canCancel(status) && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => setModal({ type: 'cancel', orderId: order.id, order })}
                              className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          )}
                          {canRefund(status) && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => setModal({ type: 'refund', orderId: order.id, order })}
                              className="px-3 py-1.5 text-xs font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                            >
                              Refund
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cancel modal */}
      {modal?.type === 'cancel' && (
        <CancelModal
          orderId={modal.orderId}
          onConfirm={handleCancel}
          onClose={() => setModal(null)}
          loading={actionLoading === modal.orderId}
        />
      )}

      {/* Ship modal */}
      {modal?.type === 'ship' && (
        <ShipModal
          orderId={modal.orderId}
          onConfirm={handleShip}
          onClose={() => setModal(null)}
          loading={actionLoading === modal.orderId}
        />
      )}

      {/* Refund modal */}
      {modal?.type === 'refund' && (
        <RefundModal
          orderId={modal.orderId}
          onConfirm={handleRefund}
          onClose={() => setModal(null)}
          loading={actionLoading === modal.orderId}
        />
      )}
    </div>
  );
};

function CancelModal({ orderId, onConfirm, onClose, loading }) {
  const [reason, setReason] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Cancel Order</h3>
        <p className="text-sm text-gray-600 mb-4">Provide a reason for cancellation (required).</p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for cancellation"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent mb-4"
        />
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            type="button"
            disabled={loading || !reason.trim()}
            onClick={() => onConfirm(orderId, reason)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Cancelling...' : 'Cancel Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ShipModal({ orderId, onConfirm, onClose, loading }) {
  const [courier, setCourier] = useState('');
  const [trackingId, setTrackingId] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Mark as Shipped</h3>
        <p className="text-sm text-gray-600 mb-4">Enter courier and tracking details.</p>
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Courier name *</label>
            <input
              type="text"
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
              placeholder="e.g. DTDC, BlueDart"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tracking ID *</label>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Tracking number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            type="button"
            disabled={loading || !courier.trim() || !trackingId.trim()}
            onClick={() => onConfirm(orderId, { courier, trackingId })}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Mark Shipped'}
          </button>
        </div>
      </div>
    </div>
  );
}

function RefundModal({ orderId, onConfirm, onClose, loading }) {
  const [reason, setReason] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Initiate Refund</h3>
        <p className="text-sm text-gray-600 mb-4">Optional: add a reason for the refund.</p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason (optional)"
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent mb-4"
        />
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => onConfirm(orderId, reason.trim() ? { reason: reason.trim() } : {})}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Initiate Refund'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
