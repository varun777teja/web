import React from 'react';
import { Product } from '../types';

interface CartPageProps {
    cartItems: Product[];
    onRemoveFromCart: (productId: number) => void;
    onStartShopping: () => void;
    onProceedToCheckout: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, onRemoveFromCart, onStartShopping, onProceedToCheckout }) => {
    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);

    return (
        <div className="container mx-auto px-4 py-12 min-h-[60vh]">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h2 className="mt-4 text-2xl font-semibold text-gray-700">Your cart is empty</h2>
                    <p className="mt-2 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
                    <button onClick={onStartShopping} className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg animate-fade-in-up">
                                <div className="flex items-center space-x-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <span className="font-bold text-lg text-gray-800">${item.price}</span>
                                    <button onClick={() => onRemoveFromCart(item.id)} className="text-red-500 hover:text-red-700 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-4">Order Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${totalPrice}</span>
                            </div>
                             <div className="flex justify-between text-gray-500">
                                <span>Shipping</span>
                                <span>$0.00</span>
                            </div>
                        </div>
                        <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t">
                            <span>Total</span>
                            <span>${totalPrice}</span>
                        </div>
                        <button onClick={onProceedToCheckout} className="mt-6 w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition-colors duration-300">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;