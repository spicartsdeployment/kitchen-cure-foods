import React from "react";

export default function SignupButton({ onSignUp }) {
  return (
    <button
      className="px-8 py-2 text-sm border border-green-800 bg-green-800 text-white rounded-lg hover:text-green-800 hover:bg-white hover:cursor-pointer hover:scale-105 active:scale-95 transform transition-transform duration-300"
      onClick={onSignUp}
    >
      Signup
    </button>
  );
}
