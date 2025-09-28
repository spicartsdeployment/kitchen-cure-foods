import React, { useState } from "react";

/* ---------------- Field Config ---------------- */
const formConfig = {
  "Personal Information": [
    { name: "name", label: "Full Name", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "age", label: "Age", type: "text" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    { name: "height", label: "Height(cm)", type: "text" },
    { name: "weight", label: "Weight(Kg)", type: "text" },
  ],
  "Health & Lifestyle Information": [
    {
      name: "description",
      label: "Describe any medical conditions...",
      type: "text",
    },
    { name: "allergies", label: "Allergies", type: "text" },
    {
      name: "dietaryPreferences",
      label: "Dietary Preferences",
      type: "select",
      options: [
        "Dietary Preferences",
        "Vegan",
        "Vegetarian",
        "Non-Vegetarian",
        "Gluten-Free",
        "Other",
      ],
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
      options: ["Physical Activity Level", "Sedentary", "Moderate", "Active"],
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
      options: ["Preferred Language", "English", "Hindi", "Telugu", "Other"],
    },
    {
      name: "bestTimeForConsultation",
      label: "Best Time For Consultation",
      type: "select",
      options: [
        "Best Time For Consultation",
        "Morning",
        "Afternoon",
        "Evening",
      ],
    },
  ],
  "Review & Confirmation": [
    {
      name: "consent1",
      label: "I confirm that the information provided is accurate.",
      type: "checkbox",
      options: ["Agree"],
    },
    {
      name: "consent2",
      label: "I agree to share my health data with the nutritionist.",
      type: "checkbox",
      options: ["Agree"],
    },
  ],
};

/* ---------------- Main Component ---------------- */
const ConsultationSliderForm = () => {
  const sectionKeys = Object.keys(formConfig);
  const totalSteps = sectionKeys.length;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const currentSection = sectionKeys[step - 1];

  const handleChange = (e, field) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const current = formData[name] || [];
      if (checked) {
        setFormData({ ...formData, [name]: [...current, value] });
      } else {
        setFormData({
          ...formData,
          [name]: current.filter((v) => v !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => step < totalSteps && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData);

    await fetch("https://your-api-endpoint.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    alert("Form submitted!");
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg"
      >
        {/* Stepper Bubbles (clickable) */}
        <div className="flex items-center justify-between mb-8">
          {sectionKeys.map((label, index) => (
            <div key={index} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => setStep(index + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-colors duration-300
                  ${index + 1 < step ? "bg-green-800 text-white" : ""}
                  ${index + 1 === step ? "bg-green-500 text-white" : ""}
                  ${index + 1 > step ? "bg-gray-300 text-gray-700" : ""}`}
              >
                {index + 1}
              </button>

              {index < sectionKeys.length - 1 && (
                <div
                  className={`flex-1 h-1 transition-colors duration-300
                    ${step > index + 1 ? "bg-green-500" : "bg-gray-300"}`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center">
          <h2 className="text-md font-light">
            Step <span className="px-1">{step}</span> of {totalSteps}
          </h2>
          <h2 className="text-xl text-center font-semibold px-2 py-4">
            {currentSection}
          </h2>
        </div>

        {/* Fields */}
        {currentSection !== "Review & Confirmation" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            {formConfig[currentSection].map((field, idx) => (
              <div key={idx} className="flex flex-col">
                {field.type === "text" && (
                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.label}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(e, field)}
                    className="shadow-sm text-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 w-full"
                  />
                )}

                {field.type === "select" && (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(e, field)}
                    className="shadow-sm text-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 w-full"
                  >
                    <option value="">Select</option>
                    {field.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === "radio" &&
                  field.options.map((opt, i) => (
                    <label
                      key={i}
                      className="flex text-sm items-center space-x-2 text-gray-500"
                    >
                      <input
                        type="radio"
                        name={field.name}
                        value={opt}
                        checked={formData[field.name] === opt}
                        onChange={(e) => handleChange(e, field)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}

                {field.type === "checkbox" &&
                  field.options.map((opt, i) => (
                    <label
                      key={i}
                      className="flex text-sm items-center space-x-2 text-gray-500"
                    >
                      <input
                        type="checkbox"
                        name={field.name}
                        value={opt}
                        checked={formData[field.name]?.includes(opt)}
                        onChange={(e) => handleChange(e, field)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4" >
            {/* Review Previous Steps */}
            {sectionKeys.slice(0, -1).map((section, sIdx) => (
              <div key={sIdx} className="border p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">{section}</h3>
                {formConfig[section].map((field) => (
                  <p key={field.name} className="text-sm text-gray-600">
                    <strong>{field.label}:</strong>{" "}
                    {Array.isArray(formData[field.name])
                      ? formData[field.name].join(", ")
                      : formData[field.name] || "-"}
                  </p>
                ))}
                <button
                  type="button"
                  onClick={() => setStep(sIdx + 1)}
                  className="mt-2 text-xs text-green-600 underline"
                >
                  Edit
                </button>
              </div>
            ))}

            {/* Consent Checkboxes */}
            <div>
              {formConfig["Review & Confirmation"].map((field, idx) => (
                <div key={idx} className="flex flex-col">
                  {field.options.map((opt, i) => (
                    <label
                      key={i}
                      className="flex text-sm items-center space-x-2 text-gray-500"
                    >
                      <input
                        type="checkbox"
                        name={field.name}
                        value={opt}
                        checked={formData[field.name]?.includes(opt)}
                        onChange={(e) => handleChange(e, field)}
                      />
                      <span>
                        {opt} - {field.label}
                      </span>
                    </label>
                  ))}
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
              className="px-4 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-gray-200"
            >
              Previous
            </button>
          )}

          {step < totalSteps && (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Next Step
            </button>
          )}

          {step === totalSteps && (
            <button
              type="submit"
              className="ml-auto px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ConsultationSliderForm;
