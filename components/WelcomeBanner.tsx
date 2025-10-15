
import React from 'react';

interface WelcomeBannerProps {
    onViewHomepage: () => void;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ onViewHomepage }) => {
    return (
        <div 
            className="relative bg-cover bg-center py-20 md:py-32"
            style={{ backgroundImage: `url('https://i.imgur.com/v1uS1V9.png')` }}
        >
            <div className="container mx-auto px-4 text-center text-gray-800">
                <h2 className="text-5xl md:text-7xl font-bold text-purple-800 drop-shadow-sm">Welcome!</h2>
                <p className="mt-4 text-lg md:text-xl tracking-wide font-medium">THANK YOU FOR VISITING OUR SITE!</p>
                <button 
                    onClick={onViewHomepage}
                    className="mt-8 px-8 py-3 bg-white text-purple-700 font-semibold rounded-full shadow-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 border-2 border-purple-200"
                >
                    Visit the homepage
                </button>
            </div>
        </div>
    );
}

export default WelcomeBanner;
   