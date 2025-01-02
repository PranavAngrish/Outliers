import React, { useState } from "react";

import SignInForm from "./SignIn";
import backgroundImage from "/src/assets/outliers/jaipur.jpg";
import "./AuthForm.css";
import SignUp from "./SignUp";
import { Link } from "react-router-dom";


const AuthForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const NavButton = ({ className, children }) => (
    <button
      className={`px-3 py-1 lg:px-4 lg:py-2 text-sm lg:text-base rounded-full transition duration-300 transform hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );

  console.log("AuthForm")

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="form-container">
      <Link to="/adminauth">
              <NavButton className="bg-pink-500 text-white hover:bg-pink-600">
                Log In
              </NavButton>
      </Link>
        <div className={`flip-container ${isFlipped ? "flipped" : ""}`}>
          <div className="flipper">
            <div className="front">
              <SignInForm onSignUpClick={handleFlip} />
            </div>
            <div className="back">
              {/* <SignUpForm onSignInClick={handleFlip} />   */}
              <SignUp onSignInClick={handleFlip} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;