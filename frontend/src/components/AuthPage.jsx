import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { startLoader,stopLoader } from '../utils/nprogressLoader';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPath = location.pathname === '/login';

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // 👁 Toggle

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLoginPath && formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const endpoint = isLoginPath
    ? `${import.meta.env.VITE_API_URL}/api/auth/login`
    : `${import.meta.env.VITE_API_URL}/api/auth/register`;

  const payload = isLoginPath
    ? { email: formData.email, password: formData.password }
    : { name: formData.name, email: formData.email, password: formData.password };

  try {
    startLoader(); // ✅ Start the top loader

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // ⏱ max 1s

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await res.json();

   if (!res.ok) {
  stopLoader();
  console.error("❌ Auth error response:", data); // log for debug
  toast.error(data?.message || data?.error || 'Authentication failed');
  return;
}


    stopLoader(); // ✅ Stop loader before success actions

    if (isLoginPath) {
      localStorage.setItem('token', data.token);
      window.dispatchEvent(new Event("authChange"));
      navigate('/home');
      setTimeout(() => toast.success('Login successful!'), 200);
    } else {
      window.dispatchEvent(new Event("authChange"));
      navigate('/login');
      setTimeout(() => toast.success('Registration successful!'), 200);
    }
  } catch (error) {
    stopLoader(); // ✅ Stop loader on catch
    console.error("🔴 Auth error:", error);
    toast.error(error.name === 'AbortError' ? 'Server timeout, try again' : 'Server error. Please try again later.');
  }
};



  const toggleRoute = () => {
    navigate(isLoginPath ? '/register' : '/login');
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 text-black">
      {/* ✨ Background grid + radial light */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      {/* Auth box content */}
      <ToastContainer position="top-right" autoClose={1500} />
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLoginPath ? 'Login to Lockr' : 'Register for Lockr'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginPath && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border rounded-md"
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md pr-10"
            />
            <div
              className="absolute top-[42px] right-3 text-gray-600 hover:text-black cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer"
          >
            {isLoginPath ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          {isLoginPath ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={toggleRoute}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            {isLoginPath ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>

  );
};

export default AuthPage;
