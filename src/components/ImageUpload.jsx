import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ImageUpload = ({
    value,
    onChange,
    folder = 'returns',
    label = null,
    className = ''
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const validImageUrl = typeof value === 'string' ? value.trim() : '';

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            toast.error('Image size must be less than 10MB');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('folder', folder);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5012'}/api/v1/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                onChange(response.data.data.imageUrl);
            } else {
                toast.error(response.data.message || 'Failed to upload image');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error uploading image');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const clearImage = () => {
        onChange('');
    };

    return (
        <div className={`w-full ${className}`}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

            {!validImageUrl ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-[#88013C]/20 focus-within:border-[#88013C] transition-colors cursor-pointer hover:bg-gray-50 bg-white"
                >
                    <div className="flex items-center text-gray-500">
                        {isUploading ? (
                            <Loader2 className="w-5 h-5 mr-3 text-[#88013C] animate-spin" />
                        ) : (
                            <Upload className="w-5 h-5 mr-3 text-gray-400" />
                        )}
                        <span className="text-sm">
                            {isUploading ? 'Uploading...' : 'Click to select image file'}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="relative inline-block border border-gray-200 rounded-lg overflow-hidden group">
                    <img
                        src={validImageUrl}
                        alt="Uploaded Preview"
                        className="h-24 w-auto object-cover"
                    />
                    <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-1 right-1 p-0.5 bg-white/90 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
        </div>
    );
};

export default ImageUpload;
