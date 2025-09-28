import React, { useEffect, useState, useContext } from "react";
import { Pencil, Save } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { User } from "lucide-react";
import { updateUser, get_me } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const ProfilePage2 = () => {
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

  const [dateTime, setDateTime] = useState("");

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

  // const handleChange = (e) => {
  //   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

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

  // const [isEditing, setIsEditing] = useState(false);

  // const [profile, setProfile] = useState({
  //   image: "https://via.placeholder.com/150",
  //   fullName: "John Doe",
  //   email: "john.doe@example.com",
  //   dob: "1990-01-01",
  //   gender: "Male",
  //   address: "123 Main Street",
  //   contactNumber: "+1 234 567 890",
  //   country: "USA",
  //   city: "New York",
  //   state: "NY",
  // });

  // Field configuration
  const fields = [
    { label: "ID", name: "_id", type: "text", editable: false },
    { label: "Full Name", name: "userName", type: "text", editable: true },
    { label: "Email", name: "email", type: "email", editable: false },
    { label: "Date of Birth", name: "dob", type: "date", editable: false },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      editable: true,
      options: ["Male", "Female", "Other"],
    },
    {
      label: "Contact Number",
      name: "phone",
      type: "tel",
      editable: true,
    },
    { label: "Address", name: "address", type: "text", editable: true },
    { label: "Country", name: "country", type: "text", editable: false },
    { label: "City", name: "city", type: "text", editable: true },
    {
      label: "State",
      name: "state",
      type: "select",
      editable: true,
      options: [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Jammu and Kashmir",
        "Ladakh",
        "Lakshadweep",
        "Puducherry",
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const toggleEdit = () => {
    if (isEditing) {
      console.log("Saved profile:", profile);
    }
    setIsEditing(!isEditing);
  };

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
              src={profile.image || "src/assets/1.jpg"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-1 border-gray-50"
            />
            <div>
              <h2 className="text-2xl font-semibold">{profile.userName}</h2>
              <p className="text-gray-500 text-sm">{profile.email}</p>
            </div>
            <button
              onClick={toggleEdit}
              className={`ml-auto flex items-center gap-2 px-4 py-2 
              text-white rounded-4xl text-xs font-medium
                hover: cursor-pointer hover:scale-120 active:scale-95 transform
        transition-transform duration-300 ${!isEditing ? "bg-gray-700":"bg-green-700"} `}
            >
              {isEditing ? <Save size={15} /> : <Pencil size={15} />}
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          {/* Dynamic Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="text-sm font-medium block mb-1 text-gray-500">
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={profile[field.name]}
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
                    value={profile[field.name]}
                    placeholder={field.name}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setFormData((prev) => ({ ...prev, phone: val }));
                    }}
                    disabled={!isEditing || !field.editable}
                    className={`text-sm w-full rounded-lg border border-gray-300 shadow-sm px-3 py-2 ${
                      !field.editable ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={profile[field.name]}
                    placeholder={field.name}
                    onChange={handleChange}
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
          <p className="text-xs text-center py-2 mb-4">
            *last updated on -<span className="font-semibold ml-1">{dateTime}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage2;
