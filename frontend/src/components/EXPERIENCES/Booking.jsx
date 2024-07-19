// Booking.jsx
import React from 'react';
import { motion } from 'framer-motion';

function Booking({ price, taxes, fees }) {
  const safePrice = Number(price) || 0;
  const safeTaxes = Number(taxes) || 0;
  const safeFees = Number(fees) || 0;
  const total = safePrice + safeTaxes + safeFees;

  return (
    <motion.div
      className="sticky top-4 bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Book This Experience</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Base Price:</span>
          <span>${safePrice.toFixed(2)}</span>
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