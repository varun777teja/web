import React, { useState } from 'react';
import { Product, User, Order, OrderStatus } from '../types';
import ProductModal from './admin/ProductModal';
import OrderDetailsModal from './admin/OrderDetailsModal';
import ConfirmationModal from './admin/ConfirmationModal';

interface AdminPageProps {
    products: Product[];
    users: Omit<User, 'password'>[];
    orders: Order[];
    onAddProduct: (productData: Omit<Product, 'id'>) => Promise<void>;
    onUpdateProduct: (product: Product) => Promise<void>;
    onDeleteProduct: (productId: number) => Promise<void>;
    onUpdateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
    onDeleteUser: (userId: number) => Promise<void>;
}

type AdminTab = 'products' | 'orders' | 'users';

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
        case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const AdminPage: React.FC<AdminPageProps> = (props) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('products');
    
    // Modal states
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<{ type: 'product' | 'user', id: number, name: string } | null>(null);

    const openProductModal = (product: Product | null = null) => {
        setEditingProduct(product);
        setIsProductModalOpen(true);
    };

    const openOrderModal = (order: Order) => {
        setViewingOrder(order);
        setIsOrderModalOpen(true);
    };

    const openConfirmModal = (type: 'product' | 'user', id: number, name: string) => {
        setConfirmAction({ type, id, name });
        setIsConfirmModalOpen(true);
    };

    const handleConfirm = async () => {
        if (!confirmAction) return;
        if (confirmAction.type === 'product') {
            await props.onDeleteProduct(confirmAction.id);
        } else if (confirmAction.type === 'user') {
            await props.onDeleteUser(confirmAction.id);
        }
        setIsConfirmModalOpen(false);
        setConfirmAction(null);
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'products': return (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <button onClick={() => openProductModal()} className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                            <span>Add Product</span>
                        </button>
                    </div>
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {props.products.map(p => (
                                    <tr key={p.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-md object-cover" src={p.imageUrl} alt={p.name} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{p.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${p.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{p.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            <button onClick={() => openProductModal(p)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                            <button onClick={() => openConfirmModal('product', p.id, p.name)} className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
            case 'orders': return (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                         <tbody className="bg-white divide-y divide-gray-200">
                             {props.orders.map(o => (
                                <tr key={o.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">#{o.id.slice(-6)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{o.shippingDetails.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(o.orderDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${o.totalPrice}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(o.status)}`}>
                                            {o.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => openOrderModal(o)} className="text-indigo-600 hover:text-indigo-900">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
            case 'users': return (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                         <tbody className="bg-white divide-y divide-gray-200">
                             {props.users.map(u => (
                                <tr key={u.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => openConfirmModal('user', u.id, u.name)} className="text-red-600 hover:text-red-900 disabled:text-gray-400 disabled:cursor-not-allowed" disabled={u.email === 'nuravhost@outlook.com'}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
                </div>
            </header>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {(['products', 'orders', 'users'] as AdminTab[]).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`${
                                    activeTab === tab
                                    ? 'border-purple-500 text-purple-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
                {renderContent()}
            </main>
            
            {/* Modals */}
            <ProductModal 
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                onSave={async (data) => {
                    if (editingProduct) {
                        await props.onUpdateProduct({ ...editingProduct, ...data });
                    } else {
                        await props.onAddProduct(data);
                    }
                }}
                product={editingProduct}
            />
            <OrderDetailsModal
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
                order={viewingOrder}
                onUpdateStatus={props.onUpdateOrderStatus}
            />
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirm}
                title={`Delete ${confirmAction?.type}`}
                message={`Are you sure you want to delete ${confirmAction?.name}? This action cannot be undone.`}
            />
        </div>
    );
};

export default AdminPage;