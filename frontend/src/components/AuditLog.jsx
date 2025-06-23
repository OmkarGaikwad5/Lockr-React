import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = `${import.meta.env.VITE_API_URL}/api/audit-logs`;



const AuditLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
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
        setLogs(result.data || []);
      } else {
        toast.error(result.message || "Failed to fetch audit logs");
      }
    } catch (err) {
      console.error("❌ Fetch Audit Logs Error:", err);
      toast.error("Failed to load audit logs");
    }
  };

  return (
    <div className="min-h-screen px-6 pt-24 pb-12 bg-slate-100">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="container mx-auto max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🔍 Audit Logs</h2>

        {logs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-800">
              <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <tr>
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3">Site</th>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-indigo-600">{log.action}</td>
                    <td className="px-6 py-4">{log.site}</td>
                    <td className="px-6 py-4">{log.username}</td>
                    <td className="px-6 py-4">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No audit logs found.</p>
        )}
      </div>
    </div>
  );
};

export default AuditLog;
