// SimilarExperiences.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/solid';

function SimilarExperiences({ experiences }) {
  if (experiences.length === 0) return null;

  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.1 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Similar Experiences</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={exp.image} 
                alt={exp.name} 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{exp.name}</h3>
              <p className="text-gray-600 mb-4">{exp.description}</p>
              <motion.a
                href="#" // Replace with actual link
                className="inline-flex items-center text-pink-500 hover:text-pink-600 transition-colors duration-300"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Learn More
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default SimilarExperiences;