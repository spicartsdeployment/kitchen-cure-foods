import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <div
      className="mb-4 bg-cover bg-center flex flex-col items-center w-full overflow-hidden"
      id="Header"
    >
      <Navbar />
    </div>
  );
}
