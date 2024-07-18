import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, useAnimation, useDragControls } from 'framer-motion';

const ExperienceCard = ({ image, title }) => (
  <div className="relative rounded-lg overflow-hidden group">
    <img src={image} alt={title} className="w-full h-36 sm:h-48 object-cover" />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 sm:p-4">
      <h3 className="text-white text-sm sm:text-lg font-semibold group-hover:text-pink-500 transition-colors duration-300">{title}</h3>
    </div>
  </div>
);

const ExperienceCards = () => {
  const experiences = [
    { title: "Bike Expedition", image: "/src/assets/bike-expedition.jpg" },
    { title: "Trekking", image: "/src/assets/trekking.jpg" },
    { title: "Skydiving", image: "/src/assets/skydiving.jpg" },
    { title: "Bungee Jump", image: "/src/assets/bungee-jump.jpg" },
    { title: "Rock Climbing", image: "/src/assets/rock-climbing.jpg" },
    { title: "Paragliding", image: "/src/assets/paragliding.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const dragControls = useDragControls();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextCards = () => {
    if (currentIndex < experiences.length - cardsPerView) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const prevCards = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  useEffect(() => {
    controls.start({ x: `-${currentIndex * (100 / cardsPerView)}%` });
  }, [currentIndex, cardsPerView, controls]);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && currentIndex < experiences.length - cardsPerView) {
      nextCards();
    } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
      prevCards();
    } else {
      controls.start({ x: `-${currentIndex * (100 / cardsPerView)}%` });
    }
  };

  return (
    <div className="relative w-full overflow-hidden px-4 sm:px-0" ref={containerRef}>
      <motion.div
        className="flex gap-4"
        animate={controls}
        drag="x"
        dragControls={dragControls}
        dragConstraints={containerRef}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      >
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className={`w-full sm:w-1/2 md:w-1/3 flex-shrink-0`}
            whileTap={{ scale: 0.95 }}
          >
            <ExperienceCard {...exp} />
          </motion.div>
        ))}
      </motion.div>
      {currentIndex > 0 && (
        <button
          onClick={prevCards}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-all duration-300 focus:outline-none"
          aria-label="Previous"
        >
          <FaChevronLeft size={20} />
        </button>
      )}
      {currentIndex < experiences.length - cardsPerView && (
        <button
          onClick={nextCards}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-all duration-300 focus:outline-none"
          aria-label="Next"
        >
          <FaChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default ExperienceCards;