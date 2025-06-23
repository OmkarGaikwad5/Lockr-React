import React, { useEffect, useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  TrashIcon,
  PencilSquareIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileSidebar from "../components/ProfileSidebar";

const API_BASE = `${import.meta.env.VITE_API_URL}/passwords`;


export default function Manager() {
  const [showPasswords, setShowPasswords] = useState({});
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("User not authenticated");

      const res = await fetch(API_BASE, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      if (res.ok) {
        setPasswordArray(result.data || []);
      } else {
        toast.error(result.message || "Unauthorized or failed to fetch");
        console.error("❌ Fetch Error:", result.message);
      }
    } catch (err) {
      toast.error("Failed to fetch passwords");
      console.error("❌ Fetch Error:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("User not authenticated");

      const res = await fetch(editId ? `${API_BASE}/${editId}` : API_BASE, {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(editId ? "Password updated!" : "Password saved!");
        setForm({ site: "", username: "", password: "" });
        setEditId(null);
        fetchPasswords();
      } else {
        toast.error(data.message || "Error saving password");
      }
    } catch (err) {
      toast.error("Server error");
      console.error("❌ Save Error:", err);
    }
  };

  const deletePassword = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("User not authenticated");

      await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.info("Password deleted.");
      fetchPasswords();
    } catch (err) {
      toast.error("Failed to delete.");
      console.error(err);
    }
  };

  const editPassword = (item) => {
    setForm({ site: item.site, username: item.username, password: item.password });
    setEditId(item._id);
    toast("Edit mode activated.");
  };

  const togglePasswordVisibility = (index) => {
    setShowPasswords((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Password copied to clipboard!");
  };

  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden pt-24 px-6 left-0">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

        {/* Profile Button */}
        <div className="absolute top-4 left-40 sm:left-6 md:left-24 lg:left-40 xl:left-56 2xl:left-14 top-4.5 z-50 transition-all duration-300">

          <button
            onClick={() => setSidebarOpen(true)}
            className="cursor-pointer ml-2 sm:ml-4 text-white px-4 sm:px-5 py-2 rounded-full font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition duration-300 text-xs sm:text-sm md:text-base tracking-wide whitespace-nowrap"
          >
            My Profile
          </button>
        </div>



        <ProfileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <ToastContainer position="top-right" autoClose={2500} />

        {/* Form Section */}
        <div className="relative container mx-auto p-6 pb-32 my-12 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] bg-gradient-to-br from-slate-100 to-slate-300 max-w-2xl space-y-6">
          <input
            value={form.site}
            onChange={handleChange}
            name="site"
            type="text"
            placeholder="Enter Website URL..."
            className="w-full p-4 rounded-xl bg-white border border-gray-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent text-gray-700"
          />

          <div className="flex flex-col md:flex-row gap-4 bg-white p-5 rounded-2xl shadow-xl">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Enter Username..."
              className="flex-1 p-4 rounded-xl bg-gray-50 border border-gray-300 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300"
            />

            <div className="relative flex-1">
              <input
                value={form.password}
                onChange={handleChange}
                name="password"
                type={showPasswordInput ? "text" : "password"}
                placeholder="Enter Password..."
                className="w-full p-4 pr-12 rounded-xl bg-gray-50 border border-gray-300 shadow-sm focus:outline-none focus:ring-4 focus:ring-pink-300 text-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPasswordInput((prev) => !prev)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-500"
              >
                {showPasswordInput ? <EyeSlashIcon className="w-5 h-5 cursor-pointer" /> : <EyeIcon className="w-5 h-5 cursor-pointer" />}
              </button>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <button
              onClick={savePassword}
              type="button"
              className="cursor-pointer flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-600"
            >
              <LockClosedIcon className="w-5 h-5" />
              {editId ? "Update Password" : "Save Password"}
            </button>
          </div>
        </div>

        {/* Display Passwords Table */}
        <div className="container mx-auto max-w-4xl my-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Passwords</h2>

          {passwordArray.length > 0 ? (
            <div className="overflow-x-auto bg-white rounded-xl shadow-md">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <tr>
                    <th className="px-6 py-3">Website URL</th>
                    <th className="px-6 py-3">Username</th>
                    <th className="px-6 py-3">Password</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {passwordArray.map((item, index) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{item.site}</td>
                      <td className="px-6 py-4">{item.username}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span>{showPasswords[index] ? item.password : "••••••••"}</span>
                          <button onClick={() => togglePasswordVisibility(index)} className="text-gray-500 hover:text-pink-500">
                            {showPasswords[index] ? <EyeSlashIcon className="w-4 h-4 cursor-pointer" /> : <EyeIcon className="w-4 h-4 cursor-pointer" />}
                          </button>
                          <button onClick={() => copyToClipboard(item.password)} className="text-gray-500 hover:text-blue-500">
                            <ClipboardDocumentIcon className="w-4 h-4 cursor-pointer" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 flex gap-3 justify-center">
                        <button onClick={() => editPassword(item)} className="text-blue-600 hover:text-blue-800" title="Edit">
                          <PencilSquareIcon className="w-5 h-5 cursor-pointer" />
                        </button>
                        <button onClick={() => deletePassword(item._id)} className="text-red-600 hover:text-red-800" title="Delete">
                          <TrashIcon className="w-5 h-5 cursor-pointer" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 text-lg bg-white rounded-xl py-8 shadow-inner">
              No passwords saved.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
