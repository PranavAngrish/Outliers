// Variants.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/solid';

function Variants({ variants }) {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Experience Variants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {variants.map((variant, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src={variant.image} 
              alt={variant.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{variant.name}</h3>
                <p className="text-gray-600 mb-4">{variant.description}</p>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-pink-500">${variant.price.toFixed(2)}</span>
                    <motion.button
                    className="flex items-center text-pink-500 font-semibold"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    >
                    View Details
                    <ArrowRightIcon className="h-5 w-5 ml-1" />
                    </motion.button>
                </div>
                <button
                    className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition duration-300"
                    onClick={() => alert(`Selected variant: ${variant.name}`)}
                >
                    Select
                </button>
                </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Variants;