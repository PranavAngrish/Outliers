import React from 'react';
import { motion } from 'framer-motion';
import { InformationCircleIcon } from '@heroicons/react/outline';

function KnowBeforeYouGo({ items }) {
  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Know Before You Go</h2>
      <ul className="space-y-4">
        {items != null && items.map((item, index) => (
          <motion.li 
            key={index} 
            className="flex items-start bg-white rounded-lg shadow-md p-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <InformationCircleIcon className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default KnowBeforeYouGo;