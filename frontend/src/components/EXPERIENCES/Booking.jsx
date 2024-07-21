// Booking.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

function Booking({ price, taxes, fees }) {
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);

  const safePrice = Number(price) || 0;
  const safeTaxes = Number(taxes) || 0;
  const safeFees = Number(fees) || 0;
  const total = (safePrice * (guests.adults + guests.children)) + safeTaxes + safeFees;

  const handleGuestChange = (type, change) => {
    setGuests(prevGuests => ({
      ...prevGuests,
      [type]: Math.max(0, prevGuests[type] + change)
    }));
  };

  const totalGuests = guests.adults + guests.children + guests.infants;

  return (
    <motion.div
      className="sticky top-4 bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Book This Experience</h2>
      
      <div className="mb-4 relative">
        <button
          className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-pink-500"
          onClick={() => setIsGuestMenuOpen(!isGuestMenuOpen)}
        >
          <span>{totalGuests} Guest{totalGuests !== 1 ? 's' : ''}</span>
          {isGuestMenuOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
        </button>
        
        <AnimatePresence>
          {isGuestMenuOpen && (
            <motion.div
              className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg p-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {Object.entries(guests).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-semibold capitalize">{type}</p>
                    {type === 'adults' && <p className="text-sm text-gray-500">Ages 13 or above</p>}
                    {type === 'children' && <p className="text-sm text-gray-500">Ages 2-12</p>}
                    {type === 'infants' && <p className="text-sm text-gray-500">Under 2</p>}
                  </div>
                  <div className="flex items-center">
                    <button
                      className={`w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 ${count === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'}`}
                      onClick={() => handleGuestChange(type, -1)}
                      disabled={count === 0}
                    >
                      -
                    </button>
                    <span className="mx-4 w-6 text-center">{count}</span>
                    <button
                      className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:border-gray-500"
                      onClick={() => handleGuestChange(type, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Base Price:</span>
          <span>${safePrice.toFixed(2)} x {guests.adults + guests.children}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes:</span>
          <span>${safeTaxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Fees:</span>
          <span>${safeFees.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-2">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <button
        className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition duration-300"
        onClick={() => alert('Booking functionality to be implemented')}
      >
        Book Now
      </button>
    </motion.div>
  );
}

export default Booking;