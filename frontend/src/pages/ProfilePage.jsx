import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "lucide-react";
import { updateUser, get_me } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

export const ProfilePage = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
  });

  const navigate = useNavigate();

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
          userName: data.user.userName || "",
          email: data.user.email || "",
          password: data.user.password || "",
          phone: data.user.phone || "",
          dob: data.user.dob || "",
          gender: data.user.gender || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err || "Error fetching profile!");
      }
    };
    fetchProfile();
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    navigate("/");
  };

  const handleSave = async (e) => {
    e.preventDefault();
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
      console.log("updated response ", updated);

      setProfile(updated.user);
      setIsEditing(false);
      alert(updated.msg);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err || "Error updating profile!");
    }
  };

  const handleClear = () => {
    setFormData({
      userName: "",
      password: "",
      phone: "",
      dob: "",
      gender: "",
    });
  };

  if (!profile) return <div className="p-6">Loading profile...</div>;

  const SocialIcon = ({ icon }) => (
    <a
      href="#"
      className="border border-gray-300 rounded-full w-10 h-10 flex justify-center items-center text-gray-600 hover:scale-110 transition"
    >
      {icon}
    </a>
  );

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-green-200">
      <div className="relative bg-white rounded-4xl shadow-lg overflow-hidden w-[90vh] max-w-full min-h-[70vh] m-4">
        <div className="absolute top-0 left-0 h-full w-full opacity-100 z-0">
          <form
            onSubmit={handleSave}
            className="h-full flex flex-col justify-center items-center px-10 py-10"
          >
            <div className="flex space-x-3 mb-4">
              <SocialIcon icon={<User size={18} />} />
            </div>
            <h1 className="text-xl font-semibold">
              Hello! <span className="text-green-800">{profile.userName}</span>
            </h1>
            <p className="text-xs text-center py-2 mb-4">
              Enable <span className="font-semibold">edit</span> mode,{" "}
              <span className="font-semibold">update</span> your details and
              click <span className="font-semibold">Save</span> to apply
              changes.
            </p>

            {/* Two-column wrapper */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ID */}
              <div className="grid grid-cols-3 items-center gap-2">
                <label
                  htmlFor="id"
                  className="text-sm font-medium text-gray-700 text-right"
                >
                  ID:
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={profile._id}
                  disabled
                  className="col-span-2 p-3 rounded-lg bg-gray-100 text-sm w-full"
                />
              </div>

              {/* Role */}
              <div className="grid grid-cols-3 items-center gap-2">
                <label
                  htmlFor="role"
                  className="text-sm font-medium text-right"
                >
                  Role:
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={profile.role}
                  disabled
                  className="col-span-2 p-3 rounded-lg bg-gray-100 text-sm w-full"
                />
              </div>

              {/* Name */}
              <div className="grid grid-cols-3 items-center gap-2">
                <label
                  htmlFor="userName"
                  className="text-sm font-medium text-right"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  disabled={!isEditing}
                  onChange={handleChange}
                  required
                  className="col-span-2 p-3 rounded-lg bg-blue-100 text-sm w-full"
                />
              </div>

              {/* Email */}
              <div className="grid grid-cols-3 items-center gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-right"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled={!isEditing}
                  onChange={handleChange}
                  required
                  className="col-span-2 p-3 rounded-lg bg-gray-100 text-sm w-full"
                />
              </div>

              {/* Password */}
              <div className="grid grid-cols-3 items-center gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-right"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  disabled={!isEditing}
                  onChange={handleChange}
                  required
                  className="col-span-2 p-3 rounded-lg bg-blue-100 text-sm w-full"
                />
              </div>

              {/* Phone */}
              <div className="grid grid-cols-3 items-center gap-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-right"
                >
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setFormData((prev) => ({ ...prev, phone: val }));
                  }}
                  required
                  className="col-span-2 p-3 rounded-lg bg-blue-100 text-sm w-full"
                />
              </div>

              {/* DOB */}
              <div className="grid grid-cols-3 items-center gap-2">
                <label htmlFor="dob" className="text-sm font-medium text-right">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  disabled={!isEditing}
                  onChange={handleChange}
                  required
                  className="col-span-2 p-3 rounded-lg bg-blue-100 text-sm w-full"
                />
              </div>

              {/* Gender */}
              <div className="grid grid-cols-3 items-center gap-2">
                <label
                  htmlFor="gender"
                  className="text-sm font-medium text-right"
                >
                  Gender:
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  disabled={!isEditing}
                  onChange={handleChange}
                  required
                  className="col-span-2 p-3 rounded-lg bg-blue-100 text-sm w-full"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 py-10">
              {!isEditing ? (
                <button
                  type="button"
                  className="text-white py-2 px-8 rounded-4xl text-xs font-medium 
               bg-gradient-to-r from-amber-800 to-amber-500 hover: cursor-pointer"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-white py-2 px-8 rounded-4xl text-xs font-medium
               bg-gradient-to-r from-yellow-800 to-yellow-500 hover: cursor-pointer"
                  >
                    Clear All
                  </button> <button
                    type="button"
                    onClick={handleCancel}
                    className="text-white py-2 px-8 rounded-4xl text-xs font-medium
               bg-gradient-to-r from-gray-800 to-gray-500 hover: cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-white py-2 px-8 rounded-4xl text-xs font-medium
               bg-gradient-to-r from-green-800 to-green-500 hover: cursor-pointer"
                  >
                    Save
                  </button>
                </>
              )}
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
            <ScrollToTop />
    </div>
  );
};
