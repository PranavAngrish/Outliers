import React from 'react';
import { motion } from 'framer-motion';

function Overview({ overview }) {
  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Overview</h2>
      <p className="text-gray-600 leading-relaxed">{overview}</p>
    </motion.div>
  );
}

export default Overview;