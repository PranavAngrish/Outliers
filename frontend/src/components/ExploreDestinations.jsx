import React from 'react';

function ExploreDestinations() {
  const explorePlaces = [
    { name: 'Jaipur', rating: 4.8, image: '/src/assets/outliers/jaipur.jpg' },
    { name: 'Jodhpur', rating: 4.9, image: '/src/assets/outliers/jodhpur.jpg' },
    { name: 'Jaisalmer', rating: 4.9, image: '/src/assets/outliers/jaisalmer.jpg' },
    { name: 'Udaipur', rating: 4.8, image: '/src/assets/outliers/udaipur.jpg' },
    { name: 'Bikaner', rating: 4.7, image: '/src/assets/outliers/bikaner.jpg' },
    { name: 'Ajmer', rating: 4.8, image: '/src/assets/outliers/Ajmer.jpg' },
  ];

  return (
    <div className="py-8 md:py-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">Explore Destinations</h2>
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 md:mb-8">
        {['Beach', 'Mountain', 'Waterfall', 'Icebergs'].map((item, index) => (
          <button key={index} className="bg-gray-200 px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full hover:bg-gray-300 transition duration-300 transform hover:scale-105">{item}</button>
        ))}
        <button className="bg-orange-500 text-white px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full hover:bg-orange-600 transition duration-300 transform hover:scale-105">View all</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {explorePlaces.map((place, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
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
    </div>
  );
}

export default ExploreDestinations;