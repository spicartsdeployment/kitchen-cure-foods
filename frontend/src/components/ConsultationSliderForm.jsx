import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { consultation } from "../services/EmailService";

/* ---------------- Field Config ---------------- */
const formConfig = {
  "Personal Information": [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
      validate: (val) =>
        val?.trim().length >= 2 || "Name must be at least 2 characters",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      required: true,
      validate: (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || "Enter a valid email",
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
      required: true,
      validate: (val) =>
        /^\d{10}$/.test(val) || "Phone number must be exactly 10 digits",
    },
    {
      name: "age",
      label: "Age",
      type: "text",
      required: true,
      validate: (val) =>
        /^[0-9]+$/.test(val) && +val > 0 && +val <= 100
          ? true
          : "Enter a valid age (1-100)",
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female", "Other"],
      required: true,
    },
    {
      name: "height",
      label: "Height (cm)",
      type: "text",
      required: true,
      validate: (val) =>
        /^[0-9]+$/.test(val) && +val >= 30 && +val <= 300
          ? true
          : "Height must be between 30-300 cm",
    },
    {
      name: "weight",
      label: "Weight (Kg)",
      type: "text",
      required: true,
      validate: (val) =>
        /^[0-9]+$/.test(val) && +val >= 2 && +val <= 500
          ? true
          : "Weight must be between 2-500 kg",
    },
  ],

  "Health & Lifestyle Information": [
    {
      name: "description",
      label: "Describe any medical conditions",
      type: "text",
    },
    {
      name: "allergies",
      label: "Allergies",
      type: "text",
      required: true,
    },
    {
      name: "dietaryPreferences",
      label: "Dietary Preferences",
      type: "select",
      options: [
        "Vegan",
        "Vegetarian",
        "Non-Vegetarian",
        "Gluten-Free",
        "Other",
      ],
      required: true,
    },
    {
      name: "sleepPattern",
      label: "Sleep Pattern",
      type: "select",
      options: ["Regular", "Irregular"],
    },
    {
      name: "physical",
      label: "Physical Activity Level",
      type: "select",
      options: ["Sedentary", "Moderate", "Active"],
    },
  ],

  "Goals & Consultation Preferences": [
    {
      name: "primaryHealthGoalsCheckbox",
      label: "Primary Health Goals",
      type: "checkbox",
      options: [
        "Weight Loss",
        "Improve Digestion",
        "Lifestyle Management",
        "Gain Muscle",
        "Boost Immunity",
        "Other",
      ],
      required: true,
      validate: (val) => val?.length > 0 || "Select at least one health goal",
    },
    {
      name: "preferredConsultationTypeRadio",
      label: "Preferred Consultation Type",
      type: "radio",
      options: ["Video Call", "Phone Call", "In-Person"],
    },
    {
      name: "preferredLanguage",
      label: "Preferred Language",
      type: "select",
      options: ["English", "Hindi", "Telugu", "Other"],
    },
    {
      name: "bestTimeForConsultation",
      label: "Best Time For Consultation",
      type: "select",
      options: ["Morning", "Afternoon", "Evening"],
    },
  ],

  "Review & Confirmation": [
    {
      name: "consent1",
      // label: "I confirm the above details are correct",
      type: "checkbox",
      options: ["I confirm the above details are correct."],
      required: true,
      validate: (val) =>
        val?.includes("I confirm the above details are correct.") ||
        "You must confirm",
    },
    {
      name: "consent2",
      // label: "I agree to the Terms & Conditions and Privacy Policy.",
      type: "checkbox",
      options: ["I agree to the Terms & Conditions and Privacy Policy."],
      required: true,
      validate: (val) =>
        val?.includes(
          "I agree to the Terms & Conditions and Privacy Policy."
        ) || "You must accept the terms",
    },
  ],
};

/* ---------------- Main Component ---------------- */
const ConsultationSliderForm = () => {
  const sectionKeys = Object.keys(formConfig);
  const totalSteps = sectionKeys.length;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const currentSection = sectionKeys[step - 1];

  /* ---------------- Handle Field Change ---------------- */
  const handleChange = (e, field) => {
    const { name, value, type, checked } = e.target;

    let updatedValue = value;

    // Restrict numeric fields to numbers only
    if (["age", "height", "weight", "phone"].includes(name)) {
      updatedValue = value.replace(/\D/g, ""); // remove any non-digit
    }

    if (type === "checkbox") {
      const existing = formData[name] || [];
      updatedValue = checked
        ? [...existing, value]
        : existing.filter((v) => v !== value);
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));

    // live validation
    if (field.validate) {
      const result = field.validate(updatedValue);
      setErrors((prev) => ({
        ...prev,
        [name]: result === true ? "" : result,
      }));
    } else if (field.required && !updatedValue) {
      setErrors((prev) => ({ ...prev, [name]: `${field.label} is required` }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /* ---------------- Step Validation ---------------- */
  const validateStep = () => {
    const fields = formConfig[currentSection];
    let stepErrors = {};

    fields.forEach((field) => {
      const value = formData[field.name];
      if (
        field.required &&
        (!value || (Array.isArray(value) && value.length === 0))
      ) {
        stepErrors[field.name] = `${field.label} is required`;
      } else if (field.validate) {
        const result = field.validate(value);
        if (result !== true) stepErrors[field.name] = result;
      }
    });

    setErrors((prev) => ({ ...prev, ...stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };
  const prevStep = () => step > 1 && setStep(step - 1);

  const isConsentGiven =
    formData.consent1?.includes("I confirm the above details are correct.") &&
    formData.consent2?.includes(
      "I agree to the Terms & Conditions and Privacy Policy."
    );

  /* ---------------- Handle Submit ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    try {
      // remove consent fields
      const { consent1, consent2, ...payload } = formData;

      const response = await consultation(payload);
      alert(response?.data?.message || "Submitted successfully");

      // Clear form on success
      if (response?.data?.status === "success") {
        setFormData({}); // Reset form data
        setStep(1); // Reset slider back to first step
      }
    } catch (err) {
      alert(err?.message || "Submission failed");
    }
  };

  /* ---------------- Render Fields ---------------- */
  const renderField = (field) => {
    const value = formData[field.name] || "";

    if (field.type === "text" && field.name === "description") {
      return (
        <>
          <textarea
            name={field.name}
            placeholder={field.label}
            value={value}
            onChange={(e) => handleChange(e, field)}
            required={field.required || false}
            className="text-sm w-full rounded-lg border border-green-500 shadow-sm px-3 py-2 min-h-[80px]"
          />
          {errors[field.name] && (
            <span className="text-xs text-red-500 mt-1">
              {errors[field.name]}
            </span>
          )}
        </>
      );
    } else if (field.type === "text") {
      return (
        <>
          <input
            type="text"
            name={field.name}
            placeholder={field.label}
            value={value}
            onChange={(e) => handleChange(e, field)}
            required={field.required || false}
            className="text-sm w-full rounded-lg border border-green-500 shadow-sm px-3 py-2"
          />
          {errors[field.name] && (
            <span className="text-xs text-red-500 mt-1">
              {errors[field.name]}
            </span>
          )}
        </>
      );
    } else if (field.type === "select") {
      return (
        <>
          <select
            name={field.name}
            value={value}
            onChange={(e) => handleChange(e, field)}
            required={field.required || false}
            className="text-sm w-full rounded-lg border border-green-500 shadow-sm px-3 py-2"
          >
            <option value="">{field.label}</option>
            {field.options.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors[field.name] && (
            <span className="text-xs text-red-500 mt-1">
              {errors[field.name]}
            </span>
          )}
        </>
      );
    } else if (field.type === "radio") {
      return (
        <div className="flex flex-col space-y-1">
          <span className="font-medium text-gray-700">{field.label}</span>
          {field.options.map((opt, i) => (
            <label
              key={i}
              className="flex text-sm items-center space-x-2 text-gray-600"
            >
              <input
                type="radio"
                name={field.name}
                value={opt}
                checked={formData[field.name] === opt}
                onChange={(e) => handleChange(e, field)}
                required={field.required || false}
              />
              <span>{opt}</span>
            </label>
          ))}
          {errors[field.name] && (
            <span className="text-xs text-red-500 mt-1">
              {errors[field.name]}
            </span>
          )}
        </div>
      );
    } else if (field.type === "checkbox") {
      return (
        <div className="flex flex-col space-y-1">
          <span className="font-medium text-gray-700">{field.label}</span>
          {field.options.map((opt, i) => (
            <label
              key={i}
              className="flex text-sm items-center space-x-2 text-gray-600"
            >
              <input
                type="checkbox"
                name={field.name}
                value={opt}
                checked={formData[field.name]?.includes(opt)}
                onChange={(e) => handleChange(e, field)}
                required={field.required || false}
              />
              <span>{opt}</span>
            </label>
          ))}
          {errors[field.name] && (
            <span className="text-xs text-red-500 mt-1">
              {errors[field.name]}
            </span>
          )}
        </div>
      );
    }
    return null;
  };

  /* ---------------- Render Component ---------------- */
  return (
    <div className="flex justify-center items-center p-4 w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white p-6 rounded-xl shadow-lg max-w-5xl"
      >
        {/* Stepper Bubbles */}
        <div className="flex justify-center px-4 py-4">
          <div className="flex items-center w-full max-w-2xl">
            {sectionKeys.map((label, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index < sectionKeys.length - 1 ? "flex-1" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-bold transition-colors duration-300
          ${index + 1 < step ? "bg-green-800 text-white" : ""}
          ${index + 1 === step ? "bg-green-500 text-white" : ""}
          ${index + 1 > step ? "bg-gray-300 text-gray-700" : ""}`}
                >
                  {index + 1}
                </div>
                {index < sectionKeys.length - 1 && (
                  <div
                    className={`flex-1 h-1 transition-colors duration-300
            ${step > index + 1 ? "bg-green-700" : "bg-gray-300"}`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col min-h-[50vh] justify-between">
          <div>
            <h2 className="text-xl text-center font-semibold px-2 py-4">
              Step <span className="px-1">{step}</span> of {totalSteps} -{" "}
              {currentSection}
            </h2>

            {/* Fields */}
            {currentSection !== "Review & Confirmation" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-2">
                {formConfig[currentSection].map((field) => (
                  <div
                    key={field.name}
                    className={`flex flex-col ${
                      field.name === "description"
                        ? "md:col-span-2"
                        : "md:col-span-1"
                    }`}
                  >
                    {renderField(field)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Review Section */}
                {sectionKeys.slice(0, -1).map((section, sIdx) => (
                  <div
                    key={sIdx}
                    className="border p-4 rounded-lg shadow-sm border-green-500"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{section}</h3>
                      <button
                        type="button"
                        onClick={() => setStep(sIdx + 1)}
                        className="flex items-center gap-1 text-xs text-green-600 px-2 py-1 rounded-md border hover:cursor-pointer hover:bg-green-800 hover:text-white"
                      >
                        <Pencil size={12} />
                        Edit
                      </button>
                    </div>
                    {formConfig[section].map((field) => (
                      <div
                        key={field.name}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 text-sm text-gray-600 mb-2 px-2"
                      >
                        <span className="font-medium sm:col-span-1">
                          {field.label}
                        </span>
                        <span className="font-semibold text-black sm:col-span-2">
                          {Array.isArray(formData[field.name])
                            ? formData[field.name].join(", ")
                            : formData[field.name]}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Consent Checkboxes */}
                <div>
                  {formConfig["Review & Confirmation"].map((field) => (
                    <div key={field.name} className="flex flex-col">
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-gray-200 hover:cursor-pointer"
                >
                  Previous
                </button>
              )}

              {step < totalSteps && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700  hover:cursor-pointer"
                >
                  Next Step
                </button>
              )}

              {step === totalSteps && (
                <button
                  type="submit"
                  disabled={!isConsentGiven}
                  className={`ml-auto px-4 py-2 rounded-lg text-white ${
                    isConsentGiven
                      ? "bg-green-600 hover:bg-green-700 hover:cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConsultationSliderForm;
