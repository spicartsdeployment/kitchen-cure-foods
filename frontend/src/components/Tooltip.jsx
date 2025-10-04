import React from "react";

const Tooltip = ({ text, children, position = "top" }) => {
  const positionClasses = {
    top: "-top-4 left-4",
    bottom: "top-full left-4 mt-1",
    left: "right-full top-1/2 -translate-y-1/2 -mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "left-3 top-full border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-700",
    bottom: "left-3 -top-2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-700",
    left: "top-1/2 -right-2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-gray-700",
    right: "top-1/2 -left-2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-700",
  };

  return (
    <div className="relative w-full inline-block group">
      {children}

      {/* Tooltip box */}
      <span
        className={`absolute ${positionClasses[position]} 
        bg-gray-700 text-white text-xs rounded px-2 py-1 
        whitespace-nowrap opacity-0 group-hover:opacity-100 
        transition-all duration-200 z-10`}
      >
        {text}

        {/* Arrow */}
        <span className={`absolute w-0 h-0 ${arrowClasses[position]}`}></span>
      </span>
    </div>
  );
};

export default Tooltip;
