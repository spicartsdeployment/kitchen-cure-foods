import React from "react";
import { ConsultationBenefits } from "../constants";
import ScrollToTop from "../components/ScrollToTop";
import ConsultationSliderForm from "../components/ConsultationSliderForm";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ConsultationPage = () => {
  const location = useLocation();
  const formRef = useRef(null);

  useEffect(() => {
    if (location.state?.showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  return (
    <section>
      <div className="container mx-auto py-25 px-6 md:px-20 lg:px-25 flex flex-col items-center bg-gray-50">
        <div className="flex flex-col justify-center bg-green-100 bg-opacity-50 px-6 py-2 rounded-4xl">
          <h3 className="text-center text-xl font-semibold text-green-800">
            Free Health Consultation
          </h3>
        </div>

        <div className="px-6 py-2 flex flex-col justify-center">
          <h2 className="px-4 py-4 text-center text-4xl font-semibold">
            Start Your Healing Journey Today
          </h2>
          <p className="px-12 text-center font-light text-lg">
            Book a personalized consultation with our certified nutritionists to
            create your custom healing plan based on your unique health needs.
          </p>
        </div>
      </div>

      {/* Your What You'll Get in Your Consultation */}
      <div className="mb-4 flex flex-col justify-center">
        <h4 className="px-4 py-4 text-4xl text-center font-semibold leading-tight">
          Your What You'll Get in Your Consultation
        </h4>
        <div className="px-8 py-4 flex flex-wrap justify-center gap-8">
          {ConsultationBenefits.map((service, index) => (
            <div
              key={index}
              className="w-80 flex flex-col items-center text-center rounded-2xl p-4 shadow-md bg-green-100"
            >
              <img
                className="w-20 mb-3 object-contain"
                src={service.img}
                alt={service.title}
              />
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-sm text-justify px-2 mt-2">{service.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Book Your Consultation */}
      <div className="mb-4 mt-4 py-4 flex flex-col justify-center" ref={formRef}>
        <h4 className="px-4 py-4 text-4xl text-center font-semibold leading-tight">
          Book Your Free Consultation
        </h4>
        <div className="px-8 py-4 flex flex-wrap justify-center bg-green-100 gap-6">
          <ConsultationSliderForm />
        </div>
      </div>
      <ScrollToTop />
    </section>
  );
};
export default ConsultationPage;
