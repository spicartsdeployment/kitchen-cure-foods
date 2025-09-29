import React, { useState } from "react";
import { sendEmailMessage } from "../services/EmailService";

const FeedbackForm = () => {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await sendEmailMessage(
      formData.name,
      formData.email,
      formData.phone,
      formData.message,
      formData.category,
      formData.subject
    );

    console.log("response:", response);
    alert(response.data.message);

    // Clear form after successful submit
    if (response.data.status === "success") {
      setFormData(initialFormData);
    }
  };

  return (
    <div className="p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-3">
        Send Us a Message
      </h2>
      <p className="px-8 py-4 text-center font-light text-md">
        Fill out the form below and we'll get back to you as soon as possible.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="text-xs font-medium block mb-1 text-gray-500"
          >
            Full Name<span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
            className="text-sm w-full rounded-lg border border-green-500 shadow-sm px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-xs font-medium block mb-1 text-gray-500"
          >
            Email<span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            className="text-sm w-full rounded-lg border border-green-500 shadow-sm px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="text-xs font-medium block mb-1 text-gray-500"
          >
            Phone Number<span className="text-red-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]*"
            inputMode="numeric"
            placeholder="Enter Your Phone Number"
            className="text-sm w-full rounded-lg border border-green-500 shadow-sm px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="text-xs font-medium block mb-1 text-gray-500"
          >
            Category<span className="text-red-600">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="text-sm w-full rounded-lg border border-green-500 shadow-sm px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            required
          >
            <option value="">Select Category</option>
            <option value="General Query">General Query</option>
            <option value="Product Support">Product Support</option>
            <option value="Feedback">Feedback</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="text-xs font-medium block mb-1 text-gray-500"
          >
            Subject<span className="text-red-600">*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Brief description of your enquiry"
            value={formData.subject}
            onChange={handleChange}
            className="text-sm w-full rounded-lg border border-green-500 shadow-sm px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="text-xs font-medium block mb-1 text-gray-500"
          >
            Message<span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Please provide details about your enquiry.."
            value={formData.message}
            onChange={handleChange}
            className="text-sm w-full rounded-lg border border-green-500 shadow-sm px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-700 text-white text-sm px-8 py-2 rounded-lg hover:cursor-pointer hover:bg-green-800 hover:scale-105 active:scale-95 transform
        transition-transform duration-300"
          >
            Submit Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
