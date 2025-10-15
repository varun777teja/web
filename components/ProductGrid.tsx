import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
    onBuyNow: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, onBuyNow }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {products.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={() => onAddToCart(product)} 
                    onBuyNow={() => onBuyNow(product)} 
                />
            ))}
        </div>
    );
};

export default ProductGrid;