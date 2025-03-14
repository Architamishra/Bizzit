import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaBox,
  FaArchive,
  FaBoxes,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
  FaTruck,
  FaFileInvoice,
  FaUserCircle,
  FaUndo,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const handleLogout = async () => {
    const retailerId = localStorage.getItem("register1");
    const retailerName = localStorage.getItem("distributorName");
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
    localStorage.removeItem("distributorName");
    localStorage.removeItem("email");
    navigate("/");
  };
  return (
    <div className="sidebar bg-purple-200 text-white p-4 w-64 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-300">
      <h2 className="brand text-2xl font-bold mb-6">Bizzit</h2>
      <ul>
        {[
          {
            path: "/distributor-dashboard",
            label: "Dashboard",
            icon: FaTachometerAlt,
          },
          { path: "/stock", label: "Stock", icon: FaArchive },
          { path: "/inventory", label: "Inventory", icon: FaBoxes },
          { path: "/orders", label: "Orders", icon: FaShoppingCart },
          { path: "/customers", label: "Customers", icon: FaUsers },
          { path: "/returns", label: "Returns", icon: FaUndo },
          { path: "/suppliers", label: "Suppliers", icon: FaTruck },
          {
            path: "/payments/bills",
            label: "Payments/Bills",
            icon: FaFileInvoice,
          },
          { path: "/profile", label: "Profile", icon: FaUserCircle },
        ].map(({ path, label, icon: Icon }) => (
          <li
            key={path}
            className={`flex items-center p-2 cursor-pointer ${
              activePage === path ? "bg-purple-500" : "hover:bg-purple-700"
            }`}
          >
            <Link to={path} className="flex items-center w-full">
              <Icon className="mr-2" /> {label}
            </Link>
          </li>
        ))}
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

export default Sidebar;
