import React, { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const ModernDateInput = ({ icon, selected, onChange, placeholderText, onFocus, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const handleDayClick = (day) => {
    onChange(day);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleScroll = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  const handleInputClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    onFocus();
  };

  const disablePastDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div 
        className={`flex items-center cursor-pointer ${
          isActive ? 'bg-gray-100' : ''
        } hover:bg-gray-100 transition-colors duration-200 rounded-full
        p-[8px] pl-[40px] pr-[16px] sm:p-2 sm:pl-2 sm:pr-2`} // Modified padding here
      >
        <span className="absolute left-3 sm:static sm:mr-2 pointer-events-none">{icon}</span>
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={selected ? selected.toLocaleDateString() : ''}
          placeholder={placeholderText}
          className="w-full bg-transparent focus:outline-none cursor-pointer"
          onClick={handleInputClick}
        />
      </div>
      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white shadow-lg rounded-lg overflow-hidden" style={{ top: '100%', left: 0 }}>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleDayClick}
            disabled={disablePastDates}
            modifiers={{
              selected: selected,
              today: new Date(),
            }}
            modifiersStyles={{
              selected: { backgroundColor: '#3b82f6', color: 'white' },
              today: { fontWeight: 'bold' },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ModernDateInput;