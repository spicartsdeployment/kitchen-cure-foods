import React, { useState } from "react";
import { resetPassword } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword({ email, dob, new_password });
      setMessage(res.msg);
      alert(res.msg);
      navigate("/"); // redirect to home page
    } catch (err) {
      setMessage(err.response?.data?.detail || "Error resetting password");
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
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-indigo-200">
      <div className="relative bg-white rounded-4xl shadow-lg overflow-hidden w-[40vh] max-w-full min-h-[50vh] m-4">
        <div className={"absolute top-0 left-0 h-full w-full opacity-100 z-0"}>
          <form
            onSubmit={handleReset}
            className="h-full flex flex-col justify-center items-center px-10"
          >
            <div className="flex space-x-3 mb-4">
              <SocialIcon icon={<User size={18} />} />
            </div>
            <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
            <span className="text-sm mb-2">
              enter registered email & birth date
            </span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mb-2 rounded-lg bg-gray-200 text-sm"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}              
              className="w-full p-3 mb-2 rounded-lg bg-gray-200 text-sm"
            />

            <input
              type="password"
              placeholder="New Password"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-3 mb-2 rounded-lg bg-gray-200 text-sm"
            />
            <button
              type="submit"
              className="text-white py-2 px-8 rounded-4xl text-xs font-semibold mt-4
               bg-gradient-to-r from-pink-800 to-pink-500 hover: cursor-pointer"
            >
              Confirm
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
