import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/solid';

function Highlights({ highlights }) {
  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Highlights</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights != null && highlights.map((highlight, index) => (
          <motion.li 
            key={index} 
            className="flex items-center bg-white rounded-lg shadow-md p-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StarIcon className="h-6 w-6 text-yellow-400 mr-3" />
            <span className="text-gray-700">{highlight}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default Highlights;