import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Register.css";

function Register() {
  const [businessName, setBusinessName] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [completedSections, setCompletedSections] = useState({
    OtpVerification: false,
    business: false,
    verification: false,
    taxDetails: false,
    bankDetails: false,
  });

  const navigate = useNavigate(); // Initialize the navigate function

  // Handle Continue button click
  const handleContinue = () => {
    if (businessName && isAgreed) {
      // Mark 'business' section as completed
      setCompletedSections((prevState) => ({
        ...prevState,
        business: true,
      }));
      navigate("/register1"); // Navigate to the Register1 page if valid
    } else {
      alert("Please fill in all fields and agree to the terms");
    }
  };

  return (
    <div className="register-page">
      {/* Header with sections outside the form */}

      <div className="register-header">
        <div
          className={`section ${
            completedSections.Otpverification ? "completed" : ""
          }`}
        >
          OtpVerification{" "}
          {completedSections.Otpverification && (
            <span className="checkmark">✔</span>
          )}
        </div>
        <div
          className={`section ${completedSections.business ? "completed" : ""}`}
        >
          About Business{" "}
          {completedSections.business && <span className="checkmark">✔</span>}
        </div>
        <div
          className={`section ${
            completedSections.verification ? "completed" : ""
          }`}
        >
          Verification{" "}
          {completedSections.verification && (
            <span className="checkmark">✔</span>
          )}
        </div>
        <div
          className={`section ${
            completedSections.taxDetails ? "completed" : ""
          }`}
        >
          Tax Details{" "}
          {completedSections.taxDetails && <span className="checkmark">✔</span>}
        </div>
        <div
          className={`section ${
            completedSections.bankDetails ? "completed" : ""
          }`}
        >
          Bank Details{" "}
          {completedSections.bankDetails && (
            <span className="checkmark">✔</span>
          )}
        </div>
      </div>

      <div className="register-container">
        {/* Heading inside the form */}
        <h1>Register</h1>

        <div className="input-group">
          <label htmlFor="businessName" className="input-label">
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            className="input-field"
            placeholder="Enter your business name"
          />
        </div>

        <div className="input-group">
          <label className="agreement-label">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
            />
            I agree to the terms and conditions
          </label>
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="continue-button"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Register;
