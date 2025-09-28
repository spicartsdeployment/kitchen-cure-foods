import React, { useState, useRef, useEffect } from "react";
import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const UserMenu = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover:cursor-pointer"
      >
        <UserCircle className="w-5 h-5 text-green-700 hover:text-green-800 hover:cursor-pointer" />
        <span className="">{user?.name}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 border-gray-300 bg-gray-100 rounded-2xl shadow-lg py-2 z-50 animate-fade-in">
          <h4 className="px-4 py-2 font-light text-sm  text-black">
            {user?.email}
          </h4>
          <button
            onClick={() => handleNavigate("/profile")}
            className="block w-full font-light text-left text-sm rounded-4xl px-4 py-2 transition-all duration-200 
             hover:bg-gradient-to-r hover:from-green-800 hover:to-green-600 hover:text-white hover:cursor-pointer"
          >
            Profile
          </button>
          <button
            onClick={() => handleNavigate("/")}
            className="block w-full font-light text-left text-sm rounded-4xl px-4 py-2 transition-all duration-200 
             hover:bg-gradient-to-r hover:from-green-800 hover:to-green-600 hover:text-white hover:cursor-pointer"
          >
            Orders
          </button>
          <button
            onClick={logout}
            className="block w-full font-light text-left text-sm rounded-4xl px-4 py-2 transition-all duration-200 
             hover:bg-gradient-to-r hover:from-red-800 hover:to-red-600 hover:text-white hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
