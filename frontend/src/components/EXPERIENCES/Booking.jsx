// Booking.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

function Booking({ price, taxes, fees }) {
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

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

  const fetchAvailableDates = async () => {
    // TODO: Replace with actual API call
    const mockDates = [
      '2024-08-06', '2024-08-07', '2024-08-08', '2024-08-09', '2024-08-10'
    ];
    setAvailableDates(mockDates);
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

  return (
    <motion.div
      className="sticky top-4 bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Book This Experience</h2>
      
      {/* Date Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={selectedDate || ''}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">Choose a date</option>
          {availableDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
      </div>

      {/* Time Slot Selection */}
      {selectedDate && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Time Slot</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={selectedTimeSlot || ''}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
          >
            <option value="">Choose a time slot</option>
            {availableTimeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      )}
      
      {/* Guest Selection */}
      <div className="mb-4 relative">
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
          <span>Base Price:</span>
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