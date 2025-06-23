// src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
   <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center text-black">
  {/* ✨ Background Grid + Radial Light */}
  <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
  </div>

  {/* ✨ Content */}
  <h1 className="text-4xl font-extrabold mb-4">🔐 Welcome to Lockr</h1>
  <p className="text-lg mb-6">Your encrypted password manager — secure, private, and easy to use.</p>
  <div className="flex gap-4">
   <button
  onClick={() => navigate('/login')}
  className="bg-indigo-600 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-indigo-700 hover:shadow-lg shadow-indigo-300 cursor-pointer"
>
  Login
</button>

<button
  onClick={() => navigate('/register')}
  className="border border-indigo-600 px-6 py-2 rounded-full text-indigo-600 transition-all duration-300 transform hover:scale-105 hover:bg-indigo-50 hover:shadow-md shadow-indigo-200 cursor-pointer"
>
  Register
</button>

  </div>
</div>

  );
};

export default LandingPage;
