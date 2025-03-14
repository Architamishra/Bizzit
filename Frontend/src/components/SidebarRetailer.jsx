import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaTruck,
  FaFileInvoice,
  FaUserCircle,
  FaSignOutAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests

const RetailerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const handleLogout = async () => {
    const retailerId = localStorage.getItem("register1");
    const retailerName = localStorage.getItem("retailerName");
    const emailId = localStorage.getItem("email");

    if (retailerId && retailerName && emailId) {
      try {
        await axios.post("http://localhost:3300/api/logout", {
          retailerId,
          retailerName,
          emailId,
        });
        console.log("Logout recorded successfully");
      } catch (error) {
        console.error("Logout API Error:", error);
      }
    }

    // Clear local storage and redirect to login page
    localStorage.removeItem("register1");
    localStorage.removeItem("retailerName");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div className="sidebar bg-purple-200 text-white p-4 w-64">
      <h2 className="brand text-2xl font-bold mb-6">Bizzit</h2>
      <ul>
        <li
          className={`flex items-center p-2 cursor-pointer ${
            activePage === "/retailer/retailer-dashboard"
              ? "bg-purple-500"
              : "hover:bg-purple-700"
          }`}
        >
          <Link
            to="/retailer/retailer-dashboard"
            className="flex items-center w-full"
          >
            <FaTachometerAlt className="mr-2" /> Retailer Dashboard
          </Link>
        </li>
        <li
          className={`flex items-center p-2 cursor-pointer ${
            activePage === "/retailer/order-products"
              ? "bg-purple-500"
              : "hover:bg-purple-700"
          }`}
        >
          <Link
            to="/retailer/order-products"
            className="flex items-center w-full"
          >
            <FaShoppingCart className="mr-2" /> Order Products
          </Link>
        </li>
        <li
          className={`flex items-center p-2 cursor-pointer ${
            activePage === "/retailer/view-distributors"
              ? "bg-purple-500"
              : "hover:bg-purple-700"
          }`}
        >
          <Link
            to="/retailer/view-distributors"
            className="flex items-center w-full"
          >
            <FaTruck className="mr-2" /> View Distributors
          </Link>
        </li>
        <li
          className={`flex items-center p-2 cursor-pointer ${
            activePage === "/retailer/payments"
              ? "bg-purple-500"
              : "hover:bg-purple-700"
          }`}
        >
          <Link to="/retailer/payments" className="flex items-center w-full">
            <FaFileInvoice className="mr-2" /> Retailer Payments
          </Link>
        </li>
        <li
          className={`flex items-center p-2 cursor-pointer ${
            activePage === "/retailer/returns"
              ? "bg-purple-500"
              : "hover:bg-purple-700"
          }`}
        >
          <Link to="/retailer/returns" className="flex items-center w-full">
            <FaExchangeAlt className="mr-2" /> Returns
          </Link>
        </li>
        <li
          className={`flex items-center p-2 cursor-pointer ${
            activePage === "/retailer/profile"
              ? "bg-purple-500"
              : "hover:bg-purple-700"
          }`}
        >
          <Link to="/retailer/profile" className="flex items-center w-full">
            <FaUserCircle className="mr-2" /> Retailer Profile
          </Link>
        </li>
        <li
          className="flex items-center p-2 cursor-pointer hover:bg-purple-700"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </li>
      </ul>
    </div>
  );
};

export default RetailerSidebar;
