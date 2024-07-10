import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from 'framer-motion';
import SearchInput from './SearchInput';
import DateInput from './DateInput';
import GuestInput from './GuestInput';
import RegionDropdown from './RegionDropdown';
import GuestMenu from './GuestMenu';

function SearchBar() {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0
  });
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
    function handleClickOutside(event) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        if (!(guestMenuRef.current && guestMenuRef.current.contains(event.target))) {
          setActiveDropdown(null);
        }
      }
    }

    function handleScroll() {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 100);
    }

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
}

const Divider = ({ className }) => (
  <div className={`h-8 w-px bg-gray-300 mx-2 ${className}`} />
);

export default SearchBar;