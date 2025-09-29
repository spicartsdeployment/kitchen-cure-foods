import React, { useState } from "react";
import { scheduleAppointment } from "../services/EmailService";

const AppointmentForm = () => {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData:", formData);

    const response = await scheduleAppointment(
      formData.name,
      formData.email,
      formData.phone,
      formData.message
    );

    console.log("response:", response?.data?.message);
    alert(response?.data?.message);

    // Clear form after successful submit
    if (response?.data?.status === "success") {
      setFormData(initialFormData);
    }
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
            className="text-sm w-full rounded-lg border border-green-500 shadow-sm px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
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
              className="text-sm w-full rounded-lg border border-green-500 shadow-sm px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
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
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ""); // only digits
                if (val.length <= 10) {
                  setFormData((prev) => ({ ...prev, phone: val }));
                }
              }}
              inputMode="numeric"
              pattern="\d{10}"
              maxLength={10}
              className="text-sm w-full rounded-lg border border-green-500 shadow-sm px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
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
            className="text-sm w-full rounded-lg border border-green-500 shadow-sm px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            rows="4"
            required
          />
        </div>
        <div className="px-4 flex justify-center">
          <button
            type="submit"
            className="px-8 py-2 text-sm border border-green-800 bg-green-800 text-white rounded-lg hover:text-white hover:bg-green-900 hover:cursor-pointer hover:scale-105 active:scale-95 transform
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
