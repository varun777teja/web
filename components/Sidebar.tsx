import React from 'react';
import { User, Page } from '../types';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    isAdmin: boolean;
    onLogout: () => void;
    onNavigate: (page: Page) => void;
}

const SidebarLink: React.FC<{ icon: React.ReactElement; onClick: () => void; children: React.ReactNode }> = ({ icon, onClick, children }) => (
    <button onClick={onClick} className="flex w-full items-center space-x-4 p-3 rounded-lg text-gray-700 hover:bg-purple-100 transition-colors duration-200 text-left">
        {icon}
        <span className="font-medium">{children}</span>
    </button>
);


const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, user, isAdmin, onLogout, onNavigate }) => {
    return (
        <>
            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div 
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-xl font-bold text-gray-800">My Account</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="p-4 bg-gray-50 border-b">
                        <p className="font-semibold text-lg text-gray-900 truncate">{user?.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                    </div>
                    
                    {/* Navigation */}
                    <nav className="flex-grow p-4 space-y-2">
                        <SidebarLink onClick={() => onNavigate(Page.Home)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}>
                            Home
                        </SidebarLink>
                        <div className="pt-2">
                            <hr className="border-gray-200"/>
                        </div>
                        <SidebarLink onClick={() => onNavigate(Page.UserProfile)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}>
                            My Profile
                        </SidebarLink>
                        <SidebarLink onClick={() => onNavigate(Page.Orders)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}>
                            My Orders
                        </SidebarLink>
                         <SidebarLink onClick={() => onNavigate(Page.Addresses)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}>
                            My Addresses
                        </SidebarLink>
                        {isAdmin && (
                            <>
                                <div className="pt-2">
                                    <hr className="border-gray-200"/>
                                </div>
                                <SidebarLink onClick={() => onNavigate(Page.Admin)} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l1.414 1.414M5.222 5.222l1.414 1.414M18.364 5.222l-1.414 1.414M6.636 18.364l-1.414 1.414M12 16a4 4 0 110-8 4 4 0 010 8z" /></svg>}>
                                    Admin Panel
                                </SidebarLink>
                            </>
                        )}
                    </nav>
                    
                    {/* Footer / Logout */}
                    <div className="p-4 border-t">
                        <button 
                            onClick={onLogout}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;