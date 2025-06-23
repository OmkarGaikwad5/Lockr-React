import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProfileSidebar = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ fullname: "", email: "" });
  const [editable, setEditable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) fetchUserProfile();
  }, [isOpen]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
  headers: { Authorization: `Bearer ${token}` },
});



      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setFormData({
          fullname: data.fullname || "",
          email: data.email || "",
        });
      } else {
        toast.error(data.message || "Failed to fetch profile");
      }
    } catch (err) {
      console.error("❌ Profile fetch error:", err);
      toast.error("Error fetching profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated!");
        setUser({
          ...user,
          fullname: formData.fullname,
          email: formData.email,
        });
        setFormData({
          fullname: formData.fullname,
          email: formData.email,
        });
        setEditable(false);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      console.error("❌ Update error:", err);
      toast.error("Server error while updating");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className={`fixed top-[4.5rem] left-0  w-[90vw] md:w-96 max-w-sm h-[90vh] backdrop-blur-lg bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/80 border border-white/10 text-white shadow-2xl rounded-xl transition-all duration-300 z-50 overflow-y-auto ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"
        }`}
    >
      <div className="flex justify-between items-center p-5 border-b border-white/10">
        <h2 className="text-2xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text animate-pulse drop-shadow-md">
          👤 Your Profile
        </h2>
        <button
          onClick={onClose}
          className="cursor-pointer text-gray-300 hover:text-white text-2xl transition duration-300"
        >
          &times;
        </button>
      </div>

      <div className="p-6 space-y-6 text-sm">
        {/* Name Field */}
        <div>
          <label className="text-slate-400">Name</label>
          {editable ? (
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-xl bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 ring-sky-500"
              placeholder="Enter your name"
            />
          ) : (
            <p className="mt-1 text-white text-base">{user?.fullname || "Not available"}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="text-slate-400">Email</label>
          {editable ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-xl bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 ring-violet-500"
              placeholder="Enter your email"
            />
          ) : (
            <p className="mt-1 text-white text-base">{user?.email || "Not available"}</p>
          )}
        </div>

        {/* Created At */}
        <div>
          <label className="text-slate-400">Joined On</label>
          <p className="mt-1 text-slate-200">
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-GB")
              : "Unknown"}
          </p>
        </div>

        {/* Buttons */}
        {editable ? (
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="cursor-pointer flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-lime-500 text-black font-semibold hover:brightness-110 transition disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "💾 Save"}
            </button>
            <button
              onClick={() => setEditable(false)}
              className="cursor-pointer flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 font-semibold transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditable(true)}
            className="cursor-pointer w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl font-semibold tracking-wide hover:opacity-90 transition"
          >
            ✏️ Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSidebar;
