import React from 'react';
import { motion } from 'framer-motion';

function Itinerary({ itinerary }) {
  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Itinerary</h2>
      <ol className="space-y-4">
        {itinerary.map((item, index) => (
          <motion.li 
            key={index} 
            className="flex items-center bg-white rounded-lg shadow-md p-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-pink-500 font-bold mr-4">{index + 1}.</span>
            <span className="text-gray-700">{item}</span>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}

export default Itinerary;