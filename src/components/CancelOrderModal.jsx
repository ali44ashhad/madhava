import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const predefinedReasons = [
    "Ordered by mistake",
    "Found a better price elsewhere",
    "Shipping takes too long",
    "Need to change shipping address",
    "Need to modify order contents",
    "Other"
];

const CancelOrderModal = ({ isOpen, onClose, onSubmit, order, loading }) => {
    const [selectedReason, setSelectedReason] = useState('');
    const [customReason, setCustomReason] = useState('');
    const [error, setError] = useState('');

    if (!isOpen || !order) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!selectedReason) {
            setError('Please select a reason for cancellation');
            return;
        }

        const finalReason = selectedReason === 'Other' ? customReason.trim() : selectedReason;

        if (selectedReason === 'Other' && !finalReason) {
            setError('Please specify your reason');
            return;
        }

        onSubmit(finalReason);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-red-50/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 text-red-600 rounded-full">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Cancel Order</h3>
                                <p className="text-sm tracking-wide text-gray-500 font-medium">Order #{order.orderNumber}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
                            disabled={loading}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 overflow-y-auto">
                        <form id="cancel-form" onSubmit={handleSubmit} className="space-y-5">

                            <div className="bg-orange-50 text-orange-800 p-4 rounded-xl border border-orange-100 flex gap-3 text-sm">
                                <AlertTriangle size={18} className="flex-shrink-0 mt-0.5 text-orange-500" />
                                <p className="font-medium leading-relaxed">
                                    Are you sure you want to cancel this order? This action cannot be undone.
                                    Any prepaid amount will be refunded according to our policy.
                                </p>
                            </div>

                            <div className="space-y-3 pt-2">
                                <label className="block text-sm font-bold text-gray-700">
                                    Reason for Cancellation <span className="text-red-500">*</span>
                                </label>

                                <div className="grid gap-2">
                                    {predefinedReasons.map((reason) => (
                                        <label
                                            key={reason}
                                            className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${selectedReason === reason
                                                    ? 'border-[#88013C] bg-pink-50/30 ring-1 ring-[#88013C]'
                                                    : 'border-gray-200 hover:border-[#88013C]/50 hover:bg-gray-50'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="cancelReason"
                                                value={reason}
                                                className="w-4 h-4 text-[#88013C] focus:ring-[#88013C] border-gray-300"
                                                onChange={(e) => setSelectedReason(e.target.value)}
                                                checked={selectedReason === reason}
                                                disabled={loading}
                                            />
                                            <span className="ml-3 text-sm font-medium text-gray-700">{reason}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {selectedReason === 'Other' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="space-y-1.5"
                                >
                                    <label className="block text-sm font-bold text-gray-700">
                                        Please provide more details
                                    </label>
                                    <textarea
                                        value={customReason}
                                        onChange={(e) => setCustomReason(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#88013C]/20 focus:border-[#88013C] outline-none transition-all resize-none font-medium"
                                        rows="3"
                                        placeholder="Tell us why you're cancelling..."
                                        disabled={loading}
                                    />
                                </motion.div>
                            )}

                            {error && (
                                <p className="text-red-500 text-sm font-medium flex items-center gap-1.5">
                                    <AlertTriangle size={14} />
                                    {error}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 mt-auto">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-6 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50"
                        >
                            Keep Order
                        </button>
                        <button
                            type="submit"
                            form="cancel-form"
                            disabled={loading}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[120px] shadow-sm shadow-red-200"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Cancel Order'
                            )}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CancelOrderModal;
