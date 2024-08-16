import React from 'react';
import g1 from "/src/assets/outliers/gallery1.avif";
import g2 from "/src/assets/outliers/gallery2.jpeg";
import g3 from "/src/assets/outliers/gallery3.jpg";
import g4 from "/src/assets/outliers/gallery4.png";
import g5 from "/src/assets/outliers/gallery5.jpg";

function Gallery() {
  const galleryImages = [
    { src: g1, alt: "Gallery image 1" },
    { src: g2, alt: "Gallery image 2" },
    { src: g3, alt: "Gallery image 3" },
    { src: g4, alt: "Gallery image 4" },
    { src: g5, alt: "Gallery image 5" },
  ];

  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-0 text-gray-800">Our Gallery</h2>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <p className="text-gray-600 text-sm sm:text-base mb-2 sm:mb-0 sm:mr-6">Share Your Happy Moments</p>
            <a href="#" className="text-pink-600 hover:text-pink-700 font-semibold transition duration-300 ease-in-out">View all</a>
          </div>
        </div>
        <div className="sm:hidden overflow-x-auto whitespace-nowrap pb-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="inline-block mr-4 last:mr-0">
              <img src={image.src} alt={image.alt} className="w-72 h-56 object-cover rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105" />
            </div>
          ))}
        </div>
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="sm:col-span-2 sm:row-span-2">
            <img src={galleryImages[0].src} alt={galleryImages[0].alt} className="w-full h-full object-cover rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-102" />
          </div>
          {galleryImages.slice(1).map((image, index) => (
            <div key={index}>
              <img src={image.src} alt={image.alt} className="w-full h-56 object-cover rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;