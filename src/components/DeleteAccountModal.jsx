import React, { useState } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DeleteAccountModal = ({ isOpen, onClose, onConfirm, loading }) => {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleClose = () => {
    if (loading) return;
    setAcknowledged(false);
    onClose();
  };

  const handleConfirm = () => {
    if (!acknowledged || loading) return;
    onConfirm();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-red-50/50">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 bg-red-100 text-red-600 rounded-full flex-shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-gray-900">Delete account</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors flex-shrink-0"
              disabled={loading}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-5">
            <div className="bg-red-50 text-red-800 p-4 rounded-xl border border-red-100 text-sm leading-relaxed">
              <p className="font-medium mb-2">Before you continue:</p>
              <ul className="list-disc list-inside space-y-1 text-red-700/90">
                <li>Your profile, cart, and saved addresses will be removed.</li>
                <li>Order history stays on record for fulfillment and support.</li>
                <li>You cannot delete while orders are active, returns are open, or refunds are pending.</li>
                <li>You may sign up again later with the same email or phone.</li>
              </ul>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                disabled={loading}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-[#88013C] focus:ring-[#88013C] cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                I understand that my account will be permanently deleted and I will be signed out.
              </span>
            </label>
          </div>

          <div className="p-6 pt-0 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end border-t border-gray-100 bg-gray-50/50">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!acknowledged || loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
              {loading ? 'Deleting…' : 'Delete my account'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteAccountModal;
