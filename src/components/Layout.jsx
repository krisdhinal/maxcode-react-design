import React, { useState } from "react";
import { toast } from "react-toastify";
import { logout } from "../utils/Auth";
import Maxcode from "../assets/maxcode.png";
import { Link, useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Layout = ({ children, title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [barcodeSubmenuOpen, setBarcodeSubmenuOpen] = useState(true); // Added state for barcode submenu

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.info("Anda telah logout", { position: "top-right" });
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
        <div className="flex justify-between items-center text-black p-3 bg-white">
          <img
            src={Maxcode}
            alt="logo"
            className={`${!sidebarOpen ? "w-auto h-auto" : "w-[32px]"}`}
          />
          {sidebarOpen ? <p>MAXCODE</p> : null}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-black p-2 focus:outline-none hidden md:block"
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <ul>
            {/* Barcode Menu */}
            <li className="text-sm text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
              <button
                onClick={() => setBarcodeSubmenuOpen(!barcodeSubmenuOpen)}
                className="w-full flex items-center space-x-2"
              >
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
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                {sidebarOpen && (
                  <div className="flex items-center justify-between w-full">
                    <span>Barcode</span>
                    <svg
                      className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                        barcodeSubmenuOpen ? "transform rotate-180" : ""
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
                )}
              </button>
              {sidebarOpen && barcodeSubmenuOpen && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li
                    className="text-sm text-gray-300 hover:bg-gray-700 px-3 py-2 rounded cursor-pointer"
                    onClick={() => {
                      navigate("/receive");
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8"
                        />
                      </svg>
                      <span>Receive</span>
                    </div>
                  </li>
                  <li
                    className="text-sm text-gray-300 hover:bg-gray-700 px-3 py-2 rounded cursor-pointer"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                        />
                      </svg>
                      <span>Print</span>
                    </div>
                  </li>
                  {/* Settings Submenu 
                  <li className="text-sm text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Print Setting</span>
                    </div>
                  </li> */}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Navbar */}
        <nav className="bg-gray-800 text-black p-4 bg-white relative">
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="text-xl font-bold ml-2">{title}</div>
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
                <div className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-md w-48 z-[99999]">
                  <ul className="py-2">
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
        <div className="flex-1 overflow-auto">
          <nav className="bg-gray-100 p-4 relative">
            <ol className="flex space-x-2 text-sm">
              <li>
                <Link to="/" className="text-blue-600 hover:underline">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/barcode" className="text-blue-600 hover:underline">
                  Barcode
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-500">Print Product</li>
            </ol>
          </nav>
          <div className="bg-gray-100 min-h-screen p-4 flex justify-center">
            <DndProvider
              context={typeof window !== "undefined" ? window : undefined}
              backend={HTML5Backend}
            >
              {children}
            </DndProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
