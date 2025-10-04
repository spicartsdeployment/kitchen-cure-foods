import React, { useState } from "react";
import { loginUser } from "../services/AuthService";
import { getProfileFromToken } from "../services/JwtService";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="relative bg-white rounded-4xl shadow-lg overflow-hidden w-[40vh] max-w-full min-h-[50vh] m-4">
        <div className={"absolute top-0 left-0 h-full w-full opacity-100 z-0"}>
          <form
            onSubmit={handleSubmit}
            className="h-full flex flex-col justify-center items-center px-10"
          >
            <h3 className="text-xl font-bold">Welcome Back</h3>
            <span className="font-light text-sm mt-2 mb-4 text-gray-400">
              Log in to continue your health journey
            </span>

            {/* input fields */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-sm mb-3 w-full rounded-lg border border-green-500 shadow px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-sm mb-3 w-full rounded-lg border border-green-500 shadow px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />

            {/* Remember me and Forgot Password */}
            <div className="w-full flex justify-between text-center text-xs py-2 px-1">
              <div>
                <input type="checkbox" id="remember" className="mr-1" />
                <label htmlFor="remember" className="text-xs text-gray-600">
                  Remember Me
                </label>
              </div>
              <a href="/reset-password" className="text-xs text-green-500">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <div className="w-full justify-center items-center py-2">
              <button
                type="submit"
                className="w-full text-white py-2 px-8 rounded-lg text-sm 
               bg-green-500 hover:cursor-pointer hover:bg-green-600"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    import.meta.env.VITE_BACKEND_URL + "/auth/google";
                }}
                className="flex w-full justify-center items-center text-green-500 border py-2 px-8 rounded-lg text-sm mt-2 hover:cursor-pointer hover:bg-gray-200"
              >
                <img
                  src="/src/assets/google-icon.png"
                  alt="Google"
                  className="w-4 h-4 mr-2"
                />
                <span>Login with Google</span>
              </button>
            </div>

            <span className="text-xs text-gray-400 mt-2">
              Don't have an account?
              <a href="/signup" className="text-green-500 ml-1">
                Register Here
              </a>
            </span>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
