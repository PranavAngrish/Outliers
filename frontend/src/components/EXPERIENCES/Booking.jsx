import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function Booking({ price, taxes, fees }) {
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimeSlotMenuOpen, setIsTimeSlotMenuOpen] = useState(false);
  const guestMenuRef = useRef(null);
  const datePickerRef = useRef(null);
  const timeSlotRef = useRef(null);

  const safePrice = Number(price) || 0;
  const safeTaxes = Number(taxes) || 0;
  const safeFees = Number(fees) || 0;
  const total = (safePrice * (guests.adults + guests.children)) + safeTaxes + safeFees;

  useEffect(() => {
    // Fetch available dates from backend
    fetchAvailableDates();
  }, []);

  useEffect(() => {
    // Fetch available time slots when a date is selected
    if (selectedDate) {
      fetchAvailableTimeSlots(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    // Add event listener to close the dropdown menus when clicking outside
    const handleClickOutside = (event) => {
      if (guestMenuRef.current && !guestMenuRef.current.contains(event.target)) {
        setIsGuestMenuOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
      if (timeSlotRef.current && !timeSlotRef.current.contains(event.target)) {
        setIsTimeSlotMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [guestMenuRef, datePickerRef, timeSlotRef]);

  const fetchAvailableDates = async () => {
    // TODO: Replace with actual API call
    const today = new Date();
    const mockDates = [
      new Date('2024-08-26'), new Date('2024-08-27'), new Date('2024-08-28'),
      new Date('2024-08-22'), new Date('2024-08-30')
    ];
    setAvailableDates(mockDates.filter(date => date >= today));
  };

  const fetchAvailableTimeSlots = async (date) => {
    // TODO: Replace with actual API call
    const mockTimeSlots = [
      '09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'
    ];
    setAvailableTimeSlots(mockTimeSlots);
  };

  const handleGuestChange = (type, change) => {
    setGuests(prevGuests => ({
      ...prevGuests,
      [type]: Math.max(0, prevGuests[type] + change)
    }));
  };

  const totalGuests = guests.adults + guests.children + guests.infants;

  const isDayAvailable = (date) => {
    return availableDates.some(d => d.toDateString() === date.toDateString());
  };

  const isDayPast = (date) => {
    return date < new Date();
  };

  return (
    <motion.div
      className="sticky top-4 bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Book This Experience</h2>

      {/* Date Selection */}
      <div className="mb-4 relative" ref={datePickerRef}>
        <button
          className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-pink-500"
          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
        >
          <span>{selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}</span>
          {isDatePickerOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
        </button>

        <AnimatePresence>
          {isDatePickerOpen && (
            <motion.div
              className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg p-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DayPicker
                selected={selectedDate}
                onDayClick={(date) => {
                  if (isDayAvailable(date)) {
                    setSelectedDate(date);
                    setIsDatePickerOpen(false);
                    fetchAvailableTimeSlots(date);
                  }
                }}
                modifiers={{
                  available: isDayAvailable,
                  past: isDayPast,
                  unavailable: date => !isDayAvailable(date)
                }}
                modifiersStyles={{
                  available: {
                    color: '#000',
                    backgroundColor: '#FFF',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  },
                  past: {
                    color: '#C4C4C4',
                    cursor: 'not-allowed',
                  },
                  unavailable: {
                    color: '#C4C4C4',
                    cursor: 'not-allowed',
                  },
                  selected: {
                    backgroundColor: '#FFC0CB',
                    color: 'white',
                  }
                }}
                modifiersClassNames={{
                  available: 'available',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Time Slot Selection */}
      {selectedDate && (
        <div className="mb-4 relative" ref={timeSlotRef}>
          <button
            className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-pink-500"
            onClick={() => setIsTimeSlotMenuOpen(!isTimeSlotMenuOpen)}
          >
            <span>{selectedTimeSlot || 'Choose a time slot'}</span>
            {isTimeSlotMenuOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
          </button>

          <AnimatePresence>
            {isTimeSlotMenuOpen && (
              <motion.div
                className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {availableTimeSlots.map(slot => (
                  <div
                    key={slot}
                    className="py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    onClick={() => {
                      setSelectedTimeSlot(slot);
                      setIsTimeSlotMenuOpen(false);
                    }}
                  >
                    {slot}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Guest Selection */}
      <div className="mb-4 relative" ref={guestMenuRef}>
        <button
          className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-pink-500"
          onClick={() => setIsGuestMenuOpen(!isGuestMenuOpen)}
        >
          <span>{totalGuests} Guest{totalGuests !== 1 ? 's' : ''}</span>
          {isGuestMenuOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
        </button>

        <AnimatePresence>
          {isGuestMenuOpen && (
            <motion.div
              className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg p-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {Object.entries(guests).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-semibold capitalize">{type}</p>
                    {type === 'adults' && <p className="text-sm text-gray-500">Ages 13 or above</p>}
                    {type === 'children' && <p className="text-sm text-gray-500">Ages 2-12</p>}
                    {type === 'infants' && <p className="text-sm text-gray-500">Under 2</p>}
                  </div>
                  <div className="flex items-center">
                    <button
                      className={`w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 ${count === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'}`}
                      onClick={() => handleGuestChange(type, -1)}
                      disabled={count === 0}
                    >
                      -
                    </button>
                    <span className="mx-4 w-6 text-center">{count}</span>
                    <button
                      className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:border-gray-500"
                      onClick={() => handleGuestChange(type, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Price per person:</span>
          <span>${safePrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Guests:</span>
          <span>{guests.adults + guests.children}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${safePrice.toFixed(2)} x {guests.adults + guests.children}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes:</span>
          <span>${safeTaxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Fees:</span>
          <span>${safeFees.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-2">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Book Now Button */}
      <button
        className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={() => alert('Booking functionality to be implemented')}
        disabled={!selectedDate || !selectedTimeSlot}
      >
        Book Now
      </button>
    </motion.div>
  );
}

export default Booking;