import React, { useState } from "react";
import { customerTestimonials } from "../constants";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const TestimonialCarousel2 = () => {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((prevIndex) =>
      prevIndex === 0 ? customerTestimonials.length - 1 : prevIndex - 1
    );

  const next = () =>
    setIndex((prevIndex) =>
      prevIndex === customerTestimonials.length - 1 ? 0 : prevIndex + 1
    );

  return (
    <div className="flex flex-col items-center justify-center py-10 w-full">
      {/* Header row with nav buttons */}
      <div className="flex items-center justify-between w-full max-w-4xl p-6 mb-1">
        <h2 className="text-4xl font-medium">
          Customer Testimonials
          <span>
            <img
              src="/src/assets/Running-heart.gif"
              alt="Loading..."
              className="w-6 h-auto inline align-middle ml-2 mb-1"
            />
          </span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="border border-gray-500 rounded-lg text-green-700 px-3 py-1 hover:cursor-pointer hover:bg-green-800 hover:text-white transition"
          >
            <ChevronLeftIcon size={25} />
          </button>
          <button
            onClick={next}
            className="border border-gray-500 rounded-lg text-green-700 px-3 py-1 hover:cursor-pointer hover:bg-green-800 hover:text-white transition"
          >
            <ChevronRightIcon size={25} />
          </button>
        </div>
      </div>

      {/* Carousel container */}
      <div className="relative max-w-4xl w-full px-6 overflow-hidden">
        {/* Big blockquote symbol */}
        <span className="absolute top-2 left-2 text-green-800 text-7xl font-serif opacity-40">
          &ldquo;
        </span>

        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {customerTestimonials.map((item) => (
            <div key={item.id} className="min-w-full px-4 py-2">
              <div
                className="relative bg-green-800 text-white 
                rounded-tl-4xl rounded-br-4xl rounded-tr-xl rounded-bl-xl 
                shadow-lg p-10 h-50 flex flex-col justify-between"
              >
                {/* Text content */}
                <p className="text-md relative z-10 overflow-hidden line-clamp-5">
                  “{item.text}”
                </p>

                {/* Author info at bottom */}
                <div className="mt-4">
                  <h4 className="text-sm relative z-10">{item.author}</h4>
                  <h4 className="text-xs relative z-10">{item.role}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel2;
