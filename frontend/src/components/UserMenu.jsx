import React, { useState, useRef, useEffect } from "react";
import { UserCircle, ChevronRight } from "lucide-react";
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
        className="flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <UserCircle size={24} className="text-gray-700 hover:cursor-pointer" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
          <h4 className="px-4 py-2 text-sm font-medium line-clamp-1 border-b border-gray-300">
            {user?.email}
          </h4>
          <button
            onClick={() => handleNavigate("/profile")}
            className="block w-full font-light text-left text-sm rounded-4xl px-4 py-2 transition-all duration-200 
             hover:bg-gradient-to-r hover:from-zinc-400 hover:to-zinc-400 hover:text-white hover:cursor-pointer"
          >
            <span className="flex justify-start">
              <ChevronRight size={15} />
              Profile
            </span>
          </button>
          <button
            onClick={() => handleNavigate("/")}
            className="block w-full font-light text-left text-sm rounded-4xl px-4 py-2 transition-all duration-200 
             hover:bg-gradient-to-r hover:from-zinc-400 hover:to-zinc-400 hover:text-white hover:cursor-pointer"
          >
            <span className="flex justify-start">
              <ChevronRight size={15} />
              Orders
            </span>
          </button>
          <button
            onClick={logout}
            className="block w-full font-light text-left text-sm rounded-4xl px-4 py-2 transition-all duration-200 
             hover:bg-gradient-to-r hover:from-zinc-400 hover:to-zinc-400 hover:text-white hover:cursor-pointer"
          >
            <span className="flex justify-start">
              <ChevronRight size={15} />
              Logout
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
