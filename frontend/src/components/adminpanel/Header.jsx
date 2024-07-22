import React from 'react';

const Header = () => {
  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logging out...');
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Experience Booking Admin</h1>
      <button 
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;