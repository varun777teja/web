import React, { useState } from 'react';
import { Product, ShippingDetails } from '../types';

interface CheckoutPageProps {
    cartItems: Product[];
    onPlaceOrder: (shippingDetails: ShippingDetails, paymentMethod: string) => void;
    userAddresses: ShippingDetails[];
}

const initialFormState: ShippingDetails = {
    name: '', email: '', phone: '', address: '', city: '', state: '', zip: ''
};

const PaymentMethodButton: React.FC<{ name: string; icon: React.ReactNode; isSelected: boolean; onClick: () => void;}> = ({ name, icon, isSelected, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`w-full p-4 border rounded-lg flex items-center space-x-4 transition-all duration-300 transform ${isSelected ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200 scale-105 shadow-lg' : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:scale-[1.02]'}`}
    >
        {icon}
        <span className="font-semibold text-gray-800 text-lg">{name}</span>
    </button>
);


const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, onPlaceOrder, userAddresses }) => {
    const [shippingDetails, setShippingDetails] = useState<ShippingDetails>(
        userAddresses.length > 0 ? userAddresses[0] : initialFormState
    );
    const [isAddingNew, setIsAddingNew] = useState(userAddresses.length === 0);
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAddingNew(true);
        const { name, value } = e.target;
        setShippingDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectAddress = (address: ShippingDetails) => {
        setShippingDetails(address);
        setIsAddingNew(false);
    };

    const handleAddNewAddressClick = () => {
        setShippingDetails(initialFormState);
        setIsAddingNew(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.values(shippingDetails).some(field => field === '')) {
            alert('Please fill out all shipping details.');
            return;
        }
        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }
        onPlaceOrder(shippingDetails, paymentMethod);
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12 text-center min-h-[60vh] flex items-center justify-center flex-col">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Checkout</h1>
                <p className="text-lg text-gray-600">Your cart is empty. You can't checkout without items.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Shipping and Payment */}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 animate-fade-in-up space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
                        {userAddresses.length > 0 && (
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-lg font-semibold text-gray-700">Select a saved address</h3>
                                    <button 
                                        type="button"
                                        onClick={handleAddNewAddressClick} 
                                        className="text-sm text-purple-600 font-semibold hover:underline focus:outline-none"
                                    >
                                        + Add New Address
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {userAddresses.map((addr, index) => {
                                        const isSelected = !isAddingNew && JSON.stringify(addr) === JSON.stringify(shippingDetails);
                                        return (
                                            <div 
                                                key={index}
                                                onClick={() => handleSelectAddress(addr)}
                                                className={`p-3 border rounded-lg cursor-pointer transition-all ${isSelected ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' : 'border-gray-300 hover:bg-gray-50'}`}
                                            >
                                                <p className="font-bold text-gray-800">{addr.name}</p>
                                                <p className="text-sm text-gray-600">{addr.address}, {addr.city}, {addr.state} {addr.zip}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <hr className="my-6"/>
                            </div>
                        )}
                        <div className="space-y-4">
                            <input type="text" name="name" placeholder="Full Name" value={shippingDetails.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                            <input type="email" name="email" placeholder="Email Address" value={shippingDetails.email} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                            <input type="tel" name="phone" placeholder="Phone Number" value={shippingDetails.phone} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                            <hr className="my-2"/>
                            <input type="text" name="address" placeholder="Street Address" value={shippingDetails.address} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type="text" name="city" placeholder="City" value={shippingDetails.city} onChange={handleChange} required className="md:col-span-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                                <input type="text" name="state" placeholder="State" value={shippingDetails.state} onChange={handleChange} required className="md:col-span-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                                <input type="text" name="zip" placeholder="ZIP Code" value={shippingDetails.zip} onChange={handleChange} required className="md:col-span-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>
                        <div className="space-y-4">
                            <PaymentMethodButton 
                                name="Online Pay" 
                                isSelected={paymentMethod === 'Online Pay'} 
                                onClick={() => setPaymentMethod('Online Pay')} 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M22 8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8z" /><line x1="2" y1="12" x2="22" y2="12" /></svg>} 
                            />
                            <PaymentMethodButton 
                                name="Cash on Delivery" 
                                isSelected={paymentMethod === 'Cash on Delivery'} 
                                onClick={() => setPaymentMethod('Cash on Delivery')} 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M12 12V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1" /><path d="M4 6h5" /><path d="M4 12h5" /><path d="M4 18h5" /><path d="M12 12a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2z" /></svg>}
                            />
                        </div>
                    </div>
                    <button type="submit" className="mt-8 w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition-colors duration-300 disabled:bg-purple-400 disabled:cursor-not-allowed">
                        Place Order
                    </button>
                </form>
                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-md p-8 h-fit animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Order</h2>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                    <div>
                                        <p className="font-semibold text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: 1</p>
                                    </div>
                                </div>
                                <span className="font-semibold text-gray-800">${item.price}</span>
                            </div>
                        ))}
                    </div>
                     <div className="mt-6 pt-6 border-t space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${totalPrice}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>$0.00</span>
                        </div>
                        <div className="flex justify-between font-bold text-xl mt-2">
                            <span>Total</span>
                            <span>${totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;