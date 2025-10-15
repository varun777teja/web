import React from 'react';
import { Page, User } from '../types';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    cartCount: number;
    isLoggedIn: boolean;
    currentUser: User | null;
    onLogout: () => void;
}

const NavLink: React.FC<{ page: Page; currentPage: Page; setCurrentPage: (page: Page) => void; children: React.ReactNode }> = ({ page, currentPage, setCurrentPage, children }) => {
    const isActive = currentPage === page;
    return (
        <button
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-300 relative ${isActive ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
        >
            {children}
            {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-purple-600 rounded-full"></span>}
        </button>
    );
};


const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, cartCount, isLoggedIn, currentUser, onLogout }) => {
    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage(Page.Home)}>
                         <img src="https://i.postimg.cc/rs3wfDtL/475168094-641069881607490-749670085403667826-n.png" alt="Polaroid Pioneer Logo" className="h-10 w-10 object-contain" />
                        <span className="text-2xl font-bold text-gray-800">Polaroid<span className="text-purple-600">Pioneer</span></span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-2">
                        <NavLink page={Page.Home} currentPage={currentPage} setCurrentPage={setCurrentPage}>Home</NavLink>
                        <NavLink page={Page.Stickers} currentPage={currentPage} setCurrentPage={setCurrentPage}>Stickers</NavLink>
                        <NavLink page={Page.PhotoPrints} currentPage={currentPage} setCurrentPage={setCurrentPage}>Photo Prints</NavLink>
                    </nav>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                             <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">Welcome, {currentUser?.name}!</span>
                                <button
                                    onClick={onLogout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setCurrentPage(Page.Login)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
                            >
                                Login
                            </button>
                        )}
                        <div className="relative cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                         {/* Mobile menu button could be added here */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;