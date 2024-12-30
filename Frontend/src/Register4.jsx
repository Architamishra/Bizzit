import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register4.css"; // Import custom styles for Register4 page

const Register4 = () => {
  const navigate = useNavigate();

  // State for storing form data
  const [formData, setFormData] = useState({
    name: "",
    accountHolderName: "",
    accountType: "",
    accountNumber: "",
    reEnterAccountNumber: "",
    ifscCode: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission and navigate to Dashboard
  const handleSubmit = () => {
    // Form validation or other logic can go here
    if (formData.accountNumber === formData.reEnterAccountNumber) {
      navigate("/dashboard"); // Navigate to Dashboard after successful form submission
    } else {
      alert("Account numbers do not match!");
    }
  };

  return (
    <div className="bank-details-page">
      <div className="bank-details-container">
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
          <div className="section completed">
            Tax Details <span className="checkmark">✔</span>
          </div>
          <div className="section">Bank Details</div>
        </div>
        <div className="bank-details-box">
          <h1>Bank Details</h1>

          {/* Name */}
          <div className="form-field">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
          </div>

          {/* Account Holder Name */}
          <div className="form-field">
            <label>Account Holder Name:</label>
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              placeholder="Enter Account Holder Name"
            />
          </div>

          {/* Account Type */}
          <div className="form-field">
            <label>Account Type:</label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
            >
              <option value="">Select Account Type</option>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </div>

          {/* Account Number */}
          <div className="form-field">
            <label>Account Number:</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Enter Account Number"
            />
          </div>

          {/* Re-enter Account Number */}
          <div className="form-field">
            <label>Re-enter Account Number:</label>
            <input
              type="text"
              name="reEnterAccountNumber"
              value={formData.reEnterAccountNumber}
              onChange={handleChange}
              placeholder="Re-enter Account Number"
            />
          </div>

          {/* IFSC Code */}
          <div className="form-field">
            <label>IFSC Code:</label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              placeholder="Enter IFSC Code"
            />
          </div>

          {/* Continue Button */}
          <button onClick={handleSubmit} className="continue-button">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register4;
