import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useDragControls } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

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
  const dragControls = useDragControls();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  const nextLocation = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % locations.length);
  };

  const prevLocation = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + locations.length) % locations.length);
  };

  useEffect(() => {
    if (!isMobile && !isHovered) {
      intervalRef.current = setInterval(nextLocation, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isMobile, isHovered]);

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

  const handleDragEnd = (event, info) => {
    if (isMobile) {
      const swipeThreshold = 50;
      if (info.offset.x < -swipeThreshold) {
        nextLocation();
      } else if (info.offset.x > swipeThreshold) {
        prevLocation();
      }
      controls.start({ x: `${-currentIndex * 100}%` });
    }
  };

  const NavigationButton = ({ direction, onClick }) => (
    <button
      className={`absolute ${direction === 'left' ? 'left-2 md:left-4' : 'right-2 md:right-4'} top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 md:p-4 shadow-lg ${isMobile ? 'block' : isHovered ? 'block' : 'hidden'}`}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6 text-pink-500">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={direction === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
      </svg>
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
            drag={isMobile ? "x" : false}
            dragControls={dragControls}
            dragConstraints={{ left: -((locations.length - 1) * 100), right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
          >
            {locations.map((location, index) => (
              <LocationCard key={index} location={location} isActive={index === currentIndex} isMobile={isMobile} />
            ))}
          </motion.div>
          <NavigationButton direction="left" onClick={prevLocation} />
          <NavigationButton direction="right" onClick={nextLocation} />
        </div>
      </div>
    </div>
  );
};

export default ChooseLocation;