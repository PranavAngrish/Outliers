import React, { useState} from "react";
import {  FaBars } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";




const NavItem = ({ href, children }) => (
    <a
      href={href}
      className="text-sm lg:text-base text-white hover:text-pink-300 transition-colors duration-300 hover:underline"
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
    const {currentUser} = useSelector((state) => state.user);
    console.log("The user is as fol",currentUser);

  
    const navItems = ["Experiences", "Destinations", "Gallery", "Contact Us"];
    console.log("The user is",currentUser);
  
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
            <Link to="/host">
            <NavButton className="bg-white text-black hover:bg-gray-200">
              Host An Experience!
            </NavButton>
            </Link>
            {
              !currentUser && (<Link to="/auth">
              <NavButton className="bg-pink-500 text-white hover:bg-pink-600">
                Log In
              </NavButton>
            </Link>)
            }
            
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
            <Link to="/host" className="block w-full">
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

export default Navbar;