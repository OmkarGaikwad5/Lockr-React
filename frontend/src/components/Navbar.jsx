import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();

    // Sync auth status across tabs
    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth); // ✅ Add this line

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth); // ✅ And cleanup here
    };

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/10 dark:bg-[#0f111a]/50 border-b border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold tracking-wide cursor-pointer">
          🔐 Lockr
        </Link>

        {/* Hamburger menu for small screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <XMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4 items-center">
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                className="text-black px-5 py-2 rounded-full font-semibold bg-white hover:bg-yellow-300 transition duration-300 shadow-md"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-black px-5 py-2 rounded-full font-semibold bg-white hover:bg-yellow-300 transition duration-300 shadow-md"
              >
                Dashboard
              </Link>

              <Link
                to="/audit-log"
                className="text-black px-5 py-2 rounded-full font-semibold bg-white hover:bg-yellow-300 transition duration-300 shadow-md"
              >
                Audit Logs
              </Link>
              <Link
                to="/features"
                className="text-black px-5 py-2 rounded-full font-semibold bg-white hover:bg-yellow-300 transition duration-300 shadow-md"
              >
                Features
              </Link>
              <Link
                to="/contact"
                className="text-black px-5 py-2 rounded-full font-semibold bg-white hover:bg-yellow-300 transition duration-300 shadow-md"
              >
                Contact
              </Link>
              <button
                onClick={handleLogout}
                className="cursor-pointer text-white px-5 py-2 rounded-full font-semibold bg-red-500 hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-black px-5 py-2 rounded-full font-semibold bg-white hover:bg-green-300 transition duration-300 shadow-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-black px-5 py-2 rounded-full font-semibold bg-white hover:bg-blue-300 transition duration-300 shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-3 px-4 pb-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-black w-full px-5 py-2 rounded-full font-semibold bg-white hover:bg-yellow-300 transition duration-300 shadow-md text-center block"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-center text-black px-5 py-2 rounded-full font-semibold bg-white hover:bg-yellow-300 transition duration-300 shadow-md"
              >
                Dashboard
              </Link>

              <Link
                to="/audit-log"
                className="text-center text-black px-5 py-2 rounded-full font-semibold bg-white hover:bg-yellow-300 transition duration-300 shadow-md"
              >
                Audit Logs
              </Link>
              <Link
                to="/features"
                onClick={() => setIsOpen(false)}
                className="text-black w-full px-5 py-2 rounded-full font-semibold bg-white hover:bg-yellow-300 transition duration-300 shadow-md text-center block"
              >
                Features
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="text-black w-full px-5 py-2 rounded-full font-semibold bg-white hover:bg-yellow-300 transition duration-300 shadow-md text-center block"
              >
                Contact
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-white px-5 py-2 rounded-full font-semibold bg-red-500 hover:bg-red-600 transition duration-300 shadow-md text-center block"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-black w-full px-5 py-2 rounded-full font-semibold bg-white hover:bg-green-300 transition duration-300 shadow-md text-center block"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="text-black w-full px-5 py-2 rounded-full font-semibold bg-white hover:bg-blue-300 transition duration-300 shadow-md text-center block"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
