import React, { useState, useEffect } from 'react';
import { Page, Product, User, ShippingDetails, Order } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import WelcomeBanner from './components/WelcomeBanner';
import LoginPage from './components/LoginPage';
import CheckoutPage from './components/CheckoutPage';
import CartPage from './components/CartPage';
import Sidebar from './components/Sidebar';
import UserProfilePage from './components/UserProfilePage';
import OrdersPage from './components/OrdersPage';
import AddressesPage from './components/AddressesPage';


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
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(ALL_PRODUCTS);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [orderHistory, setOrderHistory] = useState<Order[]>([]);
    const [userAddresses, setUserAddresses] = useState<ShippingDetails[]>([]);

    const isLoggedIn = currentUser !== null;
    const cartCount = cartItems.length;

    // Load data from localStorage on initial render
    useEffect(() => {
        const loadFromStorage = (key: string, setter: Function) => {
            try {
                const storedValue = localStorage.getItem(key);
                if (storedValue) {
                    setter(JSON.parse(storedValue));
                }
            } catch (error) {
                console.error(`Failed to parse ${key} from localStorage`, error);
            }
        };
        loadFromStorage('polaroidPioneerCart', setCartItems);
        loadFromStorage('polaroidPioneerOrders', setOrderHistory);
        loadFromStorage('polaroidPioneerAddresses', setUserAddresses);
    }, []);

    // Save data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('polaroidPioneerCart', JSON.stringify(cartItems));
    }, [cartItems]);
     useEffect(() => {
        localStorage.setItem('polaroidPioneerOrders', JSON.stringify(orderHistory));
    }, [orderHistory]);
     useEffect(() => {
        localStorage.setItem('polaroidPioneerAddresses', JSON.stringify(userAddresses));
    }, [userAddresses]);


    useEffect(() => {
        if (currentPage === Page.Home) {
            setFilteredProducts(ALL_PRODUCTS);
        } else if (currentPage === Page.Stickers) {
            setFilteredProducts(ALL_PRODUCTS.filter(p => p.category === 'sticker'));
        } else if (currentPage === Page.PhotoPrints) {
            setFilteredProducts(ALL_PRODUCTS.filter(p => p.category === 'photo'));
        }
    }, [currentPage]);

    const handleAddToCart = (product: Product) => {
        setCartItems(prevItems => [...prevItems, product]);
    };

    const handleRemoveFromCart = (productId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const handleBuyNow = (product: Product) => {
        setCheckoutItems([product]); // Store the product for checkout
        if (isLoggedIn) {
            setCurrentPage(Page.Checkout);
        } else {
            setCurrentPage(Page.Login);
        }
    };
    
    const handleProceedToCheckout = () => {
        if (cartItems.length > 0) {
            setCheckoutItems(cartItems);
            if (isLoggedIn) {
                setCurrentPage(Page.Checkout);
            } else {
                setCurrentPage(Page.Login);
            }
        }
    };

    const handleCheckoutSubmit = (details: ShippingDetails) => {
        if (checkoutItems.length > 0) {
            const totalPrice = checkoutItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
            const newOrder: Order = {
                id: new Date().getTime().toString(),
                products: checkoutItems,
                shippingDetails: details,
                orderDate: new Date().toISOString(),
                totalPrice: totalPrice,
            };
            setOrderHistory(prev => [newOrder, ...prev]);

            // Remove checked out items from the cart
            const checkedOutIds = new Set(checkoutItems.map(item => item.id));
            setCartItems(prev => prev.filter(item => !checkedOutIds.has(item.id)));
        }
        setCheckoutItems([]);
        // Page navigation is handled inside CheckoutPage after submission animation
    };

    const handleSaveAddress = (address: ShippingDetails) => {
        setUserAddresses(prev => [...prev, address]);
    };

    const handleLoginSuccess = (user: User) => {
        setCurrentUser(user);
        if (checkoutItems.length > 0) {
            setCurrentPage(Page.Checkout);
        } else {
            setCurrentPage(Page.Home);
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setIsSidebarOpen(false); // Close sidebar on logout
        setCurrentPage(Page.Home);
    };
    
    const navigateAndCloseSidebar = (page: Page) => {
        setCurrentPage(page);
        setIsSidebarOpen(false);
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
                            <ProductGrid products={ALL_PRODUCTS.slice(0, 6)} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
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
                        <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
                    </div>
                );
            case Page.Login:
            case Page.SignUp:
                return <LoginPage onLoginSuccess={handleLoginSuccess} initialPage={currentPage} />;
            case Page.Cart:
                return <CartPage cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onStartShopping={() => setCurrentPage(Page.Home)} onProceedToCheckout={handleProceedToCheckout} />;
            case Page.Checkout:
                 if (!isLoggedIn) {
                    return <LoginPage onLoginSuccess={handleLoginSuccess} initialPage={Page.Login} />;
                }
                return checkoutItems.length > 0 ? (
                    <CheckoutPage
                        products={checkoutItems}
                        onCheckoutSubmit={handleCheckoutSubmit}
                        onBack={() => setCurrentPage(Page.Stickers)}
                        onSuccess={() => setCurrentPage(Page.Orders)}
                    />
                ) : (
                    <div className="text-center py-20">
                        <p>No product selected for checkout.</p>
                         <button onClick={() => setCurrentPage(Page.Stickers)} className="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700">
                            Continue Shopping
                        </button>
                    </div>
                );
            case Page.UserProfile:
                return <UserProfilePage user={currentUser} />;
            case Page.Orders:
                return <OrdersPage orders={orderHistory} onShopNow={() => setCurrentPage(Page.Home)} />;
            case Page.Addresses:
                return <AddressesPage addresses={userAddresses} onSaveAddress={handleSaveAddress} />;
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
                onLogout={handleLogout}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
             <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)}
                user={currentUser}
                onLogout={handleLogout}
                onNavigate={navigateAndCloseSidebar}
            />
            <main>
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};

export default App;