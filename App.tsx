import React, { useState, useEffect } from 'react';
import { Page, Product, User, ShippingDetails, Order, OrderStatus } from './types';
import * as db from './db';

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import LoginPage from './components/LoginPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import Sidebar from './components/Sidebar';
import UserProfilePage from './components/UserProfilePage';
import OrdersPage from './components/OrdersPage';
import AddressesPage from './components/AddressesPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import AdminPage from './components/AdminPage';
import ProductDetailPage from './components/ProductDetailPage';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [previousPage, setPreviousPage] = useState<Page>(Page.Home);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<ShippingDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [allUsers, setAllUsers] = useState<Omit<User, 'password'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const isLoggedIn = currentUser !== null;
  
  // Initial data fetching
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      const [fetchedProducts, fetchedUsers, fetchedOrders] = await Promise.all([
        db.getProducts(),
        db.getAllUsers(),
        db.getOrders(),
      ]);
      setProducts(fetchedProducts);
      setAllUsers(fetchedUsers);
      setOrders(fetchedOrders);
      setIsLoading(false);
    };
    fetchInitialData();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };
  
  const handleBuyNow = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    setCurrentPage(Page.Cart);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };
  
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.email === 'nuravhost@outlook.com') {
      setIsAdmin(true);
    }
    setCurrentPage(Page.Home);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    setIsSidebarOpen(false);
    setCurrentPage(Page.Home);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  
  const handleSidebarNavigate = (page: Page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  };

  const handlePlaceOrder = async (shippingDetails: ShippingDetails, paymentMethod: string) => {
    const newOrderData = {
        products: cartItems,
        shippingDetails,
        orderDate: new Date().toISOString(),
        totalPrice: cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2),
        paymentMethod: paymentMethod,
    };
    await db.addOrder(newOrderData);
    setOrders(await db.getOrders()); // Refresh orders
    handleSaveAddress(shippingDetails);
    setCartItems([]);
    setCurrentPage(Page.OrderConfirmation);
  };
  
  const handleSaveAddress = (address: ShippingDetails) => {
    if (!addresses.some(a => a.address === address.address && a.name === address.name)) {
        setAddresses(prev => [...prev, address]);
    }
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
     if (query.trim() === '') {
        setSearchResults([]);
        if (currentPage === Page.Search) {
          setCurrentPage(Page.Home);
        }
        return;
    }
    const results = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
    setCurrentPage(Page.Search);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setPreviousPage(currentPage);
    setCurrentPage(Page.ProductDetail);
  };
  
  const handleBackFromDetail = () => {
    setSelectedProduct(null);
    setCurrentPage(previousPage);
  };

  // --- ADMIN HANDLERS ---
  const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
    await db.addProduct(productData);
    setProducts(await db.getProducts());
  };
  const handleUpdateProduct = async (product: Product) => {
    await db.updateProduct(product);
    setProducts(await db.getProducts());
  };
  const handleDeleteProduct = async (productId: number) => {
    await db.deleteProduct(productId);
    setProducts(await db.getProducts());
  };
  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    await db.updateOrderStatus(orderId, status);
    setOrders(await db.getOrders());
  };
  const handleDeleteUser = async (userId: number) => {
      await db.deleteUser(userId);
      setAllUsers(await db.getAllUsers());
  };


  const renderPage = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-[80vh]">
          <svg className="animate-spin h-10 w-10 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      );
    }
    switch (currentPage) {
      case Page.Home:
        return (
          <>
            <Hero onShopNow={() => setCurrentPage(Page.Stickers)} />
            <main className="container mx-auto px-4 py-12">
               <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
               <ProductGrid products={products} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onViewDetails={handleViewProduct} />
            </main>
          </>
        );
      case Page.Stickers:
        const stickers = products.filter(p => p.category === 'sticker');
        return (
          <main className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Stickers</h1>
            <ProductGrid products={stickers} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onViewDetails={handleViewProduct} />
          </main>
        );
      case Page.PhotoPrints:
        const photos = products.filter(p => p.category === 'photo');
        return (
          <main className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Photo Prints</h1>
            <ProductGrid products={photos} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onViewDetails={handleViewProduct} />
          </main>
        );
      case Page.Login:
        return <LoginPage onLoginSuccess={handleLoginSuccess} initialPage={Page.Login} />;
      case Page.SignUp:
        return <LoginPage onLoginSuccess={handleLoginSuccess} initialPage={Page.SignUp} />;
      case Page.Cart:
        return <CartPage cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onStartShopping={() => setCurrentPage(Page.Stickers)} onProceedToCheckout={() => setCurrentPage(Page.Checkout)} />;
      case Page.Checkout:
        if (!isLoggedIn) {
            return <LoginPage onLoginSuccess={handleLoginSuccess} initialPage={Page.Login} />;
        }
        return <CheckoutPage 
                    cartItems={cartItems} 
                    onPlaceOrder={handlePlaceOrder}
                    userAddresses={addresses} 
                />;
      case Page.UserProfile:
         if (!isLoggedIn) {
            return <LoginPage onLoginSuccess={handleLoginSuccess} initialPage={Page.Login} />;
        }
        return <UserProfilePage user={currentUser} />;
      case Page.Orders:
         if (!isLoggedIn) {
            return <LoginPage onLoginSuccess={handleLoginSuccess} initialPage={Page.Login} />;
        }
        return <OrdersPage orders={orders} onShopNow={() => setCurrentPage(Page.Stickers)} />;
      case Page.Addresses:
         if (!isLoggedIn) {
            return <LoginPage onLoginSuccess={handleLoginSuccess} initialPage={Page.Login} />;
        }
        return <AddressesPage addresses={addresses} onSaveAddress={handleSaveAddress} />;
      case Page.OrderConfirmation:
        return <OrderConfirmationPage onNavigate={() => setCurrentPage(Page.Orders)} />;
      case Page.Search:
         return (
            <main className="container mx-auto px-4 py-12 min-h-[60vh]">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">Search Results</h1>
                <p className="text-center text-gray-600 mb-8">Showing results for: <span className="font-semibold text-gray-800">"{searchQuery}"</span></p>
                {searchResults.length > 0 ? (
                    <ProductGrid products={searchResults} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onViewDetails={handleViewProduct} />
                ) : (
                    <div className="text-center py-16 bg-white rounded-lg shadow-md">
                         <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-700">No products found</h2>
                        <p className="mt-2 text-gray-500">We couldn't find any products matching your search.</p>
                    </div>
                )}
            </main>
        );
      case Page.ProductDetail:
        if (!selectedProduct) {
            setCurrentPage(previousPage);
            return null;
        }
        return <ProductDetailPage 
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onBack={handleBackFromDetail}
        />;
      case Page.Admin:
            if (!isAdmin) {
                setCurrentPage(Page.Home);
                return null;
            }
            return <AdminPage 
                products={products}
                users={allUsers}
                orders={orders}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onDeleteUser={handleDeleteUser}
            />;
      default:
        return (
             <main className="container mx-auto px-4 py-12 text-center">
                 <h1 className="text-4xl font-bold">Page Not Found</h1>
             </main>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartItems.length}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onToggleSidebar={handleToggleSidebar}
        onSearch={handleSearch}
      />
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={currentUser}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onNavigate={handleSidebarNavigate}
      />
      <div className="flex-grow">
        {renderPage()}
      </div>
      {![Page.OrderConfirmation, Page.Admin, Page.Login, Page.SignUp, Page.ProductDetail].includes(currentPage) && <Footer />}
    </div>
  );
}

export default App;