import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <input type="text" className="search-bar" placeholder="Search" />
      <div className="profile">
        <div className="text-info">
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>Manoj Singh</p>
          <span className="distributor">Distributor</span>
        </div>
        <FaUserCircle className="profile-icon" />
      </div>
    </header>
  );
};

export default Header;
