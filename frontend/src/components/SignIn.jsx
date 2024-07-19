// SignIn.jsx
import React, { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';

const InputField = ({ label, type, placeholder, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>{label}</label>
    <input
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
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
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
      <div className="relative">
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
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

const SignIn = ({ onSignUpClick }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Email" type="email" placeholder="Your email" value={formData.email} onChange={handleChange} error={errors.email} />
        <PasswordField value={formData.password} onChange={handleChange} error={errors.password} />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
          </div>
          <a href="#" className="text-sm text-pink-500 hover:text-pink-600">Forgot Password?</a>
        </div>
        <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
          Sign In
        </button>
      </form>
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-600">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center justify-center transition duration-300">
        <FaGoogle className="mr-2" /> Sign in with Google
      </button>
      <p className="text-center mt-6 text-sm">
        Don't have an account? {' '}
        <button onClick={onSignUpClick} className="text-pink-500 hover:text-pink-600 font-semibold">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default SignIn;