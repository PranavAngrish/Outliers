import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Our Story</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Team</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Safety Information</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Cancellation Options</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Events</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">Forum</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-orange-500">partnerships@outliers.com</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">+1 (123) 456-7890</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500">123 Travel Street, Adventure City</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500">&copy; 2024 The Outliers Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;