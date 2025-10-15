import React, { useState, useEffect } from 'react';
import { Page, User } from '../types';
import { findUserByEmail, addUser } from '../db';

interface LoginPageProps {
    onLoginSuccess: (user: User) => void;
    initialPage: Page.Login | Page.SignUp;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, initialPage }) => {
    const [mode, setMode] = useState<'signIn' | 'signUp' | 'success'>(initialPage === Page.Login ? 'signIn' : 'signUp');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [signInEmail, setSignInEmail] = useState('demo@example.com');
    const [signInPassword, setSignInPassword] = useState('password');
    const [signUpName, setSignUpName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');


    useEffect(() => {
        setMode(initialPage === Page.Login ? 'signIn' : 'signUp');
        setError(null);
    }, [initialPage]);

    const handleSignInSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const user = await findUserByEmail(signInEmail);
            if (user && user.password === signInPassword) {
                // In a real app, you would not get the password back from the DB like this
                const { password, ...userToReturn } = user;
                onLoginSuccess(userToReturn);
            } else {
                setError('Invalid email or password.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (signUpPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const existingUser = await findUserByEmail(signUpEmail);
            if (existingUser) {
                setError('An account with this email already exists.');
                setIsLoading(false);
                return;
            }
            await addUser({ name: signUpName, email: signUpEmail, password: signUpPassword });
            setMode('success');
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const switchMode = (newMode: 'signIn' | 'signUp') => {
        setMode(newMode);
        setError(null);
    };

    const getTranslateXClass = () => {
        if (mode === 'signUp') return '-translate-x-full';
        if (mode === 'success') return '-translate-x-2/3-screen'; // Custom value, needs config
        return 'translate-x-0';
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
            style={{ backgroundImage: `url('https://image2url.com/images/1760460965232-644bc710-3a48-4c94-87b6-daa40c5796d7.png')` }}
        >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl z-10 overflow-hidden">
                <div className={`flex transition-transform duration-700 ease-in-out ${
                    mode === 'signUp' ? '-translate-x-full' : 
                    mode === 'success' ? '-translate-x-[200%]' : 'translate-x-0'
                }`}>
                    {/* Sign In Form */}
                    <div className="w-full flex-shrink-0 p-10">
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-center">
                                    <img src="https://i.postimg.cc/rs3wfDtL/475168094-641069881607490-749670085403667826-n.png" alt="Polaroid Pioneer Logo" className="h-16 w-auto" />
                                </div>
                                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                    Sign in to your account
                                </h2>
                                <p className="mt-2 text-center text-sm text-gray-600">
                                    Or{' '}
                                    <button onClick={() => switchMode('signUp')} className="font-medium text-purple-600 hover:text-purple-500 focus:outline-none">
                                        create a new account
                                    </button>
                                </p>
                            </div>
                            <form className="space-y-6" onSubmit={handleSignInSubmit}>
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div>
                                        <label htmlFor="email-address-signin" className="sr-only">Email address</label>
                                        <input id="email-address-signin" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Email address" value={signInEmail} onChange={e => setSignInEmail(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="password-signin" className="sr-only">Password</label>
                                        <input id="password-signin" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Password" value={signInPassword} onChange={e => setSignInPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-purple-600 hover:text-purple-500">Forgot your password?</a>
                                    </div>
                                </div>
                                {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                                <div>
                                    <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed">
                                        {isLoading ? 'Signing in...' : 'Sign in'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sign Up Form */}
                    <div className="w-full flex-shrink-0 p-10">
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-center">
                                    <img src="https://i.postimg.cc/rs3wfDtL/475168094-641069881607490-749670085403667826-n.png" alt="Polaroid Pioneer Logo" className="h-16 w-auto" />
                                </div>
                                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                    Create a new account
                                </h2>
                                <p className="mt-2 text-center text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <button onClick={() => switchMode('signIn')} className="font-medium text-purple-600 hover:text-purple-500 focus:outline-none">
                                        Sign in
                                    </button>
                                </p>
                            </div>
                            <form className="space-y-6" onSubmit={handleSignUpSubmit}>
                                <div className="rounded-md shadow-sm -space-y-px">
                                     <div>
                                        <label htmlFor="full-name-signup" className="sr-only">Full Name</label>
                                        <input id="full-name-signup" name="name" type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Full Name" value={signUpName} onChange={e => setSignUpName(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="email-address-signup" className="sr-only">Email address</label>
                                        <input id="email-address-signup" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Email address" value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="password-signup" className="sr-only">Password</label>
                                        <input id="password-signup" name="password" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Password" value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} />
                                    </div>
                                </div>
                                {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                                <div>
                                    <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed">
                                        {isLoading ? 'Creating account...' : 'Sign up'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                     {/* Success Screen */}
                    <div className="w-full flex-shrink-0 p-10">
                        <div className="space-y-6 text-center">
                            <div>
                                <svg className="mx-auto h-12 w-12 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                    Account Created!
                                </h2>
                                <p className="mt-2 text-center text-sm text-gray-600">
                                    A welcome email has been sent to <span className="font-medium text-gray-800">{signUpEmail}</span>.
                                </p>
                            </div>
                            <div>
                                <button 
                                    onClick={() => switchMode('signIn')} 
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                                >
                                    Proceed to Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;