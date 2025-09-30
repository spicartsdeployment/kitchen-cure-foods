import React, { useEffect, useState, useContext } from "react";
import { Pencil, Save, CircleX } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { updateUser, get_me } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { profileFields } from "../constants";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [formData, setFormData] = useState({
    _id: "",
    userName: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });
  const [originalData, setOriginalData] = useState(profile); // backup

  useEffect(() => {
    const now = new Date();
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formatted = now.toLocaleString("en-GB", options);
    setDateTime(formatted);
  }, []);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      setError("");
      try {
        if (!token) {
          navigate("/login");
          return;
        }

        const data = await get_me();

        setProfile(data.user);
        setFormData({
          _id: data.user._id || "",
          userName: data.user.userName || "",
          email: data.user.email || "",
          password: data.user.password || "",
          phone: data.user.phone || "",
          dob: data.user.dob || "",
          gender: data.user.gender || "",
          address: data.user.address || "123, Main Street",
          city: data.user.city || "Bangalore",
          state: data.user.state || "Karnataka",
          country: data.user.country || "India",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err || "Error fetching profile!");
      }
    };
    fetchProfile();
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = async () => {
    if (!isEditing) {
      // going into edit mode
      setOriginalData(formData);
      setIsEditing(true);
    } else {
      // saving
      // await handleSave();
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setError("");
    try {
      if (!profile._id) {
        const token = await get_me();
        if (!token) {
          navigate("/login");
          return;
        }
      }

      const updated = await updateUser(profile._id, formData);
      setProfile(updated.user); // update state
      setFormData(updated.user); // sync editable copy
      setIsEditing(false);
      alert(updated.msg);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err || "Error updating profile!");
    }
  };

  if (!profile) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-green-200">
      <div className="relative bg-white rounded-3xl shadow-lg overflow-y-auto w-full max-w-4xl min-h-[70vh] m-4 mt-8">
        <div className="p-6">
          <div className="p-4">
            <h3 className="py-1 font-medium text-sm text-gray-700">
              Welcome, {profile.userName}
            </h3>
            <p className="font-light text-xs text-gray-400">{dateTime}</p>
          </div>

          {/* Header with avatar */}
          <div className="flex flex-wrap items-center gap-6 mb-6 rounded-2xl py-4 px-4 bg-gradient-to-r from-indigo-300 to-purple-200">
            <img
              src={profile.image || "src/assets/user-icon.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-1 border-gray-50"
            />
            <div>
              <h2 className="text-2xl font-semibold">{profile.userName}</h2>
              <p className="text-gray-800 font-extralight text-sm">
                {profile.email}
              </p>
            </div>
            {/* Button container aligned to the right */}
            <div className="ml-auto flex items-center gap-3">
              {isEditing && (
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-4xl text-xs font-small hover:cursor-pointer hover:scale-105 active:scale-95 transform transition-transform duration-300"
                >
                  <CircleX size={15} />
                  Cancel
                </button>
              )}
              <button
                onClick={toggleEdit}
                className={`flex items-center gap-2 px-4 py-2 text-white rounded-4xl text-xs font-small hover:cursor-pointer hover:scale-105 active:scale-95 transform transition-transform duration-300
        ${!isEditing ? "bg-cyan-600" : "bg-green-600"}`}
              >
                {isEditing ? <Save size={15} /> : <Pencil size={15} />}
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          {/* Dynamic Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileFields.map((field) => (
              <div key={field.name}>
                <label className="text-sm font-light block mb-1 text-gray-600">
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    disabled={!isEditing || !field.editable}
                    className="text-sm w-full border rounded-lg border-gray-300 shadow-sm px-3 py-2"
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "tel" ? (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData.phone}
                    placeholder={field.name}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (val.length <= 10) {
                        setFormData((prev) => ({ ...prev, phone: val }));
                      }
                    }}
                    inputMode="numeric"
                    pattern="\d{10}"
                    maxLength={10}
                    disabled={!isEditing || !field.editable}
                    className={`text-sm w-full rounded-lg border border-gray-300 shadow-sm px-3 py-2 ${
                      !field.editable ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    placeholder={field.name}
                    onChange={handleChange}
                    maxLength={60}
                    disabled={!isEditing || !field.editable}
                    className={`text-sm w-full rounded-lg border border-gray-300 shadow-sm px-3 py-2 ${
                      !field.editable ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <p className="text-xs text-center">
            These contact details will be used for all future communications.
          </p>
          <p className="text-xs text-center py-2 mb-4">
            Details last updated on -
            <span className="font-semibold ml-1">{dateTime}</span>
          </p>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default ProfilePage;
