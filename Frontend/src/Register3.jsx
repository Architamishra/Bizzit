import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register3.css"; // Import custom styles for Register3 page

const Register3 = () => {
  const navigate = useNavigate();

  // State for storing form data
  const [formData, setFormData] = useState({
    state: "",
    legalName: "",
    gstNumber: "",
    panNumber: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission and navigate to next page (Register4)
  const handleSubmit = () => {
    navigate("/register4"); // Navigate to Register4 after form submission
  };

  return (
    <div className="tax-details-page">
      <div className="tax-details-container">
        <div className="register-header">
          <div className="section completed">
            Otverification <span className="checkmark">✔</span>
          </div>
          <div className="section completed">
            About Business <span className="checkmark">✔</span>
          </div>
          <div className="section completed">
            Verification <span className="checkmark">✔</span>
          </div>
          <div className="section">
            Tax Details <span className="checkmark"></span>
          </div>
          <div className="section">Bank Details</div>
        </div>
        <div className="tax-details-box">
          <h1>Tax Details</h1>
          <h3>Enter your tax details</h3>

          {/* State */}
          <div className="form-field">
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter State"
            />
          </div>

          {/* Legal Name */}
          <div className="form-field">
            <label>Your Legal Name:</label>
            <input
              type="text"
              name="legalName"
              value={formData.legalName}
              onChange={handleChange}
              placeholder="Enter Your Legal Name"
            />
          </div>

          {/* GST Number */}
          <div className="form-field">
            <label>GST Number:</label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              placeholder="Enter GST Number"
            />
          </div>

          {/* PAN Number */}
          <div className="form-field">
            <label>PAN Number:</label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="Enter PAN Number"
            />
          </div>

          {/* Next Button */}
          <button onClick={handleSubmit} className="next-button">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register3;
