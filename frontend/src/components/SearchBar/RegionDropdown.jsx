import React from 'react';
import { motion } from 'framer-motion';

const RegionDropdown = ({ regions, onSelect }) => (
  <motion.div
    className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg p-4 left-0 top-full"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    <h3 className="text-lg font-semibold mb-4">Search by region</h3>
    <div className="grid grid-cols-3 gap-4">
      {regions.map((region) => (
        <div
          key={region.name}
          className="flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
          onClick={() => onSelect(region.name)}
        >
          <img src={region.icon} alt={region.name} className="w-24 h-24 mb-2" />
          <span className="text-sm text-center">{region.name}</span>
        </div>
      ))}
    </div>
    <button
      className="w-full mt-4 py-2 text-center text-pink-500 font-semibold hover:bg-gray-100 rounded-lg"
      onClick={() => onSelect("View all")}
    >
      View all destinations
    </button>
  </motion.div>
);

export default RegionDropdown;