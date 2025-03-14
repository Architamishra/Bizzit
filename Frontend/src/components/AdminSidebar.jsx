import React, { useState, useEffect } from "react";
import { FaTachometerAlt, FaUsers, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; 
import "./sidebar.css"; // Ensure you have the same styles or adjust as needed

const AdminSidebar = () => {
  const location = useLocation(); 
  const [activePage, setActivePage] = useState(location.pathname); 

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  return (
    <div className="sidebar bg-purple-200 text-white p-4 w-64">
      <h2 className="brand text-2xl font-bold mb-6">Admin Panel</h2>
      <ul>
        <li
          className={`flex items-center p-2 cursor-pointer ${activePage === '/admin-dashboard' ? 'bg-purple-500' : 'hover:bg-purple-700'}`}
          onClick={() => setActivePage('/admin-dashboard')}
        >
          <Link to="/admin-dashboard" className="flex items-center w-full">
            <FaTachometerAlt className="mr-2" /> Dashboard
          </Link>
        </li>
        <li
          className={`flex items-center p-2 cursor-pointer ${activePage === '/view-users' ? 'bg-purple-500' : 'hover:bg-purple-700'}`}
          onClick={() => setActivePage('/view-users')}
        >
          <Link to="/view-users" className="flex items-center w-full">
            <FaUsers className="mr-2" /> View Users
          </Link>
        </li>
        <li
          className={`flex items-center p-2 cursor-pointer ${activePage === '/logs' ? 'bg-purple-500' : 'hover:bg-purple-700'}`}
          onClick={() => setActivePage('/logs')}
        >
          <Link to="/logs" className="flex items-center w-full">
            <FaFileAlt className="mr-2" /> Logs
          </Link>
        </li>
        <li
          className={`flex items-center p-2 cursor-pointer hover:bg-purple-700`}
          onClick={() => {
            // Handle logout logic here
            console.log("Logging out...");
          }}
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;