import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaCalendarAlt, FaUserFriends, FaBars } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import SearchInput from "./SearchBar/SearchInput";
import DateInput from "./SearchBar/DateInput";
import GuestInput from "./SearchBar/GuestInput";
import RegionDropdown from "./SearchBar/RegionDropdown";
import GuestMenu from "./SearchBar/GuestMenu";
import ExperienceCards from "./ExperienceCards";
import bg from "/src/assets/outliers/campaign.mp4";
import { Link } from "react-router-dom";
import MAP1 from "/src/assets/outliers/MAPjaipur.png";
import MAP2 from "/src/assets/outliers/MAPbikaner.png";
import MAP3 from "/src/assets/outliers/MAPjaisalmer.png";
import MAP4 from "/src/assets/outliers/MAPjodhpur.png";
import MAP5 from "/src/assets/outliers/MAPudaipur.png";
import MAP6 from "/src/assets/outliers/MAPrajasthan.png";
const NavItem = ({ href, children }) => (
  <a
    href={href}
    className="text-sm lg:text-base text-white hover:text-[#EC4899] transition-colors duration-300 hover:underline"
  >
    {children}
  </a>
);

const NavButton = ({ className, children }) => (
  <button
    className={`px-3 py-1 lg:px-4 lg:py-2 text-sm lg:text-base rounded-full transition duration-300 transform hover:scale-105 ${className}`}
  >
    {children}
  </button>
);

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = ["Experiences", "Destinations", "About Us", "Contact Us"];

  return (
    <>
      <nav className="flex justify-between items-center py-6">
        <div className="flex items-center">
          <img
            src="/src/assets/outliers/logo.jpg"
            alt="logo"
            className="h-10 w-10 sm:h-12 sm:w-12 mr-2 transition-transform duration-300 hover:scale-110"
          />
          <span className="text-lg sm:text-xl font-bold text-white">
            The Outliers Co
          </span>
        </div>
        <div className="hidden md:flex justify-center space-x-4 lg:space-x-8">
          {navItems.map((item, index) => (
            <NavItem key={index} href="#">
              {item}
            </NavItem>
          ))}
        </div>
        <div className="hidden md:flex space-x-2 lg:space-x-4">
          <Link to="/test">
          <NavButton className="bg-white text-black hover:bg-gray-200">
            Host An Experience!
          </NavButton>
          </Link>
          <Link to="/auth">
            <NavButton className="bg-pink-500 text-white hover:bg-pink-600">
              Log In
            </NavButton>
          </Link>
        </div>
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden text-white"
        >
          <FaBars className="text-xl" />
        </button>
      </nav>

      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-md rounded-lg p-4 mb-4">
          {navItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="block py-2 text-black hover:text-[#EC4899] transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <Link to="/test" className="block w-full">
          <NavButton className="w-full bg-black text-white hover:bg-gray-800 mt-2">
            Host An Experience!
          </NavButton>
          </Link>
          <Link to="/auth" className="block w-full">
            <NavButton className="w-full bg-pink-500 text-white hover:bg-pink-600 mt-2">
              Sign In
            </NavButton>
          </Link>
        </div>
      )}
    </>
  );
};

const SearchBar = () => {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0 });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const searchBarRef = useRef(null);
  const guestMenuRef = useRef(null);

  const regions = [
    { name: "Jaipur", icon: MAP1 },
    { name: "Bikaner", icon: MAP2 },
    { name: "Jaisalmer", icon: MAP3 },
    { name: "Jodhpur", icon: MAP4 },
    { name: "Udaipur", icon: MAP5 },
    {
      name: "Anywhere in Rajasthan",
      icon: MAP6,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        !(guestMenuRef.current && guestMenuRef.current.contains(event.target))
      ) {
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
    setGuests((prevGuests) => ({
      ...prevGuests,
      [type]: Math.max(0, prevGuests[type] + increment),
    }));
  };

  const totalGuests = Object.values(guests).reduce(
    (sum, count) => sum + count,
    0
  );

  const handleInputFocus = (inputName) => {
    setActiveDropdown(inputName);
  };

  const handleSearch = () => {
    console.log("Searching for:", { selectedDestination, checkInDate, guests });
  };

  return (
    <div
      className={`relative ${
        isSticky ? "fixed top-0 left-0 right-0 z-50" : ""
      }`}
    >
      <motion.div
        className={`bg-white shadow-lg rounded-3xl p-2 sm:p-3 mb-2 max-w-4xl mx-auto ${
          isSticky ? "mt-4" : ""
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        ref={searchBarRef}
      >
        <div className="flex flex-col sm:flex-row sm:items-center">
          <SearchInput
            icon={<FaSearch className="text-gray-400" />}
            placeholder="Search destinations"
            value={selectedDestination}
            onChange={setSelectedDestination}
            onFocus={() => handleInputFocus("destination")}
            isActive={activeDropdown === "destination"}
            className="w-full sm:w-1/3 mb-2 sm:mb-0 sm:mr-2"
          />
          <DateInput
            icon={<FaCalendarAlt className="text-gray-400" />}
            selected={checkInDate}
            onChange={setCheckInDate}
            placeholderText="When?"
            onFocus={() => handleInputFocus("checkIn")}
            isActive={activeDropdown === "checkIn"}
            className="w-full sm:w-1/3 mb-2 sm:mb-0 sm:mr-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          />
          <GuestInput
            icon={<FaUserFriends className="text-gray-400" />}
            totalGuests={totalGuests}
            onToggle={() => handleInputFocus("guests")}
            isActive={activeDropdown === "guests"}
            className="w-full sm:w-1/3 mb-3 sm:mb-0 sm:mr-2"
          />
          <motion.button
            className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition duration-300 w-full sm:w-auto flex items-center justify-center text-base"
            whileHover={{ scale: { sm: 1.05 } }}
            whileTap={{ scale: { sm: 0.95 } }}
            onClick={handleSearch}
          >
            <FaSearch className="mr-2 sm:mr-0" />
            <span className="sm:hidden">Search</span>
          </motion.button>
        </div>
      </motion.div>
      <AnimatePresence>
        {activeDropdown === "destination" && (
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
        {activeDropdown === "guests" && (
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="text-white max-w-2xl lg:mr-8 mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Unique Experiences
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              Explore the hidden gems of Rajasthan with local experts
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <ExperienceCards />
          </div>
        </div>
      </div>
    </div>
  );
};

function MyApp() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 min-h-full min-w-full object-cover"
      >
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4">
          <Navbar />
          <SearchBar />
        </div>
        <HeroSection />
      </div>
    </div>
  );
}

export default MyApp;
