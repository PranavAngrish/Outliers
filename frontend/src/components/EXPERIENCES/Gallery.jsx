// Gallery.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Gallery({ gallery, name }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (!gallery || gallery.length === 0) {
    return null;
  }

  const toggleShowAllPhotos = () => setShowAllPhotos(!showAllPhotos);

  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Mobile view: Show only the first image */}
        <motion.div
          className="md:hidden overflow-hidden rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img 
            src={gallery[0]} 
            alt={`${name} - 1`} 
            className="w-full h-64 object-cover"
          />
        </motion.div>

        {/* Desktop view: Show grid layout */}
        {gallery.slice(0, 5).map((image, index) => (
          <motion.div
            key={index}
            className={`hidden md:block overflow-hidden rounded-lg shadow-lg ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src={image} 
              alt={`${name} - ${index + 1}`} 
              className={`w-full h-full object-cover ${index === 0 ? 'h-[400px]' : 'h-[200px]'}`}
            />
          </motion.div>
        ))}
      </div>

      {/* Show all photos button */}
      <motion.button
        className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-pink-600 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleShowAllPhotos}
      >
        {showAllPhotos ? "Hide photos" : `Show all ${gallery.length} photos`}
      </motion.button>

      {/* Full gallery modal */}
      <AnimatePresence>
        {showAllPhotos && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container mx-auto py-8">
              <motion.button
                className="mb-4 bg-pink-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-pink-600 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleShowAllPhotos}
              >
                Close Gallery
              </motion.button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    className="overflow-hidden rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img 
                      src={image} 
                      alt={`${name} - ${index + 1}`} 
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Gallery;