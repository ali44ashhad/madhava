import React from 'react';
import { Toaster } from 'react-hot-toast';

const ApiErrorHandler = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#ffffff',
                    color: '#111827',
                    border: '1px solid rgba(136, 1, 60, 0.22)',
                    borderLeft: '6px solid #88013C',
                    borderRadius: '14px',
                    padding: '12px 14px',
                    boxShadow: '0 10px 30px rgba(17, 24, 39, 0.12)',
                    maxWidth: '420px',
                },
                success: {
                    style: {
                        background: '#ffffff',
                        border: '1px solid rgba(34, 197, 94, 0.30)',
                        borderLeft: '6px solid #22c55e',
                    },
                },
                error: {
                    style: {
                        background: '#ffffff',
                        border: '1px solid rgba(239, 68, 68, 0.30)',
                        borderLeft: '6px solid #ef4444',
                    },
                },
            }}
        />
    );
};

export default ApiErrorHandler;
