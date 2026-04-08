import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const MultiImageUpload = ({
    value = [],
    onChange,
    folder = 'returns',
    label = 'Images',
    className = '',
    maxImages = 3
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const validImageUrls = value.filter((url) => typeof url === 'string' && url.trim() !== '');

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        if (validImageUrls.length + files.length > maxImages) {
            toast.error(`You can only upload up to ${maxImages} images total.`);
            return;
        }

        // Validate size
        for (const file of files) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error(`Image ${file.name} is larger than 10MB`);
                return;
            }
        }

        setIsUploading(true);
        const formData = new FormData();
        files.forEach(file => {
            formData.append('images', file);
        });
        formData.append('folder', folder);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5012'}/api/v1/upload/bulk`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                onChange([...validImageUrls, ...response.data.data.imageUrls]);
                toast.success(`${files.length} images uploaded successfully`);
            } else {
                toast.error(response.data.message || 'Failed to upload images');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error uploading images');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const removeImage = (indexToRemove) => {
        const newImages = validImageUrls.filter((_, idx) => idx !== indexToRemove);
        onChange(newImages);
    };

    return (
        <div className={`w-full ${className}`}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label} <span className="text-gray-400 font-normal">(Provide at least 1 image)</span></label>}

            {/* Upload Button Area */}
            {validImageUrls.length < maxImages && (
                <div
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                    className={`border border-gray-200 rounded-lg p-6 mb-4 flex flex-col items-center justify-center transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-[#88013C]/20 focus-within:border-[#88013C]'}`}
                >
                    {isUploading ? (
                        <Loader2 className="w-6 h-6 text-[#88013C] animate-spin mb-2" />
                    ) : (
                        <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    )}
                    <span className="text-sm font-medium text-gray-600">
                        {isUploading ? 'Uploading...' : 'Click to select multiple images'}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each (Max {maxImages})</span>
                </div>
            )}

            {/* Image Previews */}
            {validImageUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                    {validImageUrls.map((url, idx) => (
                        <div key={idx} className="relative aspect-square border border-gray-200 rounded-lg overflow-hidden group">
                            <img
                                src={url}
                                alt={`Uploaded ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-1 right-1 p-0.5 bg-white/90 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden"
            />
        </div>
    );
};

export default MultiImageUpload;
