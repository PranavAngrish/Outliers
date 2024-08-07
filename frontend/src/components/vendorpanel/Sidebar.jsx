import React from 'react';

const Sidebar = ({ setActiveMenu, activeMenu }) => {
  const menuItems = ['Dashboard', 'Experiences', 'Refunds'];

  return (
    <div className="w-64 bg-black text-white h-screen">
      <div className="p-6 text-2xl font-bold">Vendor Panel</div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item}
            className={`block w-full text-left px-6 py-3 hover:bg-gray-800 transition-colors duration-200 ${
              activeMenu === item ? 'bg-gray-800 border-l-4 border-white' : ''
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