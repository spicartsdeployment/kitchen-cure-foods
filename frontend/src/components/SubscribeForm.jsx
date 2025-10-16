import React, { useState } from "react";
import { subscribe } from "../services/EmailService";

export const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    console.log("Subscribed Email:", email);
    e.preventDefault();
    try {
      const response = await subscribe(email);
      alert(response.data.msg);
      alert(response.detail);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Error resetting password");
      alert(err.response?.data?.detail);
    }
  };

  return (
    <>
      <form onSubmit={handleSubscribe} className="space-y-4">
        <div className="flex px-6 py-4 items-center justify-center gap-1">
          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="shadow-sm text-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 w-full"
            required
          />

          {/* Subscribe Button */}
          <button
            type="submit"
            className="px-8 py-2 text-sm border border-green-800 bg-green-800 text-white rounded-lg hover:text-white hover:bg-green-900 hover:cursor-pointer transition-colors duration-300"
          >
            Subscribe
          </button>
        </div>
      </form>
    </>
  );
};
