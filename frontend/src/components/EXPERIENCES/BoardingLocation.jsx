import React from 'react';
import { motion } from 'framer-motion';
import GoogleMapReact from 'google-map-react';

function BoardingLocation({ location }) {
  const Marker = () => <div className="text-red-500 text-4xl">📍</div>;

  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Boarding Location</h2>
      <div className="bg-white rounded-lg shadow-md p-4" style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
          defaultCenter={location || { lat: 37.7749, lng: -122.4194 }}
          defaultZoom={14}
        >
          <Marker lat={location?.lat || 37.7749} lng={location?.lng || -122.4194 } />
        </GoogleMapReact>
      </div>
    </motion.div>
  );
}

export default BoardingLocation;