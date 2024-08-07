import React from 'react';

const VariantPreview = ({ variant, index, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-2">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">Variant {index + 1}: {variant.name}</h4>
        <div>
          <button
            onClick={onEdit}
            className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center mr-2"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600">{variant.description.substring(0, 100)}...</p>
      <p className="text-sm">Price: ${variant.basePrice}</p>
    </div>
  );
};

export default VariantPreview;