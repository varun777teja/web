import React, { useState } from 'react';
import { Order, OrderStatus } from '../../types';

interface OrderDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
    onUpdateStatus: (orderId: string, status: OrderStatus) => Promise<void>;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ isOpen, onClose, order, onUpdateStatus }) => {
    const [newStatus, setNewStatus] = useState<OrderStatus | ''>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleStatusUpdate = async () => {
        if (!order || !newStatus) return;
        setIsLoading(true);
        await onUpdateStatus(order.id, newStatus);
        setIsLoading(false);
        onClose();
    };

    if (!isOpen || !order) return null;
    
    const { shippingDetails } = order;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl animate-pop-in max-h-[90vh] flex flex-col">
                <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold text-gray-900">Order Details - #{order.id.slice(-6)}</h3>
                    <p className="text-sm text-gray-500">
                        {new Date(order.orderDate).toLocaleString()}
                    </p>
                </div>
                <div className="p-6 space-y-6 overflow-y-auto">
                    {/* Shipping Info */}
                    <div>
                        <h4 className="font-semibold text-gray-800">Shipping To</h4>
                        <address className="not-italic text-gray-600 text-sm mt-1">
                            <strong>{shippingDetails.name}</strong> ({shippingDetails.email})<br />
                            {shippingDetails.address}<br />
                            {shippingDetails.city}, {shippingDetails.state} {shippingDetails.zip}<br/>
                            {shippingDetails.phone}
                        </address>
                    </div>
                    {/* Products */}
                    <div>
                        <h4 className="font-semibold text-gray-800">Products</h4>
                        <div className="mt-2 space-y-2">
                             {order.products.map(p => (
                                <div key={p.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded-md">
                                    <div className="flex items-center space-x-3">
                                        <img src={p.imageUrl} alt={p.name} className="w-10 h-10 object-cover rounded" />
                                        <span className="text-gray-700">{p.name}</span>
                                    </div>
                                    <span className="font-semibold text-gray-800">${p.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Payment Info */}
                     <div>
                        <h4 className="font-semibold text-gray-800">Payment</h4>
                        <div className="text-sm mt-1 flex justify-between">
                            <span className="text-gray-600">Method: {order.paymentMethod}</span>
                            <span className="font-bold text-lg">Total: ${order.totalPrice}</span>
                        </div>
                    </div>
                </div>
                 {/* Status Update */}
                <div className="bg-gray-50 p-6 border-t">
                    <h4 className="font-semibold text-gray-800 mb-2">Update Status</h4>
                    <div className="flex space-x-3">
                         <select 
                            value={newStatus} 
                            onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                            className="flex-grow p-2 border border-gray-300 rounded-md"
                        >
                            <option value="" disabled>Select a status...</option>
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <button onClick={handleStatusUpdate} disabled={isLoading || !newStatus} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
                           {isLoading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 px-6 py-3 flex justify-end rounded-b-lg">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Close</button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;