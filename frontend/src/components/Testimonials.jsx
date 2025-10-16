import React, { useState } from "react";
import { testimonials } from "../constants";
import { ChevronLeftIcon, ChevronRightIcon, X } from "lucide-react";

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const itemsPerSlide = 3;

  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // Create slides of 3 items each
  const slides = [];
  for (let i = 0; i < testimonials.length; i += itemsPerSlide) {
    slides.push(testimonials.slice(i, i + itemsPerSlide));
  }

  // If last slide has less than 3, wrap items from start
  if (slides[slides.length - 1].length < itemsPerSlide) {
    const needed = itemsPerSlide - slides[slides.length - 1].length;
    slides[slides.length - 1] = [
      ...slides[slides.length - 1],
      ...testimonials.slice(0, needed),
    ];
  }

  return (
    <div className="relative p-6 max-w-6xl mx-auto overflow-hidden">
      {/* Slider Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((group, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 flex gap-6 w-full flex-nowrap"
          >
            {group.map((t, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg shadow p-4 text-center flex flex-col justify-between w-full md:w-1/3"
              >
                <h2 className="text-lg text-left mb-3">{t.title}</h2>
                <p className="text font-light text-left mb-3">
                  "
                  {t.fullMessage.length > 100
                    ? t.fullMessage.slice(0, 100) + "..."
                    : t.fullMessage}
                  "
                </p>
                <button
                  className="mt-4 text-right px-3 py-1 hover:cursor-pointer hover:text-gray-400 transition"
                  onClick={() => setSelectedTestimonial(t)}
                >
                  Read More...
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Navigation Buttons bottom-left */}
      <div className="py-4 bottom-4 flex gap-2">
        <button
          onClick={prevSlide}
          className="border border-gray-500 rounded-lg text-green-700 px-3 py-1 hover:bg-green-800 hover:text-white hover:cursor-pointer transition"
        >
          <ChevronLeftIcon size={15} />
        </button>
        <button
          onClick={nextSlide}
          className="border border-gray-500 rounded-lg text-green-700 px-3 py-1 hover:bg-green-800 hover:text-white hover:cursor-pointer transition"
        >
          <ChevronRightIcon size={15} />
        </button>
      </div>

      {/* Modal Dialog */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 bg-black opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <X />
            </button>
            {/* <img
              src={selectedTestimonial.img}
              alt={selectedTestimonial.name}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            /> */}
            <h3 className="text-xl font-semibold text-green-800 text-center">
              {selectedTestimonial.name}
            </h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              {selectedTestimonial.role}
            </p>
            <p className="font-light text-justify">
              {selectedTestimonial.fullMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
