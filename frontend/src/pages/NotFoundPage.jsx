import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col bg-gray-100 items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! Page not found</p>
      <p className="text-gray-500 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 hover:scale-105 active:scale-95 transform transition-transform duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
