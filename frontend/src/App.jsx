// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Manager from './components/Manager';     // Home page
import Features from './components/Features';
import Contact from './components/Contact';
import AuthPage from './components/AuthPage';   // Import your AuthPage component
import AuditLog from './components/AuditLog';
import Dashboard from './components/Dashboard';
import LandingPage from "./components/LandingPage";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Navbar />
  <ToastContainer position="top-right" autoClose={1500} /> {/* Global container */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/landing" />} />

          <Route path="/landing" element={<LandingPage />} />
          <Route path="/home" element={<Manager />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/audit-log" element={<AuditLog />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Auth Routes */}
          <Route path="/login" element={<AuthPage key="login" />} />
          <Route path="/register" element={<AuthPage key="register" />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
