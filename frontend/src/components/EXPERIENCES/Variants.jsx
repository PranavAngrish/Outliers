// Variants.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

function Variants({ variants }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!variants || variants.length === 0) {
    return null;
  }

  const nextVariant = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % variants.length);
  };

  const prevVariant = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + variants.length) % variants.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextVariant,
    onSwipedRight: prevVariant,
  });

  const VariantCard = ({ variant }) => (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
      whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img 
        src={variant.image} 
        alt={variant.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{variant.name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{variant.description}</p>
        <div className="mt-auto flex justify-between items-center">
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
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Experience Variants</h2>
      
      {/* Mobile view */}
      <div className="md:hidden relative" {...handlers}>
        <VariantCard variant={variants[currentIndex]} />
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={prevVariant}
            className="bg-white rounded-full p-2 shadow-md"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={nextVariant}
            className="bg-white rounded-full p-2 shadow-md"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex justify-center space-x-2">
            {variants.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? 'bg-pink-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {variants.map((variant, index) => (
          <VariantCard key={index} variant={variant} />
        ))}
      </div>
    </motion.div>
  );
}

export default Variants;