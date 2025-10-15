import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onAddToCart: () => void;
    onBuyNow: () => void;
    onViewDetails: () => void;
}

const CheckmarkIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);


const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow, onViewDetails }) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCartClick = () => {
        if (isAdded) return;
        onAddToCart();
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };


    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group hover:shadow-2xl product-card animate-fade-in-up">
            <div className="relative overflow-hidden cursor-pointer" onClick={onViewDetails}>
                <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                <div 
                    className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 p-4"
                    onClick={(e) => e.stopPropagation()}
                >
                     <button 
                        onClick={handleAddToCartClick} 
                        className={`px-5 py-2.5 font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 text-sm flex items-center justify-center space-x-2 ${isAdded ? 'bg-green-500 text-white' : 'bg-white text-gray-800'}`}
                        disabled={isAdded}
                    >
                        {isAdded ? <CheckmarkIcon className="w-4 h-4" /> : null}
                        <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
                    </button>
                    <button onClick={onBuyNow} className="px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 text-sm">
                        Buy Now
                    </button>
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 truncate cursor-pointer" onClick={onViewDetails}>{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1 h-10">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-extrabold text-purple-600">${product.price}</span>
                    {/* Buttons for mobile view */}
                    <div className="flex items-center space-x-2 md:hidden">
                        <button 
                            onClick={handleAddToCartClick} 
                            className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors flex items-center space-x-1.5 ${isAdded ? 'bg-green-500 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
                            disabled={isAdded}
                        >
                            {isAdded ? <CheckmarkIcon className="w-3 h-3" /> : null}
                            <span>{isAdded ? 'Added' : 'Add'}</span>
                        </button>
                        <button onClick={onBuyNow} className="px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-full hover:bg-purple-700 transition-colors">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;