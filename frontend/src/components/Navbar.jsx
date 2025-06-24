import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/landing");
    toast.success("Logged Out Successfully");
  };

  const hiddenRoutes = ["/login", "/register", "/landing"];
  const isHiddenRoute = hiddenRoutes.includes(window.location.pathname);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/10 dark:bg-[#0f111a]/50 border-b border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <span
          onClick={() => {
            const token = localStorage.getItem("token");
            if (token) {
              navigate("/home");
            } else {
              toast.error("Please login to continue");
            }
          }}
          className="text-black text-2xl font-bold tracking-wide cursor-pointer"
        >
          🔐 Lockr
        </span>

        {/* Hamburger menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <XMarkIcon className="w-6 h-6 text-black" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-black" />
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4 items-center">
          {isAuthenticated && !isHiddenRoute && (
            <>
              <Link
                to="/home"
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
          )}
        </div>
      </div>

      {/* Mobile Menu (consistent styles with desktop) */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-3 px-4 pb-4 pt-2 bg-white/10 dark:bg-[#0f111a]/50 backdrop-blur-lg border-t border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
          {isAuthenticated && !isHiddenRoute && (
            <>
              <Link
                to="/home"
                onClick={() => setIsOpen(false)}
                className="text-black w-full px-5 py-2 rounded-full font-semibold bg-white hover:bg-yellow-300 transition duration-300 shadow-md text-center block"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="text-center text-black px-5 py-2 rounded-full font-semibold bg-white hover:bg-yellow-300 transition duration-300 shadow-md"
              >
                Dashboard
              </Link>
              <Link
                to="/audit-log"
                onClick={() => setIsOpen(false)}
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
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
