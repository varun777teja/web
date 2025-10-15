import React, { useState } from 'react';
import { Product, ShippingDetails } from '../types';

interface CheckoutPageProps {
    products: Product[];
    onCheckoutSubmit: (details: ShippingDetails) => void;
    onBack: () => void;
    onSuccess: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ products, onCheckoutSubmit, onBack, onSuccess }) => {
    const [formData, setFormData] = useState<ShippingDetails>({
        name: '', email: '', phone: '', address: '', city: '', state: '', zip: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const totalPrice = products.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            onCheckoutSubmit(formData);
            setIsLoading(false);
            setIsSubmitted(true);
            // After animation, navigate away
            setTimeout(() => onSuccess(), 2500);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
                <div className="max-w-md w-full mx-auto bg-white p-10 rounded-xl shadow-2xl text-center animate-pop-in">
                    <svg className="mx-auto h-16 w-16 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-3xl font-bold text-gray-800 mt-6">Order Placed!</h2>
                    <p className="text-gray-600 mt-2">Thank you for your purchase. Your items are on the way to you.</p>
                    <p className="text-sm text-gray-500 mt-4">You will now be redirected to your orders page.</p>
                </div>
            </div>
        );
    }
    

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="mb-6 inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Shop
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-xl shadow-xl overflow-hidden p-8">
                    {/* Product Summary */}
                    <div className="animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h2>
                        <div className="space-y-4">
                            {products.map(product => (
                                <div key={product.id} className="flex items-center space-x-4">
                                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                                    <div className="flex-grow">
                                        <h3 className="text-md font-semibold text-gray-800">{product.name}</h3>
                                        <p className="text-gray-500 text-sm">Price: ${product.price}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-between items-center text-lg font-bold pt-4 border-t mt-4">
                                <span className="text-gray-600">Total</span>
                                <span className="text-purple-600">${totalPrice}</span>
                            </div>
                        </div>
                    </div>
                    {/* Shipping Form */}
                    <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                         <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Shipping Details</h2>
                         <form onSubmit={handleSubmit} className="space-y-4">
                             <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                             <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                             <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                             <input type="text" name="address" placeholder="Street Address" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                             <div className="grid grid-cols-2 gap-4">
                                 <input type="text" name="city" placeholder="City" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                                 <input type="text" name="state" placeholder="State / Province" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                             </div>
                             <input type="text" name="zip" placeholder="ZIP / Postal Code" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                             <button type="submit" disabled={isLoading} className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition-colors duration-300 disabled:bg-purple-400 disabled:cursor-not-allowed">
                                 {isLoading ? 'Processing...' : `Place Order ($${totalPrice})`}
                             </button>
                         </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;