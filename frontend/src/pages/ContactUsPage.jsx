import React from "react";
import { ReachUsModes, FAQS, Hotline } from "../constants";
import ScrollToTop from "../components/ScrollToTop";
import FeedbackForm from "../components/FeedbackForm";

const handleButtonClick = (mode) => {
  switch (mode.type) {
    case "call":
      window.location.href = `tel:${mode.value}`;
      break;
    case "email":
      window.location.href = `mailto:${mode.value}`;
      break;
    case "directions":
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          mode.value
        )}`,
        "_blank"
      );
      break;
    case "link":
      window.open(mode.value, "_blank");
      break;
    default:
      console.log("Unhandled mode:", mode);
  }
};

const handleHotlineClick = () => {
  window.location.href = `tel:${Hotline.Number}`;
};

const ContactUsPage = () => {
  return (
    <section>
      <div className="container mx-auto py-25 px-6 md:px-20 lg:px-25 flex flex-col items-center bg-gray-50">
        <div className="flex flex-col justify-center bg-green-100 bg-opacity-50 px-6 py-2 rounded-4xl">
          <h3 className="text-center text-lg font-semibold">Get in Touch</h3>
        </div>

        <div className="px-6 py-2 flex flex-col justify-center">
          <h2 className="px-4 py-4 text-center text-4xl font-semibold">
            We're Here to Help
          </h2>
          <p className="px-12 text-center font-light text-lg">
            Have questions about our services, need support with your health
            journey, or want to learn more about regenerative farming? We'd love
            to hear from you.
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-col justify-center">
        <h4 className="px-4 py-4 text-4xl text-center font-semibold leading-tight">
          Choose How to Reach Us
        </h4>
        <div className="px-8 py-4 flex flex-wrap justify-center gap-6">
          {ReachUsModes.map((mode, index) => (
            <div
              key={index}
              className="w-64 flex flex-col items-center text-center rounded-2xl p-4 shadow-md bg-green-100"
            >
              <h3 className="text-lg font-semibold">{mode.title}</h3>
              {mode.lines.map((line, index) => (
                <span key={index} className="text-sm text-justify px-2 mt-2">
                  {line}
                  <br />
                </span>
              ))}
              <button
                className="px-8 py-2 mt-4 text-sm border border-green-800 text-green-800 rounded-lg hover:cursor-pointer hover:bg-green-800 hover:text-white transition-transform transform duration-300"
                onClick={() => handleButtonClick(mode)}
              >
                {mode.button}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Column */}
        <div className="bg-green-100 rounded-xl p-6 flex ">
          <FeedbackForm />
        </div>

        {/* Right Column with 3 rows */}
        <div className="flex flex-col gap-4">
          <div className="bg-green-100 rounded-xl p-4">
            <h2 className="text-lg text-center font-semibold mb-3">
              Office Hours
            </h2>
            <ul className="px-8 space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-100 rounded-xl p-4">
            <h2 className="text-lg text-center font-semibold mb-3">
              Need Quick Answers?
            </h2>
            <p className="text-sm text-center mb-3">
              Check our FAQ section for common questions
            </p>

            <div className="px-4 py-4 flex flex-col gap-4">
              {FAQS.map((item, index) => (
                <div className="bg-green-100 border border-green-500 rounded-xl p-4">
                  <h2 className="text-lg text-center font-semibold mb-3">
                    {item.title}
                  </h2>
                  <p className="text-sm text-center mb-3">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-100 rounded-xl p-4">
            <h2 className="text-lg text-center font-semibold text-red-600 mb-3">
              Emergency Support
            </h2>
            <p className="text-sm text-center mb-3">
              For urgent health-related questions from existing customers
            </p>

            <div className="flex justify-center">
              <button
                className="px-8 py-1 text-sm border-2 border-green-800 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:cursor-pointer hover:scale-120 active:scale-95 transform
        transition-transform duration-300"
                onClick={handleHotlineClick}
              >
                Emergency Hotline
              </button>
            </div>
          </div>
        </div>
      </div>
            <ScrollToTop />
    </section>
  );
};

export default ContactUsPage;
