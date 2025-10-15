
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
            <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <button onClick={onAddToCart} className="px-6 py-2 bg-white text-gray-800 font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1 h-10">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-extrabold text-purple-600">${product.price}</span>
                     <button onClick={onAddToCart} className="md:hidden px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-full hover:bg-purple-700 transition-colors">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
   