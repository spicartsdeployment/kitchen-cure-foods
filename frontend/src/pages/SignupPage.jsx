import React, { useState } from "react";
import { createUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import Tooltip from "../components/Tooltip";

const SignupPage = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [stepErrors, setStepErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    const errors = {};

    if (!userName.trim()) errors.name = "Full Name is required";
    if (!email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) errors.email = "Enter a valid email";
    }

    if (!phone.trim()) errors.phone = "Phone number is required";
    else if (phone.length !== 10)
      errors.phone = "Phone number must be exactly 10 digits";

    if (!password.trim()) errors.password = "Password is required";
    if (!confirmPassword.trim())
      errors.confirmPassword = "Confirm Password is required";
    else if (confirmPassword !== password)
      errors.confirmPassword = "Passwords do not match";

    if (!dob.trim()) errors.dob = "Date of Birth is required";
    if (!gender.trim()) errors.gender = "Gender is required";

    setStepErrors(errors);

    // Stop if there are errors
    if (Object.keys(errors).length > 0) return;

    try {
      const response = await createUser(
        userName,
        email,
        password,
        phone,
        dob,
        gender
      );
      alert(response?.data?.message || "Signup successful! Please login.");

      window.location.href = "/"; // redirect to home page
    } catch (err) {
      setError(err || "Signup failed!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="relative bg-white rounded-4xl shadow-lg overflow-hidden w-[50vh] max-w-full min-h-[70vh] m-4">
        <div className="absolute top-0 left-0 h-full w-full opacity-100 z-0">
          <form
            onSubmit={handleSignup}
            noValidate
            className="h-full flex flex-col justify-center items-center px-10"
          >
            <h3 className="text-xl font-bold">Create Your Account</h3>
            <span className="font-light text-sm mt-2 mb-4 text-gray-400">
              Join us and take the first step toward better health{" "}
              <span> 🌱 </span>
            </span>

            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={userName}
              onChange={(e) => {
                setName(e.target.value);
                setStepErrors((prev) => ({ ...prev, name: "" })); // clear error
              }}
              required
              className="text-sm mb-3 w-full rounded-lg border border-green-500 shadow px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
            {stepErrors.name && (
              <span className="w-full text-left text-red-500 text-xs mb-2">
                {stepErrors.name}
              </span>
            )}

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStepErrors((prev) => ({ ...prev, email: "" })); // clear error
              }}
              required
              className="text-sm mb-3 w-full rounded-lg border border-green-500 shadow px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
            {stepErrors.email && (
              <span className="w-full text-left text-red-500 text-xs mb-2">
                {stepErrors.email}
              </span>
            )}

            {/* Phone Number */}
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                // allow only numbers
                const val = e.target.value.replace(/\D/g, ""); // only digits
                if (val.length <= 10) setPhone(val); // limit to 10 digits
                setStepErrors((prev) => ({ ...prev, phone: "" })); // clear error
              }}
              required
              inputMode="numeric"
              pattern="\d{10}"
              maxLength={10}
              className="text-sm mb-3 w-full rounded-lg border border-green-500 shadow px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
            {stepErrors.phone && (
              <span className="w-full text-left text-red-500 text-xs mb-2">
                {stepErrors.phone}
              </span>
            )}

            {/* Password */}
            <div className="relative w-full mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setStepErrors((prev) => ({ ...prev, password: "" })); // clear error
                  // Clear confirm password if password changes
                  if (confirmPassword) {
                    setConfirmPassword("");
                    setStepErrors((prev) => ({ ...prev, confirmPassword: "" }));
                  }
                }}
                required
                className="text-sm w-full rounded-lg border border-green-500 shadow px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 pr-10"
              />
              {/* Eye Icon */}
              <button
                type="button"
                onMouseDown={() => setShowPassword(true)} // show password while pressed
                onMouseUp={() => setShowPassword(false)} // hide when released
                onMouseLeave={() => setShowPassword(false)} // also hide if mouse moves away
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
              >
                {password ? <Eye size={18} /> : null}
              </button>
            </div>
            {stepErrors.password && (
              <span className="w-full text-left text-red-500 text-xs mb-2">
                {stepErrors.password}
              </span>
            )}

            {/* Confirm Password */}
            <div className="relative w-full mb-3">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setStepErrors((prev) => ({ ...prev, confirmPassword: "" })); // clear error
                }}
                required
                className={`text-sm w-full rounded-lg border shadow px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:ring-1 pr-10 ${
                  confirmPassword && confirmPassword !== password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-green-500 focus:border-green-600 focus:ring-green-600"
                }`}
              />
              {/* Eye Icon */}
              <button
                type="button"
                onMouseDown={() => setShowConfirmPassword(true)} // show password while pressed
                onMouseUp={() => setShowConfirmPassword(false)} // hide when released
                onMouseLeave={() => setShowConfirmPassword(false)} // also hide if mouse moves away
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
              >
                {confirmPassword ? <Eye size={18} /> : null}
              </button>
            </div>
            {stepErrors.confirmPassword && (
              <span className="w-full text-left text-red-500 text-xs mb-2">
                {stepErrors.confirmPassword}
              </span>
            )}

            {/* Date of Birth */}
            <Tooltip text="Date of Birth" position="top">
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setStepErrors((prev) => ({ ...prev, dob: "" })); // clear error
                }}
                className="text-sm mb-3 w-full rounded-lg border border-green-500 shadow px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
              {stepErrors.dob && (
                <span className="w-full text-left text-red-500 text-xs mb-2">
                  {stepErrors.dob}
                </span>
              )}
            </Tooltip>

            {/* Gender */}
            <select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setStepErrors((prev) => ({ ...prev, gender: "" })); // clear error
              }}
              className="text-sm mb-3 w-full rounded-lg border border-green-500 shadow px-3 py-2 placeholder:text-xs hover:border-green-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {stepErrors.gender && (
              <span className="w-full text-left text-red-500 text-xs mb-2">
                {stepErrors.gender}
              </span>
            )}

            {/* SignUp Button */}
            <div className="w-full justify-center items-center py-2">
              <button
                type="submit"
                className="w-full text-white py-2 px-8 rounded-lg text-sm 
               bg-green-500 hover:cursor-pointer hover:bg-green-600"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    import.meta.env.VITE_BACKEND_URL + "/auth/google";
                }}
                className="flex w-full justify-center items-center text-green-500 border py-2 px-8 rounded-lg text-sm mt-2 hover:cursor-pointer hover:bg-gray-200"
              >
                <img
                  src="/src/assets/google-icon.png"
                  alt="Google"
                  className="w-4 h-4 mr-2"
                />
                <span>Sign up with Google</span>
              </button>
            </div>

            <span className="text-xs text-gray-400 mt-2">
              Already have an account?
              <a href="/login" className="text-green-500 ml-1">
                Login Here
              </a>
            </span>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
