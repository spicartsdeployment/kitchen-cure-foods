import React, { useContext, useState } from "react";
import { OfferedServices, HowItWorksImages } from "../constants";
import AppointmentForm from "../components/AppointmentForm";
import VideoPlayer from "../components/VideoPlayer";
import TestimonialCarousel from "../components/Testimonials";
import StatsCounter from "../components/StatsCounter";
import ScrollToTop from "../components/ScrollToTop";
import TestimonialCarousel2 from "../components/TestimonialCarousel2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBookConsultation = () => {
    console.log("Book Consultation clicked!");
    navigate("/consult", { state: { showForm: true } });
  };

  return (
    <section>
      <div className="container mx-auto py-32 px-6 md:px-20 lg:px-32 flex flex-col md:flex-row items-center gap-12">
        {/* Left Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-5xl sm:text-6xl md:text-[82px] font-thin leading-tight !text-green-800">
            Healing Begins in Your Kitchen
            <span>
              <img
                src="/src/assets/plant.gif"
                alt="plant"
                className="w-16 h-16 inline align-middle"
              />
            </span>
          </h2>
          <h2 className="mt-4 text-2xl">
            Personalized Nutrition & Holistic Diabetes Care in Your Community
          </h2>
          <div className="mt-6">
            <button
              className="px-6 py-3 border border-green-800 rounded-lg hover:bg-green-800 hover:text-white hover:cursor-pointer hover:scale-105 active:scale-95  transform
        transition-transform duration-300"
              onClick={() => handleBookConsultation()}
            >
              Book Your First Consultation
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex flex-1 justify-center items-center">
          <img
            src="src/assets/1.jpg"
            alt="Healthy Lifestyle"
            className="max-w-full h-auto rounded-lg object-contain"
          />
        </div>
      </div>

      {/* What We Offer */}
      <div className="py-6 flex flex-col justify-center bg-gray-50">
        <h2 className="px-4 py-8 text-3xl text-center sm:text-xl md:text-[52px] font-light leading-tight text-green-800">
          What We Offer
        </h2>
        <div className="px-8 mb-10 flex flex-wrap justify-center gap-6">
          {OfferedServices.map((service, index) => (
            <div
              key={index}
              className="bg-white w-80 py-8 flex flex-col items-center text-center border border-gray-300 rounded-4xl p-4 shadow-lg"
            >
              <img
                className="w-30 mb-6 object-contain"
                src={service.img}
                alt={service.title}
              />
              <h3 className="text-xl font-medium text-green-800">
                {service.title}
              </h3>
              <p className="text-sm text-center px-2 mt-2">{service.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="py-6 flex flex-col bg-green-50 justify-center">
        <h2 className="px-4 py-8 mb-4 text-3xl text-center sm:text-xl md:text-[52px] font-light leading-tight text-green-800">
          How It Works
        </h2>
        <div className="relative flex justify-center gap-6 px-8 flex-wrap">
          {HowItWorksImages.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center w-70 py-8"
            >
              <div className="w-70 h-24 flex items-center justify-center rounded-lg shadow-lg mb-12">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full object-contain rounded-lg"
                />
              </div>
              <h2 className="text-2xl font-medium mb-1">{service.title}</h2>
            </div>
          ))}
        </div>
      </div>

      <TestimonialCarousel2 />

      {/* Stats Counter */}
      <div className="py-4 mb-4 flex flex-col bg-green-50 justify-center">
        <StatsCounter />
      </div>

      <div className="py-6 mb-4 flex flex-col justify-center">
        <h2 className="py-4 font-medium text-4xl text-center">Testimonials</h2>
        <TestimonialCarousel />
      </div>

      {isLoggedIn && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-10 items-center bg-gray-50">
          <AppointmentForm />
          <div className="px-8 py-8 bg-green-50 w-full">
            <h2 className="py-4 text-4xl text-center text-gray-700">
              &#8220; We take Care Your Health &#8221;
            </h2>
            <VideoPlayer src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
          </div>
        </div>
      )}

      <ScrollToTop />
    </section>
  );
};

export default HomePage;
