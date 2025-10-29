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
    <div className="flex items-center justify-center min-h-screen bg-zinc-50">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden w-[90vw] max-w-4xl m-4 min-h-[70vh] border border-gray-300">
        {/* Left side - Logo */}
        <div className="flex-1 bg-green-700 flex items-center justify-center p-6 md:p-8">
          <img
            src="/src/assets/kcf-logo.jpg"
            alt="Logo"
            className="max-w-[90%] h-auto object-contain"
          />
        </div>

        {/* Right side - Signup form */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10 overflow-y-auto">
          <h3 className="text-2xl font-bold text-green-700 mb-2 text-center">
            Create Your Account
          </h3>
          <span className="font-light text-sm mb-6 text-gray-400 text-center">
            Join us and take the first step toward better health 🌱
          </span>

          <form onSubmit={handleSignup} noValidate className="w-full max-w-sm">
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={userName}
              onChange={(e) => {
                setName(e.target.value);
                setStepErrors((prev) => ({ ...prev, name: "" }));
              }}
              required
              className="text-sm mb-3 w-full rounded-lg border border-gray-300 shadow px-3 py-2 placeholder:text-xs 
                     hover:border-gray-600 focus:outline-none focus:border-gray-500 focus:ring-gray-600"
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
                setStepErrors((prev) => ({ ...prev, email: "" }));
              }}
              required
              className="text-sm mb-3 w-full rounded-lg border border-gray-300 shadow px-3 py-2 placeholder:text-xs 
                     hover:border-gray-600 focus:outline-none focus:border-gray-500 focus:ring-gray-600"
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
                const val = e.target.value.replace(/\D/g, "");
                if (val.length <= 10) setPhone(val);
                setStepErrors((prev) => ({ ...prev, phone: "" }));
              }}
              required
              maxLength={10}
              className="text-sm mb-3 w-full rounded-lg border border-gray-300 shadow px-3 py-2 placeholder:text-xs 
                     hover:border-gray-600 focus:outline-none focus:border-gray-500 focus:ring-gray-600"
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
                  setStepErrors((prev) => ({ ...prev, password: "" }));
                  if (confirmPassword) {
                    setConfirmPassword("");
                    setStepErrors((prev) => ({ ...prev, confirmPassword: "" }));
                  }
                }}
                required
                className="text-sm mb-3 w-full rounded-lg border border-gray-300 shadow px-3 py-2 placeholder:text-xs 
                     hover:border-gray-600 focus:outline-none focus:border-gray-500 focus:ring-gray-600 pr-10"
              />
              <button
                type="button"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
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
                  setStepErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                required
                className={`text-sm w-full rounded-lg border shadow px-3 py-2 placeholder:text-xs hover:border-gray-600 focus:outline-none focus:ring-1 pr-10 ${
                  confirmPassword && confirmPassword !== password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-gray-600 focus:ring-gray-600"
                }`}
              />
              <button
                type="button"
                onMouseDown={() => setShowConfirmPassword(true)}
                onMouseUp={() => setShowConfirmPassword(false)}
                onMouseLeave={() => setShowConfirmPassword(false)}
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
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setStepErrors((prev) => ({ ...prev, dob: "" }));
                }}
                className="text-sm mb-3 w-full rounded-lg border border-gray-300 shadow px-3 py-2 placeholder:text-xs 
                     hover:border-gray-600 focus:outline-none focus:border-gray-500 focus:ring-gray-600 pr-1"
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
                setStepErrors((prev) => ({ ...prev, gender: "" }));
              }}
              className="text-sm mb-3 w-full rounded-lg border border-gray-300 shadow px-3 py-2 placeholder:text-xs 
                     hover:border-gray-600 focus:outline-none focus:border-gray-500 focus:ring-gray-600 pr-1"
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

            {/* Buttons */}
            <div className="w-full py-2">
              <button
                type="submit"
                className="w-full font-semibold text-white py-2 rounded-lg text-sm bg-green-700 hover:bg-green-800 hover:cursor-pointer"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    import.meta.env.VITE_BACKEND_URL + "/auth/google";
                }}
                className="flex w-full font-semibold justify-center items-center text-green-500 border py-2 rounded-lg text-sm mt-2 hover:bg-gray-300 hover:text-green-800 hover:cursor-pointer"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-4 h-4 mr-2"
                />
                <span>Sign up with Google</span>
              </button>
            </div>

            <span className="text-xs text-gray-400 mt-2 block text-center">
              Already have an account?
              <a href="/login" className="text-green-500 ml-1">
                Login Here
              </a>
            </span>
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
