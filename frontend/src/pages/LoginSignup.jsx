import { motion } from "framer-motion";
import React, { useState } from "react";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        {/* Header */}
        <motion.h2
          key={isLogin ? "login" : "signup"}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold text-gray-800 text-center mb-6"
        >
          {isLogin ? "Welcome Back 👋" : "Create an Account 🚀"}
        </motion.h2>

        {/* Form */}
        <form className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social login */}
        <div className="flex justify-center gap-4">
          <button className="p-2 border rounded-lg hover:bg-gray-50 transition">
            <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" className="w-5 h-5" />
          </button>
          <button className="p-2 border rounded-lg hover:bg-gray-50 transition">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-5 h-5" />
          </button>
        </div>

        {/* Switch mode */}
        <p className="mt-6 text-sm text-center text-gray-600">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline font-medium"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
