import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-24 bg-[#0F111A]/80 backdrop-blur-xl border-t border-white/20 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center text-center md:text-left">

        {/* Brand & Tagline */}
        <div>
          <h1 className="text-3xl font-bold  bg-clip-text">
            🔐 Lockr
          </h1>
          <p className="text-sm text-white mt-3 leading-relaxed max-w-sm mx-auto md:mx-0">
            Your secure password manager — built for <span className="text-pink-400">privacy</span>, designed for <span className="text-purple-400">simplicity</span>.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center md:justify-center gap-6">
          <a
            href="https://github.com/OmkarGaikwad5?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-white hover:text-pink-400 hover:scale-110 transition duration-300"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/omkar-gaikwad-ba2356301/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-white hover:text-blue-400 hover:scale-110 transition duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/gaikwad_omkar_official_/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-white hover:text-purple-400 hover:scale-110 transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Contact / CTA */}
        <div className="space-y-2">
          <p className="text-sm text-white">Want to collaborate or have a question?</p>
          <a
            href="/contact"
            className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium hover:scale-105 transition transform duration-300 shadow-md"
          >
            Get in Touch →
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 text-center text-xs text-white py-4 px-6">
        © {new Date().getFullYear()} <span className="font-semibold text-white">Lockr</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
