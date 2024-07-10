import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center py-6">
        <div className="flex items-center">
          <img src="/src/assets/outliers/logo.jpg" alt="logo" className="h-10 w-10 sm:h-12 sm:w-12 mr-2 transition-transform duration-300 hover:scale-110" />
          <span className="text-lg sm:text-xl font-bold">The Outliers Co</span>
        </div>
        <div className="hidden md:flex justify-center space-x-4 lg:space-x-8">
          {['Experiences', 'Destinations', 'About Us', 'Contact Us'].map((item, index) => (
            <a key={index} href="#" className="text-sm lg:text-base text-black hover:text-orange-600 transition-colors duration-300 hover:underline">{item}</a>
          ))}
        </div>
        <div className="hidden md:flex space-x-2 lg:space-x-4">
          <button className="bg-black text-white px-3 py-1 lg:px-4 lg:py-2 text-sm lg:text-base rounded-full hover:bg-black transition duration-300 transform hover:scale-105">Host An Experience!</button>
          <button className="bg-orange-500 text-white px-3 py-1 lg:px-4 lg:py-2 text-sm lg:text-base rounded-full hover:bg-orange-600 transition duration-300 transform hover:scale-105">Login</button>
        </div>
        <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden">
          <FaBars className="text-xl" />
        </button>
      </nav>

      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-md rounded-lg p-4 mb-4">
          {['Experiences', 'Destinations', 'About Us', 'Contact Us'].map((item, index) => (
            <a key={index} href="#" className="block py-2 text-black hover:text-orange-600 transition-colors duration-300">{item}</a>
          ))}
          <button className="w-full bg-black text-white px-4 py-2 rounded-full hover:bg-black transition duration-300 mt-2">Host An Experience!</button>
          <button className="w-full bg-pink-100 text-white px-4 py-2 rounded-full hover:bg-pink-200 transition duration-300 mt-2">Login</button>
        </div>
      )}
    </>
  );
}

export default Navbar;