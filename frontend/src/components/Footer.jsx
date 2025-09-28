import React from "react";
import { Phone, ArrowRight, Mail } from "lucide-react";
import SocialMediaLinks from "./SocialMedia";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleGetInTouch = () => {
    navigate("/contact");
  };
  return (
    <footer className="py-4 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.1)]">
      <div
        className="container mx-auto px-6 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8"
        id="Footer"
      >
        {/* 1st Column */}
        <div className="flex items-center">
          <img
            src="src\assets\kcf-logo.jpg"
            alt="Logo"
            className="h-30 w-auto"
          />
        </div>

        {/* 2nd Column */}
        <div>
          <h4></h4>
          <ul className="space-y-2">
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
        <div>
          <h4 className="font-semibold mb-4">COMPANY</h4>
          <ul className="space-y-2">
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
        <div>
          <h4 className="font-semibold mb-4">RESOURCES</h4>
          <ul className="space-y-2">
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

        {/* 5th Column */}
        <div className="flex flex-col space-y-4 justify-between items-center">
          <ul className="space-y-2">
            <li>
              <button
                className="px-6 py-1 text-sm border border-gray-400 bg-gray-300 text-gray-500 rounded-lg hover:text-gray-800 hover:bg-white hover:cursor-pointer hover:scale-120 active:scale-95 transform transition-transform duration-300 flex items-center gap-2"
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
                <Phone size={15} /> +91 - 7337292216
              </a>
            </li>
            <li>
              <a
                href="mailto:admin@kcf.com?subject:Testing_Email"
                className="hover:text-green-800 flex items-center gap-2 px-2"
              >
                <Mail size={15} /> admin@kcf.com
              </a>
            </li>
          </ul>

          <div className="flex flex-col justify-between items-center">
            <h2 className="text-md text-gray-500 py-2">FOLLOW US</h2>
            <SocialMediaLinks />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-8 py-2 mt-8">
        <p className="text-sm">
          Copyright &copy; 2025 KCF Pvt Limited. All rights reserved.
        </p>
        <p className="text-sm text-gray-400">Terms of Use & Privacy Policy</p>
      </div>
    </footer>
  );
}
