import React, { useState } from 'react';
import { Page, Product } from '../types';
import ProductGrid from './ProductGrid';

interface ProductDetailPageProps {
    product: Product;
    allProducts: Product[];
    onAddToCart: (product: Product, quantity: number) => void;
    onBuyNow: (product: Product, quantity: number) => void;
    onBack: () => void;
    onNavigate: (page: Page) => void;
    onViewDetails: (product: Product) => void;
}

const CheckmarkIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);


const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, allProducts, onAddToCart, onBuyNow, onBack, onNavigate, onViewDetails }) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCartClick = () => {
        if (isAdded) return;
        onAddToCart(product, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleBuyNowClick = () => {
        onBuyNow(product, quantity);
    };

    const relatedProducts = allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 3);

    const handleCategoryNavigation = () => {
        if (product.category === 'sticker') {
            onNavigate(Page.Stickers);
        } else {
            onNavigate(Page.PhotoPrints);
        }
    };
    
    return (
        <div className="bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                <nav aria-label="Breadcrumb" className="mb-6">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li><button onClick={() => onNavigate(Page.Home)} className="hover:text-purple-600 transition-colors">Home</button></li>
                        <li><svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg></li>
                        <li className="capitalize"><button onClick={handleCategoryNavigation} className="hover:text-purple-600 transition-colors">{product.category}s</button></li>
                        <li><svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg></li>
                        <li><span className="font-medium text-gray-700 truncate max-w-[200px] sm:max-w-none">{product.name}</span></li>
                    </ol>
                </nav>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fade-in-up">
                    <div className="bg-white rounded-lg shadow-lg p-4 sticky top-24 group overflow-hidden">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-contain rounded-lg max-h-[70vh] transition-transform duration-500 ease-in-out group-hover:scale-125" />
                    </div>
                    <div className="space-y-6">
                        <span className="text-sm font-semibold uppercase tracking-widest text-purple-600 bg-purple-100 px-3 py-1 rounded-full">{product.category}</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">{product.name}</h1>
                        <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
                        <div className="text-4xl font-bold text-gray-900">
                            ${product.price}
                        </div>
                        
                        <div className="flex items-center space-x-4 pt-4 border-t">
                            <label htmlFor="quantity" className="font-semibold text-gray-700">Quantity:</label>
                            <div className="flex items-center border border-gray-300 rounded-full">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-l-full">-</button>
                                <span id="quantity" className="px-5 text-lg font-semibold w-16 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-r-full">+</button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                            <button onClick={handleAddToCartClick} disabled={isAdded} className={`w-full sm:w-auto flex-grow flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${isAdded ? 'bg-green-500 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}>
                                {isAdded ? <CheckmarkIcon className="w-6 h-6 mr-2" /> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                                <span>{isAdded ? 'Added to Cart!' : 'Add to Cart'}</span>
                            </button>
                            <button onClick={handleBuyNowClick} className="w-full sm:w-auto flex-grow flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                     <div className="mt-20 pt-12 border-t">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">You might also like</h2>
                        <ProductGrid 
                            products={relatedProducts} 
                            onAddToCart={(p) => onAddToCart(p, 1)}
                            onBuyNow={(p) => onBuyNow(p, 1)}
                            onViewDetails={onViewDetails}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProductDetailPage;