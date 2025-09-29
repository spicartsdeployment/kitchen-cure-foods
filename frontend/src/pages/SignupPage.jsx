import React, { useState } from "react";
import { createUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await createUser(
        name,
        email,
        password,
        phone,
        dob,
        gender
      );

      window.location.href = "/"; // redirect to home page
    } catch (err) {
      setError(err || "Signup failed!");
    }
  };

  const SocialIcon = ({ icon }) => {
    return (
      <a
        href="#"
        className="border border-gray-300 rounded-full w-10 h-10 flex justify-center items-center text-gray-600 hover:scale-110 transition"
      >
        {icon}
      </a>
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-green-200">
      <div className="relative bg-white rounded-4xl shadow-lg overflow-hidden w-[40vh] max-w-full min-h-[60vh] m-4">
        <div className="absolute top-0 left-0 h-full w-full opacity-100 z-0">
          <form
            onSubmit={handleSignup}
            className="h-full flex flex-col justify-center items-center px-10"
          >
            <div className="flex space-x-3 mb-4">
              <SocialIcon icon={<User size={18} />} />
            </div>
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <span className="text-sm mb-2">
              Please fill the details for registration
            </span>

            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name (required)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 mb-2 rounded-lg bg-blue-100 text-sm"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email (required)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mb-2 rounded-lg bg-blue-100 text-sm"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password (required)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mb-2 rounded-lg bg-blue-100 text-sm"
            />

            {/* Phone Number */}
            <input
              type="tel"
              placeholder="Phone Number (optional)"
              value={phone}
              onChange={(e) => {
                // allow only numbers
                const val = e.target.value.replace(/\D/g, "");
                setPhone(val);
              }}
              required
              className="w-full p-3 mb-2 rounded-lg bg-blue-100 text-sm"
            />

            {/* Date of Birth */}
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 mb-2 rounded-lg bg-blue-100 text-sm"
            />

            {/* Gender */}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 mb-2 rounded-lg bg-blue-100 text-sm"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {/* Submit Button */}
            <button
              type="submit"
              className="text-white py-2 px-8 rounded-4xl text-xs font-semibold mt-4
               bg-gradient-to-r from-green-800 to-green-500 hover: cursor-pointer hover:scale-105 active:scale-95 transform transition-transform duration-300"
            >
              Sign Up
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
