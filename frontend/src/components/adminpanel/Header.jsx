import React from 'react';

const Header = () => {
  const handleLogout = () => {
    console.log('Logging out...');
    // Add your logout logic here
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-end items-center">
      <button 
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;