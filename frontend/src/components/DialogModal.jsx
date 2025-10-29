import React, { useEffect } from "react";
import { X } from "lucide-react";

const DialogModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  content,
  children, // optional custom content instead of default layout
  width = "max-w-lg", // optional width override
}) => {
  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800/50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg w-full ${width} relative shadow-xl max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (fixed) */}
        <div className="sticky top-0 rounded-lg bg-white z-10 px-6 pt-4 pb-3 border-b border-gray-200 flex justify-between items-center">
          {title && (
            <h3 className="text-2xl font-bold text-green-800 text-center flex-1">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition ml-4"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="px-6 py-4 overflow-y-auto">
          {children ? (
            children
          ) : (
            <>
              {subtitle && (
                <p className="text-md font-light text-gray-600 text-center italic mb-4">
                  - {subtitle}
                </p>
              )}
              {content && (
                <p className="text-sm font-light text-justify px-2">
                  {content}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogModal;
