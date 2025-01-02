import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/solid';

function Inclusions({ inclusions }) {
  console.log("The inclusions are ", inclusions);
  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Inclusions</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inclusions.map((inclusion, index) => (
          <motion.li 
            key={index} 
            className="flex items-center bg-white rounded-lg shadow-md p-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3" />
            <span className="text-gray-700">{inclusion}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default Inclusions;