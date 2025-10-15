import React from 'react';
import { Order, OrderStatus } from '../types';

interface OrdersPageProps {
    orders: Order[];
    onShopNow: () => void;
}

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};


const OrdersPage: React.FC<OrdersPageProps> = ({ orders, onShopNow }) => {
    return (
        <div className="container mx-auto px-4 py-12 min-h-[60vh]">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">My Orders</h1>
            {orders.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h2 className="mt-4 text-2xl font-semibold text-gray-700">No orders yet</h2>
                    <p className="mt-2 text-gray-500">You haven't placed any orders. Let's change that!</p>
                    <button onClick={onShopNow} className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-6 max-w-4xl mx-auto">
                    {orders.map((order, index) => (
                        <div key={order.id} className="bg-white rounded-lg shadow-md p-6 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s`}}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Products and Order Details */}
                                <div>
                                    <div className="flex justify-between items-baseline border-b pb-3 mb-3">
                                        <h3 className="font-bold text-lg text-gray-800">Order #{order.id.slice(-6)}</h3>
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        {order.products.map(product => (
                                             <div key={product.id} className="flex items-center space-x-3 text-sm">
                                                <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                                                <span className="flex-grow text-gray-700">{product.name}</span>
                                                <span className="font-semibold text-gray-800">${product.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                     <div className="flex justify-between font-extrabold text-lg mt-3 pt-3 border-t">
                                        <span>Total</span>
                                        <span className="text-purple-600">${order.totalPrice}</span>
                                    </div>
                                </div>
                                {/* Shipping & Payment Info */}
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-800 border-b pb-2 mb-2">Shipping to:</h4>
                                        <address className="not-italic text-gray-600 text-sm">
                                            <strong>{order.shippingDetails.name}</strong><br />
                                            {order.shippingDetails.address}<br />
                                            {order.shippingDetails.city}, {order.shippingDetails.state} {order.shippingDetails.zip}
                                        </address>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 border-b pb-2 mb-2">Payment Method:</h4>
                                        <p className="text-gray-600 text-sm">{order.paymentMethod}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;