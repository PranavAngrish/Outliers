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
    <div className="py-8 md:py-16">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Our Gallery</h2>
        <p className="text-gray-500 text-sm sm:text-base">Share Your Happy Moments</p>
        <a href="#" className="text-orange-500 hover:underline">View all</a>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 row-span-2">
          <img src={galleryImages[0].src} alt={galleryImages[0].alt} className="w-full h-full object-cover rounded-lg" />
        </div>
        <div>
          <img src={galleryImages[1].src} alt={galleryImages[1].alt} className="w-full h-full object-cover rounded-lg" />
        </div>
        <div>
          <img src={galleryImages[2].src} alt={galleryImages[2].alt} className="w-full h-full object-cover rounded-lg" />
        </div>
        <div>
          <img src={galleryImages[3].src} alt={galleryImages[3].alt} className="w-full h-full object-cover rounded-lg" />
        </div>
        <div>
          <img src={galleryImages[4].src} alt={galleryImages[4].alt} className="w-full h-full object-cover rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default Gallery;