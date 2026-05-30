import React, { useState, useEffect, useRef } from "react";
import {
  Stethoscope,
  User,
  ChevronDown,
  Calendar,
  Clock,
  LogOut,
} from "lucide-react";

const Header = ({ userData, handleLogout, language, setLanguage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentTime = new Date();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Stethoscope className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Rural Health Connect
          </h1>
        </div>

        {/* Right Side (Profile, Language, Time, Logout) */}
        <div className="flex items-center space-x-4">
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">
                {userData?.name || "User"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border p-4 z-50">
                <h3 className="text-lg font-semibold text-gray-800">
                  Profile Details
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Name:</strong> {userData?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Age:</strong> {userData?.age || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {userData?.phone || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Address:</strong> {userData?.address || "N/A"}
                </p>

                <button
                  className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>

          {/* Date & Time */}
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-5 w-5 mr-1" />
            <span>{currentTime.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-5 w-5 mr-1" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
