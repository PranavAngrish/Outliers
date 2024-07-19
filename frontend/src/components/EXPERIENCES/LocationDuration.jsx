import React from 'react';
import { motion } from 'framer-motion';

function LocationDuration({ location, duration }) {
  return (
    <motion.div 
      className="flex flex-wrap mb-12 bg-white rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="w-full md:w-1/2 flex items-center mb-4 md:mb-0">
        <span className="text-2xl text-pink-500 mr-2" aria-hidden="true">📍</span>
        <span className="text-gray-700">{location}</span>
      </div>
      <div className="w-full md:w-1/2 flex items-center">
        <span className="text-2xl text-pink-500 mr-2" aria-hidden="true">⏱️</span>
        <span className="text-gray-700">{duration}</span>
      </div>
    </motion.div>
  );
}

export default LocationDuration;