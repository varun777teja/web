import React, { useEffect } from 'react';

interface OrderConfirmationPageProps {
    onNavigate: () => void;
}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ onNavigate }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onNavigate();
        }, 4000); // Navigate after 4 seconds

        return () => clearTimeout(timer);
    }, [onNavigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
            <div className="w-32 h-32 mb-6">
                <svg className="w-full h-full" viewBox="0 0 52 52">
                    <circle 
                        className="stroke-current text-green-100" 
                        cx="26" 
                        cy="26" 
                        r="25" 
                        fill="none" 
                        strokeWidth="2"
                    />
                    <path 
                        className="stroke-current text-green-500" 
                        fill="none" 
                        strokeWidth="4" 
                        strokeLinecap="round" 
                        strokeDasharray="80" 
                        strokeDashoffset="80"
                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        style={{ animation: 'stroke-draw 1s ease-out 0.5s forwards' }}
                    />
                </svg>
            </div>
            <h1 
                className="text-4xl font-extrabold text-gray-800 mb-3"
                style={{ animation: 'fade-in-text 0.8s ease-out 1s forwards', opacity: 0 }}
            >
                Order Placed Successfully!
            </h1>
            <p 
                className="text-lg text-gray-600"
                style={{ animation: 'fade-in-text 0.8s ease-out 1.2s forwards', opacity: 0 }}
            >
                Thank you for your purchase. We're getting your order ready.
            </p>
            <p 
                className="text-sm text-gray-500 mt-8"
                style={{ animation: 'fade-in-text 0.8s ease-out 1.4s forwards', opacity: 0 }}
            >
                You will be redirected to your orders shortly...
            </p>
        </div>
    );
};

export default OrderConfirmationPage;