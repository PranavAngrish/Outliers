import React from 'react';

function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-8 md:py-16 relative z-0">
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 animate-fadeIn">
          Rajasthan - A Cultural Heaven
        </h1>
      </div>
      <div className="w-full md:w-1/2 relative">
        <div className="bg-yellow-200 rounded-full h-40 w-40 sm:h-48 sm:w-48 md:h-64 md:w-64 lg:h-80 lg:w-80 absolute right-0 top-0 animate-pulse"></div>
        <img 
          src="/src/assets/outliers/main.png" 
          alt="Traveler" 
          className="relative z-0 max-w-full md:max-w-md mx-auto md:ml-auto transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}

export default HeroSection;