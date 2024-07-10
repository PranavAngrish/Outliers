import React from 'react';
import DatePicker from 'react-datepicker';

const DateInput = ({ icon, selected, onChange, placeholderText, onFocus, isActive }) => (
  <div className="relative flex-grow group">
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
      {icon}
    </div>
    <DatePicker
      selected={selected}
      onChange={onChange}
      placeholderText={placeholderText}
      className={`w-full pl-10 pr-4 py-2 bg-transparent focus:outline-none group-hover:bg-gray-100 rounded-full transition-colors duration-200 ${isActive ? 'text-black' : 'text-gray-500'}`}
      onFocus={onFocus}
    />
  </div>
);

export default DateInput;