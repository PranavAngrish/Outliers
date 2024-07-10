import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaCalendarAlt, FaUserFriends, FaBars } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from 'framer-motion';
import SearchInput from './SearchBar/SearchInput';
import DateInput from './SearchBar/DateInput';
import GuestInput from './SearchBar/GuestInput';
import RegionDropdown from './SearchBar/RegionDropdown';
import GuestMenu from './SearchBar/GuestMenu';

const NavItem = ({ href, children }) => (
  <a href={href} className="text-sm lg:text-base text-white hover:text-orange-300 transition-colors duration-300 hover:underline">
    {children}
  </a>
);

const NavButton = ({ className, children }) => (
  <button className={`px-3 py-1 lg:px-4 lg:py-2 text-sm lg:text-base rounded-full transition duration-300 transform hover:scale-105 ${className}`}>
    {children}
  </button>
);

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = ['Experiences', 'Destinations', 'About Us', 'Contact Us'];

  return (
    <>
      <nav className="flex justify-between items-center py-6">
        <div className="flex items-center">
          <img src="/src/assets/outliers/logo.jpg" alt="logo" className="h-10 w-10 sm:h-12 sm:w-12 mr-2 transition-transform duration-300 hover:scale-110" />
          <span className="text-lg sm:text-xl font-bold text-white">The Outliers Co</span>
        </div>
        <div className="hidden md:flex justify-center space-x-4 lg:space-x-8">
          {navItems.map((item, index) => (
            <NavItem key={index} href="#">{item}</NavItem>
          ))}
        </div>
        <div className="hidden md:flex space-x-2 lg:space-x-4">
          <NavButton className="bg-white text-black hover:bg-gray-200">Host An Experience!</NavButton>
          <NavButton className="bg-orange-500 text-white hover:bg-orange-600">Login</NavButton>
        </div>
        <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden text-white">
          <FaBars className="text-xl" />
        </button>
      </nav>

      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-md rounded-lg p-4 mb-4">
          {navItems.map((item, index) => (
            <a key={index} href="#" className="block py-2 text-black hover:text-orange-600 transition-colors duration-300">{item}</a>
          ))}
          <NavButton className="w-full bg-black text-white hover:bg-gray-800 mt-2">Host An Experience!</NavButton>
          <NavButton className="w-full bg-orange-500 text-white hover:bg-orange-600 mt-2">Login</NavButton>
        </div>
      )}
    </>
  );
};

const SearchBar = () => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0 });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const searchBarRef = useRef(null);
  const guestMenuRef = useRef(null);

  const regions = [
    { name: "Jaipur", icon: "/src/assets/outliers/MAPjaipur.png" },
    { name: "Bikaner", icon: "/src/assets/outliers/MAPbikaner.png" },
    { name: "Jaisalmer", icon: "/src/assets/outliers/MAPjaisalmer.png" },
    { name: "Jodhpur", icon: "/src/assets/outliers/MAPjodhpur.png" },
    { name: "Udaipur", icon: "/src/assets/outliers/MAPudaipur.png" },
    { name: "Anywhere in Rajasthan", icon: "/src/assets/outliers/MAPrajasthan.png" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target) &&
          !(guestMenuRef.current && guestMenuRef.current.contains(event.target))) {
        setActiveDropdown(null);
      }
    };

    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleGuestChange = (type, increment) => {
    setGuests(prevGuests => ({
      ...prevGuests,
      [type]: Math.max(0, prevGuests[type] + increment)
    }));
  };

  const totalGuests = Object.values(guests).reduce((sum, count) => sum + count, 0);

  const handleInputFocus = (inputName) => {
    setActiveDropdown(inputName);
  };

  const handleSearch = () => {
    console.log("Searching for:", { selectedDestination, checkInDate, guests });
  };

  return (
    <div className={`relative ${isSticky ? 'fixed top-0 left-0 right-0 z-50' : ''}`}>
      <motion.div 
        className={`bg-white shadow-lg rounded-full p-2 mb-2 max-w-4xl mx-auto ${isSticky ? 'mt-4' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        ref={searchBarRef}
      >
        <div className="flex flex-col sm:flex-row items-center">
          <SearchInput
            icon={<FaSearch className="text-gray-400" />}
            placeholder="Search destinations"
            value={selectedDestination}
            onChange={setSelectedDestination}
            onFocus={() => handleInputFocus('destination')}
            isActive={activeDropdown === 'destination'}
            className="w-full sm:w-1/3 mb-2 sm:mb-0"
          />
          <Divider className="hidden sm:block" />
          <DateInput
            icon={<FaCalendarAlt className="text-gray-400" />}
            selected={checkInDate}
            onChange={setCheckInDate}
            placeholderText="When?"
            onFocus={() => handleInputFocus('checkIn')}
            isActive={activeDropdown === 'checkIn'}
            className="w-full sm:w-1/3 mb-2 sm:mb-0 rounded-full hover:bg-gray-100 transition-colors duration-200"
          />
          <Divider className="hidden sm:block" />
          <GuestInput
            icon={<FaUserFriends className="text-gray-400" />}
            totalGuests={totalGuests}
            onToggle={() => handleInputFocus('guests')}
            isActive={activeDropdown === 'guests'}
            className="w-full sm:w-1/3 mb-2 sm:mb-0"
          />
          <motion.button
            className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition duration-300 w-full sm:w-auto sm:ml-2 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
          >
            <FaSearch className="mr-2" />
            Search
          </motion.button>
        </div>
      </motion.div>
      <AnimatePresence>
        {activeDropdown === 'destination' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 z-10 mt-2"
          >
            <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
              <RegionDropdown 
                regions={regions} 
                onSelect={(region) => {
                  setSelectedDestination(region);
                  setActiveDropdown(null);
                }} 
              />
            </div>
          </motion.div>
        )}
        {activeDropdown === 'guests' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 z-10 mt-2"
            ref={guestMenuRef}
          >
            <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
              <GuestMenu guests={guests} onGuestChange={handleGuestChange} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Divider = ({ className }) => (
  <div className={`h-8 w-px bg-gray-300 mx-2 ${className}`} />
);

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-8 md:py-16 relative z-0">
      <div className="w-full md:w-1/2 mb-8 md:mb-0 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Unique Experiences</h1>
        <p className="text-xl md:text-2xl mb-6">Explore the hidden gems of Rajasthan with local experts</p>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg hover:bg-orange-600 transition duration-300">
          Start Your Adventure
        </button>
      </div>
      <div className="w-full md:w-1/2 relative">
        <div className="bg-yellow-200 rounded-full h-40 w-40 sm:h-48 sm:w-48 md:h-64 md:w-64 lg:h-80 lg:w-80 absolute right-0 top-0 animate-pulse opacity-50"></div>
        <img 
          src="/src/assets/outliers/main.png" 
          alt="Traveler" 
          className="relative z-0 max-w-full md:max-w-md mx-auto md:ml-auto transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

function MyApp() {
    return (
        <div className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/src/assets/outliers/udaipur.jpg')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 min-h-screen">
            <div className="container mx-auto px-4">
              <Navbar />
              <SearchBar />
              <HeroSection />
            </div>
          </div>
        </div>
      );
    }

export default MyApp;