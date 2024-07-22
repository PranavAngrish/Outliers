import React from 'react';

const GuestInput = ({ icon, totalGuests, onToggle, isActive, className }) => (
  <button
    className={`relative flex-grow text-left pl-10 pr-4 py-2 focus:outline-none hover:bg-gray-100 rounded-full transition-colors duration-200 ${isActive ? 'text-black' : 'text-gray-500'} ${className}`}
    onClick={onToggle}
  >
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
      {icon}
    </div>
    {totalGuests > 0 && (
      <span className="ml-2">
        {`${totalGuests} guest${totalGuests !== 1 ? 's' : ''}`}
      </span>
    )}
    {!totalGuests && <span className="ml-2">Add guests</span>}
  </button>
);

export default GuestInput;