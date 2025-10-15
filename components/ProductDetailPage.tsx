import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailPageProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onBuyNow: (product: Product) => void;
    onBack: () => void;
}

const CheckmarkIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);


const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onAddToCart, onBuyNow, onBack }) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCartClick = () => {
        if (isAdded) return;
        onAddToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleBuyNowClick = () => {
        onBuyNow(product);
    }
    
    return (
        <main className="container mx-auto px-4 py-12">
            <div className="mb-8">
                 <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 font-semibold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to products</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start animate-fade-in-up">
                {/* Image */}
                <div className="bg-white rounded-lg shadow-lg p-4 sticky top-24">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-contain rounded-lg max-h-[70vh]" />
                </div>

                {/* Details */}
                <div className="space-y-6">
                    <span className="text-sm font-semibold uppercase tracking-widest text-purple-600 bg-purple-100 px-3 py-1 rounded-full">{product.category}</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">{product.name}</h1>
                    <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
                    <div className="text-4xl font-bold text-gray-900">
                        ${product.price}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4 border-t">
                        <button 
                            onClick={handleAddToCartClick}
                            disabled={isAdded}
                            className={`w-full sm:w-auto flex-grow flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${isAdded ? 'bg-green-500 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
                        >
                             {isAdded ? <CheckmarkIcon className="w-6 h-6 mr-2" /> : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                             )}
                            <span>{isAdded ? 'Added to Cart!' : 'Add to Cart'}</span>
                        </button>
                         <button 
                            onClick={handleBuyNowClick}
                            className="w-full sm:w-auto flex-grow flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetailPage;