import React, { useState, useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import VendorSignup from './VendorSignup';

const LandingPage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleListWithUsClick = () => {
    setShowSignup(true);
  };

  const handleSignInClick = () => {
    navigate('/auth');
  };

  const handleCloseForm = () => {
    setShowSignup(false);
  };

  const handleOutsideClick = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowSignup(false);
    }
  };

  useEffect(() => {
    if (showSignup) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showSignup]);

  return (
    <div className="min-h-screen relative">
      <header className="fixed top-0 left-0 right-0 px-4 sm:px-6 py-4 flex justify-between items-center bg-black bg-opacity-50 backdrop-blur-sm z-20">
        <a href="/" className="flex items-center group no-underline">
          <img 
            src="/src/assets/outliers/logo.jpg" 
            alt="The Outliers Co Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 mr-2 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-white font-bold text-xl sm:text-3xl px-2 py-1 rounded transition-colors duration-300 group-hover:text-pink-500">
            The Outliers Co
          </span>
        </a>
        <button 
          onClick={handleSignInClick}
          className="bg-pink-500 text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full hover:bg-pink-600 transition duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
        >
          Login
        </button>
      </header>

      <main className="relative min-h-screen">
        <img 
          src="https://static.independent.co.uk/2024/01/05/15/newFile-6.jpg" 
          alt="Background" 
          className="w-full h-full object-cover absolute inset-0"
        />
        {!showSignup ? (
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
            <div className="bg-gray-800 bg-opacity-70 p-6 sm:p-8 rounded-lg text-center max-w-xl sm:max-w-2xl transition-all duration-300 hover:bg-opacity-80 hover:scale-105">
              <h1 className="text-white text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6">
                Simple and streamlined booking management technology for optimizing your experiences and events.
              </h1>
              <button 
                onClick={handleListWithUsClick}
                className="bg-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-pink-600 transition duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              >
                List With Us!
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 overflow-y-auto bg-black bg-opacity-50 z-30">
            <div ref={formRef} className="relative w-full max-w-2xl">
              <button
                onClick={handleCloseForm}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-300 z-50"
              >
                <FaTimes className="w-6 h-6" />
              </button>
              <VendorSignup />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LandingPage;