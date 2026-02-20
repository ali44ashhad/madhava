import React from 'react';
import { Toaster } from 'react-hot-toast';

const ApiErrorHandler = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#333',
                    color: '#fff',
                },
                success: {
                    style: {
                        background: 'green',
                    },
                },
                error: {
                    style: {
                        background: 'red',
                    },
                },
            }}
        />
    );
};

export default ApiErrorHandler;
