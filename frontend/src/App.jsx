import React from 'react';
import Navbar from './components/Navbar.jsx';
import SearchBar from './components/SearchBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import PopularPlaces from './components/PopularPlaces.jsx';
import ExploreDestinations from './components/ExploreDestinations.jsx';
import Gallery from './components/Gallery.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="container mx-auto px-4 sm:px-6 font-sans text-black">
      <Navbar />
      <SearchBar />
      <HeroSection />
      <PopularPlaces />
      <ExploreDestinations />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;