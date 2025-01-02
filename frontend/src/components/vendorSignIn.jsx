import React, { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { signInVendorStart, signInVendorFailure, signInVendorSuccess } from '../redux/vendorSlice.js';
import api from '../axios/axios.js';
import { useNavigate } from 'react-router-dom';

const InputField = ({ label, type, placeholder, value, onChange, error }) => (
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={label}>{label}</label>
    <input
      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
      id={label}
      name={label.toLowerCase()}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
  </div>
);

const PasswordField = ({ value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">Password</label>
      <div className="relative">
        <input
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
            error ? 'border-red-500' : 'border-gray-300'
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
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-pink-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

const VendorSignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("We are going there");
      dispatch(signInVendorStart());
      try {
        const res = await api.post('/vendors/signin', formData);
        localStorage.setItem('authToken', res.data.token);
        dispatch(signInVendorSuccess(res.data));
        navigate('/vendor', { state: { vendor: res.data.vendor } });
      } catch (error) {
        dispatch(signInVendorFailure(error));
        alert(error.response.data.message);
        if(error.status === 403){
          navigate("/");
        }
      }
    }
  };

  const onSignUpClick = () => {
    navigate('/host');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">Vendor Sign In</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <PasswordField
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 rounded text-pink-600 focus:ring-pink-500"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
            </div>
            <a href="#" className="text-sm text-pink-500 hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-pink-500 text-white font-bold rounded-lg shadow-lg hover:bg-pink-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 flex items-center justify-center">
          <span className="text-gray-500">Or sign in with</span>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <button className="flex items-center py-2 px-4 bg-gray-100 border rounded-lg shadow hover:bg-gray-200 transition duration-300">
            <FaGoogle className="text-red-500 mr-2" />
            Google
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <button
            onClick={onSignUpClick}
            className="text-pink-500 hover:underline font-semibold"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default VendorSignIn;
