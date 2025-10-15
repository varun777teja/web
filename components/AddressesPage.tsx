import React, { useState } from 'react';
import { ShippingDetails } from '../types';

interface AddressesPageProps {
    addresses: ShippingDetails[];
    onSaveAddress: (address: ShippingDetails) => void;
}

const initialFormState: ShippingDetails = {
    name: '', email: '', phone: '', address: '', city: '', state: '', zip: ''
};

const AddressesPage: React.FC<AddressesPageProps> = ({ addresses, onSaveAddress }) => {
    const [formData, setFormData] = useState<ShippingDetails>(initialFormState);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSaveAddress(formData);
        setFormData(initialFormState);
        setIsFormVisible(false);
    };

    return (
        <div className="container mx-auto px-4 py-12 min-h-[60vh]">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">My Addresses</h1>
            
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Saved Addresses</h2>
                        <button 
                            onClick={() => setIsFormVisible(!isFormVisible)}
                            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors text-sm"
                        >
                            {isFormVisible ? 'Cancel' : 'Add New Address'}
                        </button>
                    </div>

                    {isFormVisible && (
                         <form onSubmit={handleSubmit} className="space-y-4 p-4 mb-6 border rounded-lg bg-gray-50 animate-fade-in-up">
                             <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                             <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                             <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                             <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                             <div className="grid grid-cols-2 gap-4">
                                 <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                                 <input type="text" name="state" placeholder="State / Province" value={formData.state} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                             </div>
                             <input type="text" name="zip" placeholder="ZIP / Postal Code" value={formData.zip} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                             <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
                                 Save Address
                             </button>
                         </form>
                    )}

                    {addresses.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <p>You have no saved addresses.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {addresses.map((addr, index) => (
                                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                                    <address className="not-italic text-gray-700">
                                        <strong>{addr.name}</strong><br />
                                        {addr.address}<br />
                                        {addr.city}, {addr.state} {addr.zip}<br/>
                                        <span className="text-gray-500">{addr.email} | {addr.phone}</span>
                                    </address>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddressesPage;