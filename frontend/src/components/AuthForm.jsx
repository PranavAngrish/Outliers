import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import backgroundImage from '/src/assets/outliers/jaipur.jpg';
import './AuthForm.css';

const AuthForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="form-container">
        <div className={`flip-container ${isFlipped ? 'flipped' : ''}`}>
          <div className="flipper">
            <div className="front">
              <SignUp onSignInClick={handleFlip} />
            </div>
            <div className="back">
              <SignIn onSignUpClick={handleFlip} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;