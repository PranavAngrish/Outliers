import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaRupeeSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import jaipur from "/src/assets/outliers/jaipur.jpg";
import jodhpur from "/src/assets/outliers/jodhpur.jpg";
import jaisalmer from "/src/assets/outliers/jaisalmer.jpg";
import udaipur from "/src/assets/outliers/udaipur.jpg";
import bikaner from "/src/assets/outliers/bikaner.jpg";
import ajmer from "/src/assets/outliers/Ajmer.jpg";

function ExploreExperiences() {
  const navigate = useNavigate();

  const exploreExperiences = [
    { name: 'Jaipur Bike Tour', rating: 4.8, image: jaipur, type: 'Bike Riding', priceFrom: 1500 },
    { name: 'Jodhpur Heritage Walk', rating: 4.9, image: jodhpur, type: 'Walking Tour', priceFrom: 1000 },
    { name: 'Jaisalmer Desert Safari', rating: 4.9, image: jaisalmer, type: 'Adventure', priceFrom: 3500 },
    { name: 'Udaipur Cooking Class', rating: 4.8, image: udaipur, type: 'Culinary', priceFrom: 2500 },
    { name: 'Bikaner Camel Ride', rating: 4.7, image: bikaner, type: 'Adventure', priceFrom: 1200 },
    { name: 'Ajmer Dargah Visit', rating: 4.8, image: ajmer, type: 'Cultural', priceFrom: 800 },
    { name: 'Pushkar Yoga Retreat', rating: 4.7, image: ajmer, type: 'Wellness', priceFrom: 2000 },
    { name: 'Mount Abu Nature Walk', rating: 4.6, image: '/src/assets/outliers/mount_abu.jpg', type: 'Nature', priceFrom: 1500 },
    { name: 'Chittorgarh Fort Tour', rating: 4.8, image: '/src/assets/outliers/chittorgarh.jpg', type: 'Historical', priceFrom: 2800 },
    { name: 'Farm to Table Experience', rating: 4.8, image: '/src/assets/outliers/chittorgarh.jpg', type: 'Culinary', priceFrom: 3000 },
  ];

  const experienceTypes = ['Bike Riding', 'Walking Tour', 'Adventure', 'Culinary', 'Cultural', 'Wellness', 'Nature', 'Historical'];
  const [startIndex, setStartIndex] = useState(0);
  const [typesPerView, setTypesPerView] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [cardStartIndex, setCardStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(6);
  const [selectedType, setSelectedType] = useState(null);

  const updateViewSettings = useCallback(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setTypesPerView(mobile ? 2 : window.innerWidth < 1024 ? 3 : 4);
  }, []);

  useEffect(() => {
    updateViewSettings();
    window.addEventListener('resize', updateViewSettings);
    return () => window.removeEventListener('resize', updateViewSettings);
  }, [updateViewSettings]);

  const shiftTypes = (direction) => {
    setStartIndex((prevIndex) => {
      const newIndex = direction === 'next' 
        ? Math.min(prevIndex + 1, experienceTypes.length - typesPerView)
        : Math.max(prevIndex - 1, 0);
      return newIndex;
    });
  };

  const shiftCards = (direction) => {
    setCardStartIndex((prevIndex) => {
      const newIndex = direction === 'next' 
        ? Math.min(prevIndex + 1, filteredExperiences.length - 1)
        : Math.max(prevIndex - 1, 0);
      return newIndex;
    });
  };

  const loadMoreCards = () => {
    setVisibleCards(prevVisible => Math.min(prevVisible + 3, filteredExperiences.length));
  };

  const showLessCards = () => {
    setVisibleCards(6);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
    setCardStartIndex(0);
    setVisibleCards(6);
  };

  const showAllExperiences = () => {
    setSelectedType(null);
    setCardStartIndex(0);
    setVisibleCards(6);
  };

  const filteredExperiences = selectedType
    ? exploreExperiences.filter(experience => experience.type === selectedType)
    : exploreExperiences;

  const handleExperienceClick = (experienceName) => {
    navigate(`/experience/${experienceName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const ExperienceCard = ({ experience, onClick }) => (
    <div 
      className="flex-shrink-0 w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 bg-gray-50 cursor-pointer"
      onClick={onClick}
    >
      <img src={experience.image} alt={experience.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{experience.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span>{experience.rating}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaRupeeSign className="mr-1" />
            <span>From {experience.priceFrom}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExploreCards = () => {
    if (isMobile) {
      return (
        <motion.div 
          className="relative overflow-hidden"
          drag="x"
          dragConstraints={{ left: -((filteredExperiences.length - 1) * 100), right: 0 }}
          dragElastic={0.1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              shiftCards('next');
            } else if (swipe > swipeConfidenceThreshold) {
              shiftCards('prev');
            }
          }}
        >
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${cardStartIndex * 100}%)` }}
          >
            {filteredExperiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} onClick={() => handleExperienceClick(experience.name)} />
            ))}
          </div>
        </motion.div>
      );
    } else {
      return (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredExperiences.slice(0, visibleCards).map((experience, index) => (
              <ExperienceCard key={index} experience={experience} onClick={() => handleExperienceClick(experience.name)} />
            ))}
          </div>
          <div className="text-center mt-8">
            {visibleCards < filteredExperiences.length ? (
              <button 
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-md"
                onClick={loadMoreCards}
              >
                View More Experiences
              </button>
            ) : visibleCards > 6 ? (
              <button 
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-md"
                onClick={showLessCards}
              >
                Show Less
              </button>
            ) : null}
          </div>
        </>
      );
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-gray-800 text-center">Explore Experiences</h2>
      <div className="relative mb-8 md:mb-12 overflow-hidden">
        <motion.div 
          className="flex"
          animate={{ x: `-${startIndex * (100 / typesPerView)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {experienceTypes.map((type, index) => (
            <button 
              key={index}
              className={`flex-shrink-0 px-4 py-2 text-sm sm:text-base rounded-full transition duration-300 shadow-md mr-3 ${
                selectedType === type 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white text-pink-500 hover:bg-pink-100'
              }`}
              style={{ width: `calc(${100 / typesPerView}% - 0.75rem)` }}
              onClick={() => handleTypeClick(type)}
            >
              {type}
            </button>
          ))}
        </motion.div>
        {startIndex > 0 && (
          <button
            onClick={() => shiftTypes('prev')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-pink-500 p-2 rounded-full transition-all duration-300 shadow-md"
          >
            <FaChevronLeft size={20} />
          </button>
        )}
        {startIndex < experienceTypes.length - typesPerView && (
          <button
            onClick={() => shiftTypes('next')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-pink-500 p-2 rounded-full transition-all duration-300 shadow-md"
          >
            <FaChevronRight size={20} />
          </button>
        )}
      </div>
      {selectedType && (
        <div className="text-center mb-8">
          <button 
            className="text-pink-500 hover:text-pink-600 font-medium text-sm transition duration-300"
            onClick={showAllExperiences}
          >
            Show all experiences
          </button>
        </div>
      )}
      {renderExploreCards()}
    </div>
  );
}

export default ExploreExperiences;