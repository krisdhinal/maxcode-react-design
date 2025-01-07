import React, { useState } from "react";
import { toast } from "react-toastify";
import { logout } from "../utils/Auth";

const Dashboard = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.info("Anda telah logout", { position: "top-right" });
    onLogout();
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar - Hidden on mobile by default */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white transition-all duration-300 ease-in-out fixed md:relative ${
          mobileMenuOpen ? "block" : "hidden"
        } md:block h-full z-30`}
      >
        <div className="flex justify-between items-center p-4">
          <span className={`${sidebarOpen ? "block" : "hidden"} text-xl font-bold`}>
            Dashboard
          </span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white p-2 focus:outline-none hidden md:block"
          >
            {sidebarOpen ? (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 5.293a1 1 0 011.414 0L10 7.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zM3 10h14a1 1 0 110 2H3a1 1 0 110-2zM3 15h14a1 1 0 110 2H3a1 1 0 110-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          {/* Close button for mobile */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white p-2 focus:outline-none md:hidden"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <ul>
            {/* Home */}
            <li className="text-sm text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 h-6 text-white ${!sidebarOpen && "mx-auto"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9L12 2l9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                </svg>
                {sidebarOpen && <span>Home</span>}
              </div>
            </li>
            {/* Settings */}
            <li className="text-sm text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 h-6 text-white ${!sidebarOpen && "mx-auto"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-4-5a1 1 0 011-1h6a1 1 0 011 1v1a1 1 0 01-1 1h-6a1 1 0 01-1-1V3zm4 18c1.7 0 3.18-.68 4.25-1.75A6.978 6.978 0 0017 14H7a6.978 6.978 0 00-3.25 5.25C8.82 19.32 10.99 20 12 20z"
                  />
                </svg>
                {sidebarOpen && <span>Settings</span>}
              </div>
            </li>
            {/* Reports */}
            <li className="text-sm text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 h-6 text-white ${!sidebarOpen && "mx-auto"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v14a1 1 0 001 1h16a1 1 0 001-1V7a1 1 0 00-1-1H4a1 1 0 00-1 1zm0 4h16M3 5h16"
                  />
                </svg>
                {sidebarOpen && <span>Reports</span>}
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-gray-800 text-white p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2 focus:outline-none md:hidden"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="text-xl font-bold ml-2">Dashboard</div>
            </div>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                  <span className="text-sm font-medium">JD</span>
                </div>
                <div className="hidden sm:flex items-center space-x-1">
                  <span>John Doe</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdownOpen ? "transform rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-md w-48">
                  <ul className="py-2">
                    <li>
                      <a
                        href="#profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Profile Page
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome to the Dashboard!</h1>
              <p className="mt-4 text-gray-600">This is a responsive dashboard layout that works on mobile, tablet, and desktop screens.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
