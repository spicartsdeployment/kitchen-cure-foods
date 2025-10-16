import React, { useState } from "react";
import { loginUser } from "../services/AuthService";
import { getProfileFromToken } from "../services/JwtService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(email, password);
      const user = getProfileFromToken(response);
      console.log("Logged in user:", user);

      window.location.href = "/"; // redirect to home page
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden w-[90vw] max-w-4xl m-4 min-h-[60vh]">
        {/* Left side - Logo */}
        <div className="flex-1 bg-green-700 flex items-center justify-center p-6 md:p-8">
          <img
            src="/src/assets/kcf-logo.jpg"
            alt="Logo"
            className="max-w-[90%] h-auto object-contain"
          />
        </div>

        {/* Right side - Login form */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10 overflow-y-auto">
          <h3 className="text-2xl font-bold text-green-700 mb-2 text-center">
            Welcome Back
          </h3>
          <span className="font-light text-sm mb-6 text-gray-400 text-center">
            Log in to continue your health journey
          </span>

          <form onSubmit={handleSubmit} className="w-full max-w-sm px-8">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-sm mb-3 w-full rounded-lg border border-gray-300 shadow px-3 py-2 placeholder:text-xs 
                     hover:border-gray-600 focus:outline-none focus:border-gray-500 focus:ring-gray-600"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-sm mb-3 w-full rounded-lg border border-gray-300 shadow px-3 py-2 placeholder:text-xs 
                     hover:border-gray-600 focus:outline-none focus:border-gray-500 focus:ring-gray-600"
            />

            {/* Remember me + Forgot Password */}
            <div className="w-full flex justify-between text-xs py-2 px-1 flex-wrap gap-1">
              <label
                htmlFor="remember"
                className="flex items-center text-gray-600"
              >
                <input type="checkbox" id="remember" className="mr-1" />
                Remember Me
              </label>
              <a
                href="/reset-password"
                className="text-green-500 hover:text-green-800 hover:cursor-pointer"
              >
                Forgot Password?
              </a>
            </div>

            {/* Buttons */}
            <div className="w-full py-2">
              <button
                type="submit"
                className="w-full font-semibold text-white py-2 rounded-lg text-sm bg-green-700 hover:bg-green-800 hover:cursor-pointer"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    import.meta.env.VITE_BACKEND_URL + "/auth/google";
                }}
                className="flex w-full font-semibold justify-center items-center text-green-500 border py-2 rounded-lg text-sm mt-2 hover:bg-gray-300 hover:text-green-800 hover:cursor-pointer"
              >
                <img
                  src="/src/assets/google-icon.png"
                  alt="Google"
                  className="w-4 h-4 mr-2"
                />
                <span>Login with Google</span>
              </button>
            </div>

            <span className="text-xs text-gray-400 mt-2 mb-3 block text-center">
              By continuing, you agree to our{" "}
              <a href="#" className="text-gray-500 underline">
                Terms and Privacy Policy
              </a>
            </span>
            <span className="text-xs text-gray-400 mt-2 block text-center">
              Don't have an account?
              <a
                href="/signup"
                className="text-green-500 ml-1 hover:text-green-800 hover:cursor-pointer"
              >
                Register Here
              </a>
            </span>

            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
