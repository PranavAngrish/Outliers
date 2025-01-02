import React from 'react';
import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

function FAQ({ faq }) {
  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">FAQ</h2>
      <div className="space-y-4">
        {faq != null && faq.map((item, index) => (
          <Disclosure as="div" key={index} className="bg-white rounded-lg shadow-md">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-left text-gray-800 font-medium focus:outline-none focus-visible:ring focus-visible:ring-pink-500 focus-visible:ring-opacity-75">
                  <span>{item.question}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'transform rotate-180' : ''
                    } w-5 h-5 text-pink-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-2 pb-4 text-gray-600">
                  {item.answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </motion.div>
  );
}

export default FAQ;