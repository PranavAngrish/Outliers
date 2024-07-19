import React from 'react';
import { motion } from 'framer-motion';

function Gallery({ gallery, name }) {
  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gallery.map((image, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={image} alt={`${name} - ${index + 1}`} className="w-full h-64 object-cover" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Gallery;