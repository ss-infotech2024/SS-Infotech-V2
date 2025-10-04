import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the login state
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/login"); // Redirect to login page after logging out
  };

  return (
    <nav className="bg-blue-600 p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo or Title */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">Admin Panel</Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="text-white hover:bg-blue-500 px-4 py-2 rounded-md">
            Dashboard
          </Link>
          <Link to="/hero-banner" className="text-white hover:bg-blue-500 px-4 py-2 rounded-md">
            Hero Banner
          </Link>
          <Link to="/job-listings" className="text-white hover:bg-blue-500 px-4 py-2 rounded-md">
            Job Listings
          </Link>
          <Link to="/job-applications" className="text-white hover:bg-blue-500 px-4 py-2 rounded-md">
            Job Applications
          </Link>
          <Link to="/gallery" className="text-white hover:bg-blue-500 px-4 py-2 rounded-md">
            Gallery
          </Link>
          <Link to="/certificates" className="text-white hover:bg-blue-500 px-4 py-2 rounded-md">
            Certificates
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
