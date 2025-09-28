import React from "react";

export const DialogBox = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md", // sm | md | lg
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-90 bg-opacity-10"
        onClick={onClose}
      ></div>

      {/* Dialog */}
      <div
        className={`relative bg-white rounded-xl shadow-lg w-full ${sizeClasses[size]} mx-4 p-6`}
      >
        {/* Header */}
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        )}

        {/* Body */}
        <div className="mb-4">{children}</div>

        {/* Footer */}
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
};
