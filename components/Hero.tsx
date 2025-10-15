import React from 'react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
    return (
        <div 
            className="relative h-[60vh] min-h-[500px] bg-cover bg-center flex items-center justify-center text-white" 
            style={{ backgroundImage: `url('https://image2url.com/images/1760460965232-644bc710-3a48-4c94-87b6-daa40c5796d7.png')` }}
        >
            <div className="absolute inset-0 bg-black/40"></div>
            
            <div className="relative z-10 text-center p-4 flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-4">
                    Capture Your Moments, Create Your Style.
                </h1>
                <p className="max-w-2xl text-lg md:text-xl text-gray-200 drop-shadow-sm mb-8">
                    Turn your favorite photos into custom stickers and high-quality prints. Let your memories stick and shine.
                </p>

                <button 
                    onClick={onShopNow}
                    className="px-10 py-4 text-lg font-bold text-white uppercase tracking-wider rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300"
                >
                    Shop Stickers
                </button>
            </div>
        </div>
    );
};

export default Hero;