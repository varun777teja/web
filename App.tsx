import React, { useState, useEffect } from 'react';
import { Page, Product, User } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import WelcomeBanner from './components/WelcomeBanner';
import LoginPage from './components/LoginPage';

const ALL_PRODUCTS: Product[] = [
    { id: 1, name: 'Adventure Sticker Pack', price: '12.99', imageUrl: 'https://picsum.photos/seed/sticker1/400/400', category: 'sticker', description: 'Explore the world with these vibrant travel-themed stickers.' },
    { id: 2, name: 'Glossy Photo Prints (4x6)', price: '19.50', imageUrl: 'https://picsum.photos/seed/photo1/400/400', category: 'photo', description: 'Bring your memories to life with our premium glossy prints.' },
    { id: 3, name: 'Holographic Alien Stickers', price: '15.00', imageUrl: 'https://picsum.photos/seed/sticker2/400/400', category: 'sticker', description: 'Out of this world! Shiny, holographic stickers for your gear.' },
    { id: 4, name: 'Minimalist Sticker Sheet', price: '9.99', imageUrl: 'https://picsum.photos/seed/sticker3/400/400', category: 'sticker', description: 'For the modern aesthetic. Clean lines, simple designs.' },
    { id: 5, name: 'Matte Finish Photo Set (5x7)', price: '24.99', imageUrl: 'https://picsum.photos/seed/photo2/400/400', category: 'photo', description: 'A sophisticated matte finish for your favorite moments.' },
    { id: 6, name: 'Cute Animal Sticker Pack', price: '13.50', imageUrl: 'https://picsum.photos/seed/sticker4/400/400', category: 'sticker', description: 'An adorable collection of your favorite furry friends.' },
    { id: 7, name: 'Polaroid Style Prints', price: '18.00', imageUrl: 'https://picsum.photos/seed/photo3/400/400', category: 'photo', description: 'Classic instant-film look for a touch of nostalgia.' },
    { id: 8, 'name': 'Synthwave Sunset Stickers', price: '14.00', imageUrl: 'https://picsum.photos/seed/sticker5/400/400', category: 'sticker', description: 'Retro 80s vibes for your laptop, car, or water bottle.' },
];

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
    const [cartCount, setCartCount] = useState<number>(0);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(ALL_PRODUCTS);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const isLoggedIn = currentUser !== null;

    useEffect(() => {
        if (currentPage === Page.Home) {
            setFilteredProducts(ALL_PRODUCTS);
        } else if (currentPage === Page.Stickers) {
            setFilteredProducts(ALL_PRODUCTS.filter(p => p.category === 'sticker'));
        } else if (currentPage === Page.PhotoPrints) {
            setFilteredProducts(ALL_PRODUCTS.filter(p => p.category === 'photo'));
        }
    }, [currentPage]);

    const handleAddToCart = () => {
        setCartCount(prevCount => prevCount + 1);
    };

    const handleLoginSuccess = (user: User) => {
        setCurrentUser(user);
        setCurrentPage(Page.Home);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setCurrentPage(Page.Home);
    };

    const renderPage = () => {
        switch (currentPage) {
            case Page.Home:
                return (
                    <>
                        <Hero onShopNow={() => setCurrentPage(Page.Stickers)} />
                        <div className="container mx-auto px-4 py-16">
                            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Featured Products</h2>
                            <p className="text-center text-gray-500 mb-12">Handpicked for you, from our best collections.</p>
                            <ProductGrid products={ALL_PRODUCTS.slice(0, 6)} onAddToCart={handleAddToCart} />
                        </div>
                        <WelcomeBanner onViewHomepage={() => setCurrentPage(Page.Home)} />
                    </>
                );
            case Page.Stickers:
            case Page.PhotoPrints:
                return (
                    <div className="container mx-auto px-4 py-16">
                        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4 capitalize">{currentPage.toLowerCase().replace('_', ' ')}</h1>
                        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
                            {currentPage === Page.Stickers 
                                ? "Discover our unique collection of high-quality vinyl stickers. Perfect for personalizing your life." 
                                : "Turn your digital photos into beautiful, tangible memories with our premium printing services."
                            }
                        </p>
                        <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
                    </div>
                );
            case Page.Login:
            case Page.SignUp:
                return <LoginPage onLoginSuccess={handleLoginSuccess} initialPage={currentPage} />;
            default:
                return <Hero onShopNow={() => setCurrentPage(Page.Stickers)} />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                cartCount={cartCount}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onLogout={handleLogout}
            />
            <main>
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};

export default App;