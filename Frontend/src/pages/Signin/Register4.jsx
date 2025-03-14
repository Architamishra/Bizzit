import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register4 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    accountHolderName: "",
    accountType: "",
    accountNumber: "",
    reEnterAccountNumber: "",
    ifscCode: "",
    upiId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("register")) || [];
    if (existingData.length > 0) {
      setFormData(existingData[4]?.register4Data || formData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    if (
      !formData.name ||
      !formData.accountHolderName ||
      !formData.accountType ||
      !formData.accountNumber ||
      !formData.reEnterAccountNumber ||
      !formData.ifscCode ||
      !formData.upiId
    ) {
      setError("All fields are required!");
      setIsSubmitting(false);
      return;
    }

    if (formData.accountNumber !== formData.reEnterAccountNumber) {
      setError("Account numbers do not match!");
      setIsSubmitting(false);
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("register")) || [];

      if (userData.length === 0) {
        setError("No user data found.");
        setIsSubmitting(false);
        return;
      }

      const newRegisterData = { register4Data: formData };
      userData[4] = newRegisterData;

      localStorage.setItem("register", JSON.stringify(userData));

      navigate("/new-registration");
    } catch (error) {
      console.error("Error during saving bank details:", error);
      setError("An error occurred while saving the bank details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bank-details-page">
      <div className="bank-details-container">
        <div className="register-header">
          <div className="section completed">
            Terms&Conditions <span className="checkmark">✔</span>
          </div>
          <div className="section completed">
            About Business <span className="checkmark">✔</span>
          </div>
          <div className="section completed">
            Tax Details <span className="checkmark">✔</span>
          </div>
          <div className="section">Bank Details</div>
        </div>
        <div className="bank-details-box">
          <h1>Bank Details</h1>
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
          <div className="form-field">
            <label>UPI ID:</label>
            <input
              type="text"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              placeholder="Enter UPI ID"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            onClick={handleSubmit}
            className="continue-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register4;
