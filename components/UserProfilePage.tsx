import React from 'react';
import { User } from '../types';

interface UserProfilePageProps {
    user: User | null;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ user }) => {
    if (!user) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <p>You must be logged in to view this page.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 min-h-[60vh]">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">My Profile</h1>
            <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 animate-fade-in-up">
                <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0 h-24 w-24 rounded-full bg-purple-100 flex items-center justify-center">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{user.name}</div>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>
                <div className="mt-8 border-t pt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Full Name</label>
                        <p className="text-lg text-gray-800">{user.name}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Email Address</label>
                        <p className="text-lg text-gray-800">{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;