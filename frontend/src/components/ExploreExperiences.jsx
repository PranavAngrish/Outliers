import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import jaipur from "/src/assets/outliers/jaipur.jpg";
import jodhpur from "/src/assets/outliers/jodhpur.jpg";
import jaisalmer from "/src/assets/outliers/jaisalmer.jpg";
import udaipur from "/src/assets/outliers/udaipur.jpg";
import bikaner from "/src/assets/outliers/bikaner.jpg";
import ajmer from "/src/assets/outliers/Ajmer.jpg";

function ExploreExperiences() {
  const navigate = useNavigate();

  const exploreExperiences = [
    { name: 'Jaipur Bike Tour', rating: 4.8, image: jaipur, type: 'Bike Riding' },
    { name: 'Jodhpur Heritage Walk', rating: 4.9, image: jodhpur, type: 'Walking Tour' },
    { name: 'Jaisalmer Desert Safari', rating: 4.9, image: jaisalmer, type: 'Adventure' },
    { name: 'Udaipur Cooking Class', rating: 4.8, image: udaipur, type: 'Culinary' },
    { name: 'Bikaner Camel Ride', rating: 4.7, image: bikaner, type: 'Adventure' },
    { name: 'Ajmer Dargah Visit', rating: 4.8, image: ajmer, type: 'Cultural' },
    { name: 'Pushkar Yoga Retreat', rating: 4.7, image: ajmer, type: 'Wellness' },
    { name: 'Mount Abu Nature Walk', rating: 4.6, image: '/src/assets/outliers/mount_abu.jpg', type: 'Nature' },
    { name: 'Chittorgarh Fort Tour', rating: 4.8, image: '/src/assets/outliers/chittorgarh.jpg', type: 'Historical' },
    { name: 'Farm to Table Experience', rating: 4.8, image: '/src/assets/outliers/chittorgarh.jpg', type: 'Culinary' },
  ];

  const experienceTypes = ['Bike Riding', 'Walking Tour', 'Adventure', 'Culinary', 'Cultural', 'Wellness', 'Nature', 'Historical'];
  const [startIndex, setStartIndex] = useState(0);
  const [typesPerView, setTypesPerView] = useState(4);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cardStartIndex, setCardStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(6);
  const [selectedType, setSelectedType] = useState(null);

  const updateViewSettings = useCallback(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) {
      setTypesPerView(2);
    } else if (window.innerWidth < 1024) {
      setTypesPerView(3);
    } else {
      setTypesPerView(4);
    }
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

  const handleTouchStart = (e, ref) => {
    ref.current.touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e, ref, shiftFunction) => {
    if (!ref.current.touchStartX) return;
    const touchEndX = e.touches[0].clientX;
    const diff = ref.current.touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      shiftFunction(diff > 0 ? 'next' : 'prev');
      ref.current.touchStartX = null;
    }
  };

  const loadMoreCards = () => {
    setVisibleCards(prevVisible => Math.min(prevVisible + 3, filteredExperiences.length));
  };

  const showLessCards = () => {
    setVisibleCards(6);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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

  const renderExploreCards = () => {
    if (isMobile) {
      return (
        <div className="relative overflow-hidden">
          <div 
            ref={containerRef}
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${cardStartIndex * 100}%)` }}
            onTouchStart={(e) => handleTouchStart(e, containerRef)}
            onTouchMove={(e) => handleTouchMove(e, containerRef, shiftCards)}
          >
            {filteredExperiences.map((experience, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 bg-white"
                onClick={() => handleExperienceClick(experience.name)}
              >
                <img src={experience.image} alt={experience.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{experience.name}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span>{experience.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cardStartIndex > 0 && (
            <button
              onClick={() => shiftCards('prev')}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 text-pink-500 p-2 rounded-full transition-all duration-300 shadow-md"
            >
              <FaChevronLeft size={20} />
            </button>
          )}
          {cardStartIndex < filteredExperiences.length - 1 && (
            <button
              onClick={() => shiftCards('next')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 text-pink-500 p-2 rounded-full transition-all duration-300 shadow-md"
            >
              <FaChevronRight size={20} />
            </button>
          )}
        </div>
      );
    } else {
      return (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredExperiences.slice(0, visibleCards).map((experience, index) => (
              <div 
                key={index} 
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 bg-white cursor-pointer"
                onClick={() => handleExperienceClick(experience.name)}
              >
                <img src={experience.image} alt={experience.name} className="w-full h-40 sm:h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{experience.name}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span>{experience.rating}</span>
                  </div>
                </div>
              </div>
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

  return (
    <div ref={sectionRef} className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-gray-800">Explore Experiences</h2>
      <div className="relative mb-8 md:mb-12 overflow-hidden">
        <div 
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${startIndex * (100 / typesPerView)}%)` }}
          onTouchStart={(e) => handleTouchStart(e, containerRef)}
          onTouchMove={(e) => handleTouchMove(e, containerRef, shiftTypes)}
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
        </div>
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