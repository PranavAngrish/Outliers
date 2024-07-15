import React from 'react';

function Gallery() {
  const galleryImages = [
    { src: "/src/assets/outliers/gallery1.avif", alt: "" },
    { src: "/src/assets/outliers/gallery2.jpeg", alt: "" },
    { src: "/src/assets/outliers/gallery3.jpg", alt: "" },
    { src: "/src/assets/outliers/gallery4.png", alt: "" },
    { src: "/src/assets/outliers/gallery5.jpg", alt: "" },
  ];

  return (
    <div className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-0">Our Gallery</h2>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <p className="text-gray-500 text-sm sm:text-base mb-2 sm:mb-0 sm:mr-4">Share Your Happy Moments</p>
          <a href="#" className="text-pink-500 hover:underline text-pink-600">View all</a>
        </div>
      </div>
      <div className="sm:hidden overflow-x-auto whitespace-nowrap pb-4">
        {galleryImages.map((image, index) => (
          <div key={index} className="inline-block mr-4 last:mr-0">
            <img src={image.src} alt={image.alt} className="w-64 h-48 object-cover rounded-lg" />
          </div>
        ))}
      </div>
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="sm:col-span-2 sm:row-span-2">
          <img src={galleryImages[0].src} alt={galleryImages[0].alt} className="w-full h-full object-cover rounded-lg" />
        </div>
        {galleryImages.slice(1).map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} className="w-full h-48 object-cover rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;