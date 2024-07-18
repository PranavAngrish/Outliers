import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ExploreDestinations() {
  const explorePlaces = [
    { name: 'Jaipur', rating: 4.8, image: '/src/assets/outliers/jaipur.jpg', city: 'Delhi' },
    { name: 'Jodhpur', rating: 4.9, image: '/src/assets/outliers/jodhpur.jpg', city: 'Delhi' },
    { name: 'Jaisalmer', rating: 4.9, image: '/src/assets/outliers/jaisalmer.jpg', city: 'Mumbai' },
    { name: 'Udaipur', rating: 4.8, image: '/src/assets/outliers/udaipur.jpg', city: 'Mumbai' },
    { name: 'Bikaner', rating: 4.7, image: '/src/assets/outliers/bikaner.jpg', city: 'Bangalore' },
    { name: 'Ajmer', rating: 4.8, image: '/src/assets/outliers/Ajmer.jpg', city: 'Bangalore' },
    { name: 'Pushkar', rating: 4.7, image: '/src/assets/outliers/pushkar.jpg', city: 'Kolkata' },
    { name: 'Mount Abu', rating: 4.6, image: '/src/assets/outliers/mount_abu.jpg', city: 'Chennai' },
    { name: 'Chittorgarh', rating: 4.8, image: '/src/assets/outliers/chittorgarh.jpg', city: 'Hyderabad' },
    { name: 'Chittorgarh', rating: 4.8, image: '/src/assets/outliers/chittorgarh.jpg', city: 'Ahmedabad' },
  ];

  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Ahmedabad', 'Pune'];
  const [startIndex, setStartIndex] = useState(0);
  const [citiesPerView, setCitiesPerView] = useState(4);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cardStartIndex, setCardStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(6);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const updateViewSettings = useCallback(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) {
      setCitiesPerView(2);
    } else if (window.innerWidth < 1024) {
      setCitiesPerView(3);
    } else {
      setCitiesPerView(4);
    }
  }, []);

  useEffect(() => {
    updateViewSettings();
    window.addEventListener('resize', updateViewSettings);
    return () => window.removeEventListener('resize', updateViewSettings);
  }, [updateViewSettings]);

  const shiftCities = (direction) => {
    setStartIndex((prevIndex) => {
      const newIndex = direction === 'next' 
        ? Math.min(prevIndex + 1, cities.length - citiesPerView)
        : Math.max(prevIndex - 1, 0);
      return newIndex;
    });
  };

  const shiftCards = (direction) => {
    setCardStartIndex((prevIndex) => {
      const newIndex = direction === 'next' 
        ? Math.min(prevIndex + 1, filteredPlaces.length - 1)
        : Math.max(prevIndex - 1, 0);
      return newIndex;
    });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const diff = startX - x;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        shiftCards('next');
      } else {
        shiftCards('prev');
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const loadMoreCards = () => {
    setVisibleCards(prevVisible => Math.min(prevVisible + 3, filteredPlaces.length));
  };

  const showLessCards = () => {
    setVisibleCards(6);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setCardStartIndex(0);
    setVisibleCards(6);
  };

  const showAllExperiences = () => {
    setSelectedCity(null);
    setCardStartIndex(0);
    setVisibleCards(6);
  };

  const filteredPlaces = selectedCity
    ? explorePlaces.filter(place => place.city === selectedCity)
    : explorePlaces;

  const renderExploreCards = () => {
    if (isMobile) {
      return (
        <div className="relative overflow-hidden">
          <div 
            ref={containerRef}
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${cardStartIndex * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {filteredPlaces.map((place, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:bg-pink-50"
              >
                <img src={place.image} alt={place.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span>{place.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cardStartIndex > 0 && (
            <button
              onClick={() => shiftCards('prev')}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-pink-500 p-2 rounded-full transition-all duration-300"
            >
              <FaChevronLeft size={20} />
            </button>
          )}
          {cardStartIndex < filteredPlaces.length - 1 && (
            <button
              onClick={() => shiftCards('next')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-pink-500 p-2 rounded-full transition-all duration-300"
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
            {filteredPlaces.slice(0, visibleCards).map((place, index) => (
              <div 
                key={index} 
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:bg-pink-50"
              >
                <img src={place.image} alt={place.name} className="w-full h-40 sm:h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{place.name}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span>{place.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            {visibleCards < filteredPlaces.length ? (
              <button 
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                onClick={loadMoreCards}
              >
                View More Experiences
              </button>
            ) : visibleCards > 6 ? (
              <button 
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
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
    <div ref={sectionRef} className="py-8 md:py-16 px-4 md:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">Explore Destinations</h2>
      <div className="relative mb-6 md:mb-8 overflow-hidden">
        <div 
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${startIndex * (100 / citiesPerView)}%)` }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {cities.map((city, index) => (
            <button 
              key={index}
              className={`flex-shrink-0 bg-pink-100 px-4 py-2 text-sm sm:text-base rounded-full hover:bg-pink-200 transition duration-300 transform hover:scale-105 hover:shadow-md text-pink-700 mr-2 ${selectedCity === city ? 'bg-pink-300' : ''}`}
              style={{ width: `calc(${100 / citiesPerView}% - 0.5rem)` }}
              onClick={() => handleCityClick(city)}
            >
              {city}
            </button>
          ))}
        </div>
        {startIndex > 0 && (
          <button
            onClick={() => shiftCities('prev')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-all duration-300"
          >
            <FaChevronLeft size={20} />
          </button>
        )}
        {startIndex < cities.length - citiesPerView && (
          <button
            onClick={() => shiftCities('next')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-all duration-300"
          >
            <FaChevronRight size={20} />
          </button>
        )}
      </div>
      {selectedCity && (
        <div className="text-center mb-6">
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

export default ExploreDestinations;