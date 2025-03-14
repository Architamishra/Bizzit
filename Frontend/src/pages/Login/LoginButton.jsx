// src/pages/Login/LoginButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserLock } from "react-icons/fa"; // Import an icon from react-icons

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Login Page</h2>
        
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-3"
          onClick={() => navigate("/logindistributor")}
        >
          Login as Distributor
        </button>

        <button
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 mb-4"
          onClick={() => navigate("/loginretailer")}
        >
          Login as Retailer
        </button>

        <p className="text-gray-600 mb-2">Don't have an account?</p>
        <button
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300"
          onClick={() => navigate("/signin")}
        >
          Create an Account
        </button>

        {/* Admin Login Icon */}
        <div className="mt-4">
          <button
            onClick={() => navigate("/admin-login")}
            className="flex items-center justify-center bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition duration-300"
            title="Admin Login"
          >
            <FaUserLock size={24} className="text-blue-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginButton;