import React, { useState } from "react";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Appointment booked!");
  };

  return (
    <div className="bg-gray-50 p-6 w-full">
      <h2 className="text-4xl font-semibold mb-4">Schedule an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Your Name<span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="enter your name"
            value={formData.name}
            onChange={handleChange}
            className="shadow-sm text-sm px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-gray-600 w-full"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email<span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="enter email"
              value={formData.email}
              onChange={handleChange}
              className="shadow-sm text-sm px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-gray-600 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number<span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="enter phone number"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]*"
              inputMode="numeric"
              className="shadow-sm text-sm px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-gray-600 w-full"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Your Message<span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="enter your message"
            value={formData.message}
            onChange={handleChange}
            className="shadow-sm text-sm px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-gray-600 w-full"
            rows="4"
            required
          />
        </div>
        <div className="px-4 flex justify-center">
          <button
            type="submit"
            className="px-8 py-2 text-sm border border-green-800 bg-green-800 text-white rounded-lg hover:text-white hover:bg-green-900 hover:cursor-pointer hover:scale-120 active:scale-95 transform
        transition-transform duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
