import React, { useState } from "react";
import { loginUser } from "../services/AuthService";
import { getProfileFromToken } from "../services/JwtService";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(email, password);
      const user = getProfileFromToken(response);
      console.log("Logged in user:", user);

      // navigate("/")
      window.location.href = "/"; // redirect to home page
    } catch (err) {
      setError(err.message || "Login failed");
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
            onSubmit={handleSubmit}
            className="h-full flex flex-col justify-center items-center px-10"
          >
            <div className="flex space-x-3 mb-4">
              <SocialIcon icon={<User size={18} />} />
            </div>
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <span className="text-sm mb-2">
              enter registered email & password
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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mb-2 rounded-lg bg-gray-200 text-sm"
            />
            <a href="/reset-password" className="text-xs text-gray-500 my-2">
              Forget Your Password?
            </a>
            <button
              type="submit"
              className="text-white py-2 px-8 rounded-4xl text-xs font-semibold mt-4
               bg-gradient-to-r from-indigo-800 to-indigo-500 hover: cursor-pointer hover:scale-120 active:scale-95 transform transition-transform duration-300"
            >
              Login
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
