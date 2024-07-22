import React from 'react';

const Sidebar = ({ setActiveMenu, activeMenu }) => {
  const menuItems = ['Dashboard', 'Vendors', 'Experiences', 'Users', 'Refunds', 'Settings'];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4 text-2xl font-bold">Admin Panel</div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item}
            className={`block w-full text-left p-4 hover:bg-gray-700 ${
              activeMenu === item ? 'bg-gray-700' : ''
            }`}
            onClick={() => setActiveMenu(item)}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;