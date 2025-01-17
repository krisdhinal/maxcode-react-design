import React from "react";
import { toast } from "react-toastify";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("accessToken", "2df767d6-5c06-49d3-97d2-591e3399dd3b");
    localStorage.setItem("session", "dd19962d-b489-405c-a643-a8dffa609f58");
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcmlzZGhpbmFsQGdtYWlsLmNvbSIsImlhdCI6MTczNzEzOTUyNywiZXhwIjoxNzM3MjI1OTI3fQ.ZZ5WQATEZbVuZbGz9iu6lmuMiRcHcXQVKUlcXjgnhU3lDQRoupCyBfdfjF8H9mdbBUBBNlWCLiWMEIr1Gxsrfw"
    );
    toast.success("Anda berhasil login!", { position: "top-right" });
    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Background Image - Left side on desktop, full width on mobile */}
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src={Logo}
          alt="Office"
          className="object-contain w-3/5 h-3/5 absolute inset-0 m-auto"
        />
      </div>

      {/* Mobile background */}
      <div className="md:hidden absolute inset-0">
        <img
          src={Logo}
          alt="Office"
          className="object-contain w-3/5 h-3/5 mx-auto my-auto"
        />
      </div>

      {/* Login Form Container - Right side on desktop, centered on mobile */}
      <div className="relative md:w-1/2 flex flex-col items-center justify-center px-8 py-12 space-y-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md"
        >
          <div className="flex flex-col items-center mb-8">
            <img
              src="https://maxcode.co.id/images/logo.d75e0de9.png"
              alt="Maxcode Logo"
              className="h-24 w-auto"
            />
            <p className="font-bold mt-2">
              Print Barcode integrated with Accurate
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="bg-white/90 backdrop-blur-sm p-4 md:p-8 rounded-lg shadow-xl w-full max-w-md mt-4 md:mt-0">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
            Contact Us
          </h2>
          <div className="space-y-3">
            <p className="text-sm md:text-base text-gray-600 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="font-semibold">Email:&nbsp;&nbsp;</span>{" "}
              admin@maksi.id
            </p>
            <p className="text-sm md:text-base text-gray-600 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="font-semibold">Phone:&nbsp;&nbsp;</span> +62
              818-8284-2888
            </p>
            <p className="text-sm md:text-base text-gray-600 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold">Address:&nbsp;&nbsp;</span>{" "}
              www.maksimediaindonesia.co.id
            </p>
          </div>
        </div>
        <div className="text-center mt-4 text-sm text-gray-600 font-bold">
          <p>Powered by PT. Maksi Media Indonesia</p>
          <p>©2025</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
