import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaCalendarAlt, FaUserFriends, FaChevronDown } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from 'framer-motion';

function SearchBar() {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [showDestinations, setShowDestinations] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [showGuestMenu, setShowGuestMenu] = useState(false);
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0
  });
  const [activeInput, setActiveInput] = useState(null);
  const searchBarRef = useRef(null);

  const destinations = ['Jaipur', 'Jodhpur', 'Jaisalmer', 'Bikaner'];

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setActiveInput(null);
        setShowGuestMenu(false);
        setShowDestinations(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGuestChange = (type, increment) => {
    setGuests(prevGuests => ({
      ...prevGuests,
      [type]: Math.max(0, prevGuests[type] + increment)
    }));
  };

  const totalGuests = Object.values(guests).reduce((sum, count) => sum + count, 0);

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
    if (inputName === 'guests') setShowGuestMenu(true);
    if (inputName === 'destination') setShowDestinations(true);
  };

  const handleSearch = () => {
    console.log("Searching for:", { selectedDestination, checkInDate, guests });
  };

  return (
    <motion.div 
      className="bg-white shadow-lg rounded-lg p-4 mb-8 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={searchBarRef}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
        <div className="relative flex-grow mb-4 lg:mb-0 lg:w-1/3">
          <SearchInput
            icon={<FaSearch />}
            placeholder="Where are you going?"
            value={selectedDestination}
            onChange={setSelectedDestination}
            onFocus={() => handleInputFocus('destination')}
            isActive={activeInput === 'destination'}
          />
          <AnimatePresence>
            {showDestinations && (
              <DestinationDropdown
                destinations={destinations}
                onSelect={(destination) => {
                  setSelectedDestination(destination);
                  setShowDestinations(false);
                }}
              />
            )}
          </AnimatePresence>
        </div>
        <DateInput
          icon={<FaCalendarAlt />}
          selected={checkInDate}
          onChange={setCheckInDate}
          placeholderText="Check-in Date"
          onFocus={() => handleInputFocus('checkIn')}
          isActive={activeInput === 'checkIn'}
        />
        <div className="relative flex-grow mb-4 lg:mb-0 lg:w-1/3">
          <GuestInput
            icon={<FaUserFriends />}
            totalGuests={totalGuests}
            showMenu={showGuestMenu}
            onToggle={() => {
              setShowGuestMenu(!showGuestMenu);
              handleInputFocus('guests');
            }}
            isActive={activeInput === 'guests'}
          />
          <AnimatePresence>
            {showGuestMenu && (
              <GuestMenu
                guests={guests}
                onGuestChange={handleGuestChange}
              />
            )}
          </AnimatePresence>
        </div>
        <motion.button
          className="bg-pink-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-pink-300 transition duration-300 mt-4 lg:mt-0 w-full lg:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
        >
          Search
        </motion.button>
      </div>
    </motion.div>
  );
}

const SearchInput = ({ icon, placeholder, value, onChange, onFocus, isActive }) => (
  <div className="relative w-full">
    <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 ${isActive ? 'text-pink-500' : ''}`}>
      {icon}
    </div>
    <input
      type="text"
      placeholder={placeholder}
      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all duration-300 ${isActive ? 'border-pink-500 ring-2 ring-pink-200' : 'border-gray-300'}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
    />
    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      <FaChevronDown />
    </div>
  </div>
);

const DestinationDropdown = ({ destinations, onSelect }) => (
  <motion.div
    className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    {destinations.map((destination) => (
      <div
        key={destination}
        className="px-4 py-2 hover:bg-pink-100 cursor-pointer"
        onClick={() => onSelect(destination)}
      >
        {destination}
      </div>
    ))}
  </motion.div>
);

const DateInput = ({ icon, selected, onChange, placeholderText, onFocus, isActive }) => (
  <div className="relative flex-grow mb-4 lg:mb-0 lg:w-1/3">
    <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 ${isActive ? 'text-pink-500' : ''}`}>
      {icon}
    </div>
    <DatePicker
      selected={selected}
      onChange={onChange}
      placeholderText={placeholderText}
      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all duration-300 ${isActive ? 'border-pink-500 ring-2 ring-pink-200' : 'border-gray-300'}`}
      onFocus={onFocus}
    />
  </div>
);

const GuestInput = ({ icon, totalGuests, showMenu, onToggle, isActive }) => (
  <button
    className={`w-full pl-10 pr-4 py-3 bg-white border rounded-full focus:outline-none text-left transition-all duration-300 ${isActive ? 'border-pink-500 ring-2 ring-pink-200' : 'border-gray-300'}`}
    onClick={onToggle}
  >
    <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 ${isActive ? 'text-pink-500' : ''}`}>
      {icon}
    </div>
    <span className="font-medium">Who</span>
    <span className="text-gray-500 ml-2">
      {totalGuests === 0 ? 'Add guests' : `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}`}
    </span>
  </button>
);

const GuestMenu = ({ guests, onGuestChange }) => (
  <motion.div
    className="absolute z-10 mt-2 w-80 bg-white rounded-3xl shadow-lg p-6 left-0"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    {[
      { type: 'adults', label: 'Adults', description: 'Ages 13 or above' },
      { type: 'children', label: 'Children', description: 'Ages 2–12' },
      { type: 'infants', label: 'Infants', description: 'Under 2' },
    ].map(({ type, label, description }) => (
      <div key={type} className="flex justify-between items-center mb-6">
        <div>
          <p className="font-semibold">{label}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex items-center">
          <button
            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:border-gray-500"
            onClick={() => onGuestChange(type, -1)}
            disabled={guests[type] === 0}
          >
            -
          </button>
          <span className="mx-4 w-6 text-center font-medium">{guests[type]}</span>
          <button
            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:border-gray-500"
            onClick={() => onGuestChange(type, 1)}
          >
            +
          </button>
        </div>
      </div>
    ))}
  </motion.div>
);

export default SearchBar;