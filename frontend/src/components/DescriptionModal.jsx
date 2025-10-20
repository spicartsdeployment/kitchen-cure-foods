import React from "react";
import { X } from "lucide-react";

const DescriptionModal = ({ title, description, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl hover:cursor-pointer"
        >
          <X size={15} />
        </button>
        <h2 className="text-2xl font-semibold mb-3 text-green-700">{title}</h2>
        <p className="text-gray-700 max-h-[60vh] overflow-y-auto pr-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default DescriptionModal;
