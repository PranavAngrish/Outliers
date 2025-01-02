import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SignUpStepTwo from './auth2';
import { useDispatch } from 'react-redux';
import api from '../../axios/axios.js';
import GoogleAuthenticate from './googleAuth.jsx';
import { signInStart, signInFailure, signInSuccess } from '../../redux/userSlice';

const InputField = ({ label, type, placeholder, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
      {label}
    </label>
    <input
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
        error ? 'border-red-500' : ''
      }`}
      id={label}
      name={label.toLowerCase()}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
  </div>
);

const PasswordField = ({ value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <div className="relative">
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error ? 'border-red-500' : ''
          }`}
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
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
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

const SignUpStepOne = ({ onNext , setIsGoogleAuth }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleNext = async (data) => {
  //   try {
  //     console.log('HandleNext');
  //     const response = await api.post('/users/user-check', { email: data.email });
  //     if (response.data.exists) {
  //       console.log('We are in the handleNext if function');
  //       dispatch(signInStart());

  //       console.log('User already exists:', response.data.user);
  //       const user = await api.post('/users/google-login', {
  //         email: data.email,
  //         name: data.name,
  //         googlePhotoURL: data.googlePhotoURL,
  //       });
  //       console.log('The user is ', user.data.message);
  //       dispatch(signInSuccess(user.data.message));
  //     } else {
  //       console.log('We are in the handleNext else function');
  //       setFormData(data);
  //       setStep(2);
  //     }
  //   } catch (error) {
  //     dispatch(signInFailure(error.message));
  //     console.error('Error checking email:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    console.log("going");
    console.log('Final data:', formData);
    e.preventDefault();
   
    try {
      console.log('We are going to save');
      const response = await api.post('/users/signup', formData);
      console.log('The data has been saved');
      console.log(response);
    } catch (error) {
      console.log("error has occured");
      console.log(error);
    }
  };

  return (
    <div className="w-full">
     
        <>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up - Step 1</h2>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <PasswordField value={formData.password} onChange={handleChange} error={errors.password} />
            <button
              type="submit"
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Continue
            </button>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-600">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <GoogleAuthenticate onNext={onNext} setIsGoogleAuth={setIsGoogleAuth}/>
        </>
      
    </div>
  );
};

export default SignUpStepOne;

