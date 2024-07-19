import React from 'react';
import { motion } from 'framer-motion';

function CancellationPolicy({ policy }) {
  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Cancellation Policy</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 leading-relaxed">{policy}</p>
      </div>
    </motion.div>
  );
}

export default CancellationPolicy;