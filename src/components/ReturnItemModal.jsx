import React, { useState } from 'react';
import { X, Upload, Info } from 'lucide-react';

const RETURN_REASONS = [
    'Size/Fit Issue',
    'Different from description/image',
    'Defective/Damaged item',
    'Quality not as expected',
    'Received wrong item',
    'Changed my mind',
    'Other'
];

const ReturnItemModal = ({ isOpen, onClose, onSubmit, item, loading }) => {
    const [reason, setReason] = useState('');
    const [images, setImages] = useState(['']);
    const [note, setNote] = useState('');
    const [error, setError] = useState('');

    if (!isOpen || !item) return null;

    const handleImageChange = (index, value) => {
        const newImages = [...images];
        newImages[index] = value;
        setImages(newImages);
    };

    const addImageField = () => {
        if (images.length < 3) {
            setImages([...images, '']);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!reason) {
            setError('Please select a return reason');
            return;
        }

        const validImages = images.filter(img => img.trim() !== '');
        if (validImages.length === 0) {
            setError('Please provide at least one image URL showing the item condition');
            return;
        }

        try {
            // Basic URL validation
            validImages.forEach(img => new URL(img));
        } catch (err) {
            setError('Please provide valid image URLs (must start with http:// or https://)');
            return;
        }

        onSubmit({
            reason,
            images: validImages,
            note: note.trim()
        });
    };

    const skuSnapshot = item.skuSnapshot || {};
    const productName = skuSnapshot.productName || 'Product';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-semibold text-gray-900">Request Return</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        {skuSnapshot.imageUrl ? (
                            <img src={skuSnapshot.imageUrl} alt={productName} className="w-16 h-16 object-cover rounded border" />
                        ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center text-gray-400">
                                No Img
                            </div>
                        )}
                        <div>
                            <h3 className="font-semibold text-gray-800 line-clamp-2">{productName}</h3>
                            <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                        </div>
                    </div>

                    <div className="mb-4 flex items-start gap-2 text-sm text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p>Return requests must be reviewed by our team. Please provide clear images of the item to expedite the process.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Return *</label>
                            <select
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#88013C]/20 focus:border-[#88013C] transition-colors"
                            >
                                <option value="">-- Select a reason --</option>
                                {RETURN_REASONS.map((r, i) => (
                                    <option key={i} value={r}>{r}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs * <span className="text-gray-400 font-normal">(Provide at least 1 image)</span></label>
                            <div className="space-y-3">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative">
                                        <Upload className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="url"
                                            value={img}
                                            onChange={(e) => handleImageChange(idx, e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#88013C]/20 focus:border-[#88013C] transition-colors"
                                        />
                                    </div>
                                ))}
                            </div>
                            {images.length < 3 && (
                                <button
                                    type="button"
                                    onClick={addImageField}
                                    className="mt-2 text-sm text-[#88013C] font-medium hover:underline"
                                >
                                    + Add another image URL
                                </button>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes <span className="text-gray-400 font-normal">(Optional)</span></label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="E.g., The color is completely different from the website..."
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#88013C]/20 focus:border-[#88013C] transition-colors resize-none"
                            ></textarea>
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-0 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full sm:w-auto px-6 py-2.5 sm:py-2 text-sm font-bold sm:font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors sm:mr-3 border border-gray-200 sm:border-transparent"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto px-6 py-2.5 sm:py-2 text-sm font-bold sm:font-medium text-white bg-[#88013C] rounded-lg hover:bg-[#6a0129] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-sm"
                            >
                                {loading ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReturnItemModal;
