import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCards = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        nextCards();
      } else if (event.key === 'ArrowLeft') {
        prevCards();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, cardsPerView]);

  return (
    <div className="relative w-full overflow-hidden px-4 sm:px-0">
      <motion.div 
        className="flex gap-4"
        animate={{ x: `-${currentIndex * (100 / cardsPerView)}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {experiences.map((exp, index) => (
          <div key={index} className={`w-full sm:w-1/2 md:w-1/3 flex-shrink-0`}>
            <ExperienceCard {...exp} />
          </div>
        ))}
      </motion.div>
      {currentIndex > 0 && (
        <button
          onClick={prevCards}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-all duration-300"
        >
          <FaChevronLeft size={20} />
        </button>
      )}
      {currentIndex < experiences.length - cardsPerView && (
        <button
          onClick={nextCards}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-all duration-300"
        >
          <FaChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default ExperienceCards;