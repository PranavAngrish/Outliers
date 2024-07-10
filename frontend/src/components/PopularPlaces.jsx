import React, { useRef } from 'react';

function PopularPlaces() {
  const videoRef = useRef(null);

  const places = [
    { name: 'Camel Interaction', location: 'Jaisalmer', video: '/src/assets/outliers/camel.mov', rating: 4.8 },
    { name: 'Farm To Table Experience', location: 'Jaisalmer', image: '/src/assets/outliers/farm.webp', rating: 4.7 },
    { name: 'Spend Time With Flamingos', location: 'Jaipur', image: '/src/assets/outliers/flamingo.webp', rating: 4.9 },
  ];

  return (
    <div className="py-8 md:py-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">Top Selling Experiences</h2>
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 md:mb-8">
        {['Beach', 'Mountain', 'Waterfall', 'Iceberg'].map((item, index) => (
          <button key={index} className="bg-gray-200 px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full hover:bg-gray-300 transition duration-300 transform hover:scale-105">{item}</button>
        ))}
        <button className="bg-orange-500 text-white px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full hover:bg-orange-600 transition duration-300 transform hover:scale-105">View all</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {places.map((place, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            {place.video ? (
              <div 
                className="w-full h-48 sm:h-56 relative"
                onMouseEnter={() => videoRef.current.play()}
                onMouseLeave={() => {
                  videoRef.current.pause();
                  videoRef.current.currentTime = 0;
                }}
              >
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src={place.video}
                  loop
                  muted
                />
              </div>
            ) : (
              <img src={place.image} alt={place.name} className="w-full h-48 sm:h-56 object-cover" />
            )}
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{place.name}</h3>
              <p className="text-gray-600 mb-4">{place.location}</p>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{place.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularPlaces;