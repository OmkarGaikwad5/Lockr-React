import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const API = `${import.meta.env.VITE_API_URL}/analytics`;


const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (res.ok) {
        setStats(data);
      } else {
        toast.error(data.error || 'Failed to fetch analytics');
      }
    } catch (err) {
      toast.error('Error loading analytics');
      console.error('📉 Dashboard error:', err);
    }
  };

  return (
    <div className="min-h-screen px-6 pt-24 pb-12 bg-gray-100">
      <ToastContainer />
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard</h1>

        {stats ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl shadow text-center">
                <p className="text-gray-500">Total Passwords</p>
                <h2 className="text-2xl font-bold text-indigo-600">{stats.totalPasswords}</h2>
              </div>
              <div className="bg-white p-6 rounded-xl shadow text-center">
                <p className="text-gray-500">Total Logs</p>
                <h2 className="text-2xl font-bold text-purple-600">{stats.totalLogs}</h2>
              </div>
              <div className="bg-white p-6 rounded-xl shadow text-center">
                <p className="text-gray-500">Actions Tracked</p>
                <ul className="text-sm mt-2 space-y-1">
                  {stats.actionStats.map((a) => (
                    <li key={a._id}>
                      <span className="capitalize">{a._id}</span>: <strong>{a.count}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">🕒 Recent Activity</h2>
              <ul className="space-y-3 text-gray-600">
                {stats.recentLogs.map((log) => (
                  <li key={log._id}>
                    [{new Date(log.timestamp).toLocaleString()}] — {log.action} on <strong>{log.site}</strong> ({log.username})
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>Loading dashboard...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
