import React from 'react';
import { motion } from 'framer-motion';

const GuestMenu = ({ guests, onGuestChange }) => (
  <motion.div
    className="absolute z-10 mt-2 w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 left-0 right-0 mx-auto"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    {Object.entries(guests).map(([type, count]) => (
      <div key={type} className="flex justify-between items-center mb-6">
        <div>
          <p className="font-semibold capitalize">{type}</p>
          {type === 'adults' && <p className="text-sm text-gray-500">Ages 13 or above</p>}
          {type === 'children' && <p className="text-sm text-gray-500">Ages 2-12</p>}
          {type === 'infants' && <p className="text-sm text-gray-500">Under 2</p>}
        </div>
        <div className="flex items-center">
          <button
            className={`w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 ${count === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'}`}
            onClick={() => onGuestChange(type, -1)}
            disabled={count === 0}
          >
            -
          </button>
          <span className="mx-4 w-6 text-center">{count}</span>
          <button
            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:border-gray-500"
            onClick={() => onGuestChange(type, 1)}
          >
            +
          </button>
        </div>
      </div>
    ))}
  </motion.div>
);

export default GuestMenu;