import React from "react";

export default function LoginButton({ onLogin }) {
  return (
    <button
      className="px-8 py-2 text-sm border border-green-800 text-green-800 rounded-lg hover:bg-green-800 hover:text-white hover:cursor-pointer hover:scale-120 active:scale-95 transform
        transition-transform duration-300"
      onClick={onLogin}
    >
      Login
    </button>
  );
}
