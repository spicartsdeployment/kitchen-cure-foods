import React from "react";
import { Twitter, Instagram, Youtube } from "lucide-react";

export default function SocialMediaLinks() {
  return (
    <div className="flex gap-4">
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-sky-500 hover:cursor-pointer hover:scale-105 active:scale-95 transform
        transition-transform duration-300"
      >
        <Twitter size={15} />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-pink-500 hover:cursor-pointer hover:scale-105 active:scale-95 transform
        transition-transform duration-300"
      >
        <Instagram size={15} />
      </a>
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-red-600 hover:cursor-pointer hover:scale-105 active:scale-95 transform
        transition-transform duration-300"
      >
        <Youtube size={15} />
      </a>
    </div>
  );
}
