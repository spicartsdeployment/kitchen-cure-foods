import React, { useContext, useState } from "react";
import { Phone, ArrowRight, Mail } from "lucide-react";
import SocialMediaLinks from "./SocialMedia";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Footer() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetInTouch = () => {
    navigate("/contact");
  };
  return (
    <footer className="py-4 w-full bg-zinc-50 border-t border-gray-300">
      <div
        className="container mt-6 mx-auto px-6 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4"
        id="Footer"
      >
        {/* 1st Column */}
        <div className="flex justify-center items-center">
          <img
            src="src\assets\kcf-logo.jpg"
            alt="Logo"
            className="h-auto w-full"
          />
        </div>

        {isLoggedIn == true ? (
          <>
            {/* 2nd Column */}
            <div className="text-center">
              <h4></h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/consult" className="hover:text-green-800">
                    Consultation Room
                  </a>
                </li>
                <li>
                  <a href="/products" className="hover:text-green-800">
                    Products
                  </a>
                </li>
              </ul>
            </div>

            {/* 3rd Column */}
            <div className="text-center">
              <h4 className="text-sm font-bold mb-4">COMPANY</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/about" className="hover:text-green-800">
                    About
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-green-800">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/locations" className="hover:text-green-800">
                    Locations
                  </a>
                </li>
                <li>
                  <a href="/use-cases" className="hover:text-green-800">
                    Use Cases
                  </a>
                </li>
              </ul>
            </div>

            {/* 4th Column */}
            <div className="text-center">
              <h4 className="text-sm font-bold mb-4">RESOURCES</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/blog" className="hover:text-green-800">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/events" className="hover:text-green-800">
                    Events
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-green-800">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/research" className="hover:text-green-800">
                    Research
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          // If not logged in, render empty divs to maintain layout
          <>
            <div></div>
            <div></div>
            <div></div>
          </>
        )}

        {/* 5th Column */}
        <div className="flex flex-col space-y-4 justify-between items-center">
          <ul className="space-y-2 text-sm">
            <li>
              <button
                className="px-6 py-2 mb-4 text-sm bg-green-800 rounded-lg hover:bg-green-700 text-white cursor-pointer transform transition-transform duration-300 flex items-center gap-2"
                onClick={handleGetInTouch}
              >
                Get in Touch <ArrowRight size={15} />
              </button>
            </li>
            <li>
              <a
                href="tel:+917337292216"
                className="hover:text-green-800 flex items-center gap-2 px-2"
              >
                <Phone size={20} className="px-1 py-1 border rounded-full" />
                +91 7337292216
              </a>
            </li>
            <li>
              <a
                href="mailto:admin@kcf.com?subject:Testing_Email"
                className="hover:text-green-800 flex items-center gap-2 px-2"
              >
                <Mail size={20} className="px-1 py-1 border rounded-full" />
                admin@kcf.com
              </a>
            </li>
          </ul>

          <div className="flex flex-col justify-between items-center">
            <h2 className="text-sm font-semibold py-2">Follow Us</h2>
            <SocialMediaLinks />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4 px-25 mt-8">
        <p className="text-[10px]">
          Copyright &copy; 2025 KCF Pvt Limited. All rights reserved.
        </p>
        <a href="/terms-and-conditions" className="text-[10px] text-gray-400">
          Terms of Use & Privacy Policy
        </a>
      </div>
    </footer>
  );
}
