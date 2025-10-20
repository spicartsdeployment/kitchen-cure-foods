import React, { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserMenu } from "./UserMenu";
import LoginButton from "../components/LoginButton";
import SignupButton from "../components/SignupButton";

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsOpen(false);
    navigate("/login", { state: { from: window.location.pathname } });
  };

  const handleSignup = () => {
    setIsOpen(false);
    navigate("/signup", { state: { from: window.location.pathname } });
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo/Image */}
        <div className="flex items-center">
          <a href="/">
            <img
              src="src\assets\kcf-logo.jpg"
              alt="Logo"
              className="h-20 w-auto"
            />
          </a>
        </div>

        {isLoggedIn && (
          <div className="hidden md:flex space-x-8 font-light">
            <a href="/consult" className="hover:text-green-800">
              Consultation Room
            </a>
            <a href="/services" className="hover:text-green-800">
              Services
            </a>
            <a href="/products" className="hover:text-green-800">
              Products
            </a>
            <a href="/about" className="hover:text-green-800">
              About Us
            </a>
            <a href="/resources" className="hover:text-green-800">
              Resources
            </a>
            <a href="/contact" className="hover:text-green-800">
              Contact Us
            </a>
          </div>
        )}

        {/* Right Side Buttons */}
        <div className="hidden md:flex space-x-4">
          {user ? (
            <UserMenu user={user} logout={logout} />
          ) : (
            <>
              <LoginButton onLogin={handleLogin} />
              <SignupButton onSignUp={handleSignup} />
            </>
          )}
        </div>

        {/* Hamburger (mobile only) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-3 space-y-3">
          <a href="/consult" className="block hover:text-green-800">
            Consultation Room
          </a>
          <a href="/products" className="block hover:text-green-800">
            Products
          </a>
          <a href="/about" className="block hover:text-green-800">
            About Us
          </a>
          <a href="/resources" className="block hover:text-green-800">
            Resources
          </a>
          <a href="/contact" className="block hover:text-green-800">
            Contact Us
          </a>
          <div className="flex space-x-4 mt-3">
            {user ? (
              <UserMenu user={user} logout={logout} />
            ) : (
              <>
                <LoginButton onLogin={handleLogin} />
                <SignupButton onSignUp={handleSignup} />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
