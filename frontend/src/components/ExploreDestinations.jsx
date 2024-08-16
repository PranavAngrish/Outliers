import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const locations = [
  { name: 'NEW YORK, NYC', image: '/path/to/nyc-image.jpg', description: 'WELCOME HOME' },
  { name: 'AUSTIN, TX', image: '/path/to/austin-image.jpg', description: 'CÉAD MÍLE FÁILTE YALL' },
  { name: 'WASHINGTON, D.C.', image: '/path/to/dc-image.jpg', description: 'COMING SOON' },
  { name: 'CHICAGO, IL', image: '/path/to/chicago-image.jpg', description: 'WINDY CITY WELCOME' },
  { name: 'LOS ANGELES, CA', image: '/path/to/la-image.jpg', description: 'CITY OF ANGELS' },
  { name: 'MIAMI, FL', image: '/path/to/miami-image.jpg', description: 'BIENVENIDOS A MIAMI' },
  { name: 'SEATTLE, WA', image: '/path/to/seattle-image.jpg', description: 'EMERALD CITY ELEGANCE' },
  { name: 'BOSTON, MA', image: '/path/to/boston-image.jpg', description: 'REVOLUTIONARY SPIRITS' },
];

const LocationCard = ({ location, isActive, isMobile }) => (
  <motion.div
    className={`flex-shrink-0 w-full ${isMobile ? 'px-2' : 'md:w-1/3 p-4'}`}
    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
  >
    <motion.div 
      className={`relative ${isMobile ? 'h-64' : 'h-96'} overflow-hidden rounded-lg shadow-lg`}
      initial={{ opacity: 0.8 }}
      whileHover={{ opacity: 1 }}
    >
      <img src={location.image} alt={location.name} className="w-full h-full object-cover" />
      <motion.div 
        className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 md:p-6"
        initial={{ y: 20, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-white mb-1 md:mb-2`}>{location.name}</h3>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>{location.description}</p>
      </motion.div>
    </motion.div>
  </motion.div>
);

const ChooseLocation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  const nextLocation = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, locations.length - 1));
  }, []);

  const prevLocation = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, []);

  useEffect(() => {
    if (!isMobile && !isHovered) {
      intervalRef.current = setInterval(nextLocation, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isMobile, isHovered, nextLocation]);

  useEffect(() => {
    controls.start({ x: `${-currentIndex * (isMobile ? 100 : 33.33)}%` });
  }, [currentIndex, controls, isMobile]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
      intervalRef.current = setInterval(nextLocation, 3000);
    }
  };

  const handleTouchStart = (e) => {
    containerRef.current.touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current.touchStartX) return;
    const touchEndX = e.touches[0].clientX;
    const diff = containerRef.current.touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < locations.length - 1) {
        nextLocation();
      } else if (diff < 0 && currentIndex > 0) {
        prevLocation();
      }
      containerRef.current.touchStartX = null;
    }
  };

  const NavigationButton = ({ direction, onClick, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute ${direction === 'left' ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 text-pink-500 p-2 rounded-full transition-all duration-300 shadow-md ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${isMobile ? 'block' : isHovered ? 'block' : 'hidden'}`}
    >
      {direction === 'left' ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
    </button>
  );

  return (
    <div className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 md:mb-8 text-center">DESTINATIONS</h2>
        <p className="text-lg md:text-xl text-pink-500 mb-8 md:mb-12 text-center">FOR MENUS, OPENING HOURS, EVENTS, AND MORE</p>
        <div className="relative overflow-hidden" ref={containerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <motion.div
            className="flex"
            animate={controls}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {locations.map((location, index) => (
              <LocationCard key={index} location={location} isActive={index === currentIndex} isMobile={isMobile} />
            ))}
          </motion.div>
          <NavigationButton 
            direction="left" 
            onClick={prevLocation} 
            disabled={currentIndex === 0}
          />
          <NavigationButton 
            direction="right" 
            onClick={nextLocation} 
            disabled={currentIndex === locations.length - 1}
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseLocation;