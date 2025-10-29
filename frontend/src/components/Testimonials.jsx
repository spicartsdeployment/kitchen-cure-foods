import React, { useState } from "react";
import { testimonials } from "../constants";
import { ChevronLeftIcon, ChevronRightIcon, X } from "lucide-react";
import DialogModal from "./DialogModal";

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
            className="flex-shrink-0 flex gap-2 w-full flex-nowrap"
          >
            {group.map((t, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg shadow p-6 text-center flex flex-col justify-between w-full md:w-1/3 mr-3 hover:shadow-xl hover:border hover:border-green-600 duration-300 transition"
              >
                <h2 className="text-xl font-semibold text-center">{t.title}</h2>
                <p className="text-xs font-light text-gray-500 text-center mb-4">
                  {t.name}
                  <span className="ml-1 text-xs">- {t.role}</span>
                </p>
                <p className="text-md font-light text-left mb-3">
                  "
                  {t.fullMessage.length > 100
                    ? t.fullMessage.slice(0, 100) + "..."
                    : t.fullMessage}
                  "
                </p>
                <button
                  className="mt-4 text-md text-white font-light bg-green-800 px-4 py-1 rounded-lg hover:bg-green-700 transition"
                  onClick={() => setSelectedTestimonial(t)}
                >
                  Read More
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
      <DialogModal
        isOpen={!!selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
        title={selectedTestimonial?.name}
        subtitle={selectedTestimonial?.role}
        content={selectedTestimonial?.fullMessage}
      />
    </div>
  );
};

export default TestimonialCarousel;
