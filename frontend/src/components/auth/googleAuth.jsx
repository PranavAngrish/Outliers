
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function GoogleAuthenticate({onNext}) {



    const handleGoogleSignIn = async () => {
        console.log("we are in Google sign in");
    
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          const { displayName, email } = result.user;
          console.log("Leaving the handleGoogleSignIn function");
          console.log("The data till now is as follows", displayName, email);
          setIsGoogleAuth(true);
    
          onNext({ email, name: displayName, password: '' }); // Proceed to next step with Google sign-in data
        } catch (error) {
          console.error('Error signing in with Google:', error.message);
        }
      };



  return (
    <div>
       
            <button onClick={handleGoogleSignIn} className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center justify-center transition duration-300">
            <FaGoogle className="mr-2" /> Sign up with Google
        </button>

      
    </div>
  )
}

export default GoogleAuthenticate;
