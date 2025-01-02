import React, { useEffect, useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa'; // Add FaSpinner for loading state
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Admincustom-datepicker.css";
import GoogleLogin from "./AdminGoogleLogin";
import { useNavigate } from 'react-router-dom';
import { adminSignUp } from '../../../API/index.js';
import { useDispatch } from "react-redux";
import { signInFailure } from '../../../redux/userSlice.js';

const InputField = ({ label, type, placeholder, value, onChange, error, pattern, maxLength }) => (
  <div className="mb-2">
    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={label}>{label}</label>
    <input
      className={`shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
      id={label}
      name={label.toLowerCase().replace(' ', '')}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      pattern={pattern}
      maxLength={maxLength}
      onKeyPress={(event) => {
        if (pattern && !new RegExp(pattern).test(event.key)) {
          event.preventDefault();
        }
      }}
    />
    {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </div>
);

const PasswordField = ({ value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">Create Password</label>
      <div className="relative">
        <input
          className={`shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

const SignUp = ({ onSignInClick }) => {
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    email: user?.email,
    password: '',
    authenticationType: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [backendError, setBackendError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'contactnumber' && (!/^\d*$/.test(value) || value.length > 10)) {
      return;
    }
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prevData => ({
      ...prevData,
      dob: date
    }));
  };

  useEffect(() => {
    if (user?.email) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email,
        name: user.name,
        authenticationType: 'google'
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        authenticationType: 'email-authentication'
      }));
    }
  }, [user]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password && !user) newErrors.password = "Password is required";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password) && !user) {
      newErrors.password = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
    }
    console.log("errors", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError(null);
    if (validateForm()) {
      setIsLoading(true); // Start loading
      try {
        const response = await adminSignUp(formData);
        alert("A verification link has been sent to your email");
        navigate('/');
      } catch (err) {
        dispatch(signInFailure(err.response || err.message));
        console.log(err);
        console.log("An Error occurred!", err.response.data.error);
        alert(err.response.data.error);
  
      } finally {
        setIsLoading(false); // Stop loading after request completes
      }
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-4">
       
        <div className="mb-2">
        </div>
        {
          !user && (
            <InputField 
              label="Email" 
              type="email" 
              placeholder="Your email" 
              value={formData.email} 
              onChange={handleChange} 
              error={errors.email}
            />
          )
        }
        
     
        {
          !user && (
            <div className="col-span-2">
              <PasswordField value={formData.password} onChange={handleChange} error={errors.password} />
            </div>
          )
        }
        
        <button 
          type="submit" 
          className={`col-span-2 mt-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          disabled={isLoading} 
        >
          {isLoading ? <FaSpinner className="animate-spin mr-2" /> : 'Sign Up'}
        </button>
       
      </form>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-600">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center justify-center transition duration-300">
        <FaGoogle className="mr-2" /> <GoogleLogin setUser={setUser}></GoogleLogin>
      </button>
      <p className="text-center mt-4 text-sm">
        Already have an account? {' '}
        <button onClick={onSignInClick} className="text-pink-500 hover:text-pink-600 font-semibold">
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUp;
