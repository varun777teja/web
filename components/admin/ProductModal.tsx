import React, { useState, useEffect } from 'react';
import { Product } from '../../types';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (productData: Omit<Product, 'id'>) => Promise<void>;
    product: Product | null;
}

const emptyProduct: Omit<Product, 'id'> = {
    name: '',
    price: '',
    imageUrl: '',
    category: 'sticker',
    description: ''
};

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, product }) => {
    const [formData, setFormData] = useState(emptyProduct);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData(emptyProduct);
        }
    }, [product, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error("Failed to save product:", error);
            // Here you could set an error state to display to the user
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg animate-pop-in">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900">{product ? 'Edit Product' : 'Add New Product'}</h3>
                        <div className="mt-4 space-y-4">
                             <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
                            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows={3} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                            <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required step="0.01" className="w-full p-2 border border-gray-300 rounded-md" />
                                <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md">
                                    <option value="sticker">Sticker</option>
                                    <option value="photo">Photo Print</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>
                        <button type="submit" disabled={isLoading} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-300">
                            {isLoading ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;