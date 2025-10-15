import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    cartCount: number;
    isLoggedIn: boolean;
    onLogout: () => void;
    onToggleSidebar: () => void;
    onSearch: (query: string) => void;
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


const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, cartCount, isLoggedIn, onLogout, onToggleSidebar, onSearch }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    }
    
    const toggleSearch = () => {
        const newVisibility = !isSearchVisible;
        setIsSearchVisible(newVisibility);
        if (!newVisibility) {
            setSearchQuery('');
            onSearch(''); // Clear search results when closing
        }
    };

    useEffect(() => {
        if (isSearchVisible) {
            searchInputRef.current?.focus();
        }
    }, [isSearchVisible]);


    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage(Page.Home)}>
                         <img src="https://i.postimg.cc/rs3wfDtL/475168094-641069881607490-749670085403667826-n.png" alt="Polaroid Pioneer Logo" className="h-10 w-10 object-contain" />
                        <span className="text-2xl font-bold text-gray-800">Polaroid<span className="text-purple-600">Pioneer</span></span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-2">
                        <NavLink page={Page.Home} currentPage={currentPage} setCurrentPage={setCurrentPage}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </NavLink>
                        <NavLink page={Page.Stickers} currentPage={currentPage} setCurrentPage={setCurrentPage}>Stickers</NavLink>
                        <NavLink page={Page.PhotoPrints} currentPage={currentPage} setCurrentPage={setCurrentPage}>Photo Prints</NavLink>
                    </nav>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button onClick={toggleSearch} className="text-gray-600 hover:text-purple-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {isLoggedIn ? (
                            <button onClick={onToggleSidebar} className="text-gray-600 hover:text-purple-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentPage(Page.Login)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
                            >
                                Login
                            </button>
                        )}
                        <button onClick={() => setCurrentPage(Page.Cart)} className="relative cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
             {/* EXPANDABLE SEARCH BAR */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden border-t ${isSearchVisible ? 'max-h-40 py-4 border-gray-200' : 'max-h-0 py-0 border-transparent'}`}>
                <div className="container mx-auto px-4">
                    <div className="relative max-w-2xl mx-auto">
                         <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search for stickers, photo prints..."
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;