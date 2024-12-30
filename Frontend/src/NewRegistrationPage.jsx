import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import "./OTPVerificationPage.css"; // CSS for the page

function OTPVerificationPage() {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [contactInfo, setContactInfo] = useState(""); // For storing email or phone input
  const [method, setMethod] = useState(""); // Store method (email or phone)

  const navigate = useNavigate(); // Initialize the navigate function
  const location = useLocation(); // Get location to access passed data
  const { emailOrPhone, selectedMethod } = location.state || {}; // Retrieve email or phone from SignInForm

  useEffect(() => {
    if (emailOrPhone && selectedMethod) {
      setContactInfo(emailOrPhone); // Set contact info based on SignInForm data
      setMethod(selectedMethod); // Set the method (email or phone)
    }
  }, [emailOrPhone, selectedMethod]);

  // Handle the "Get OTP" button click
  const handleGetOtp = () => {
    if (contactInfo && method) {
      console.log(`OTP sent to: ${contactInfo} via ${method}`);
      setOtpSent(true);
      setCountdown(15); // Start countdown for Resend OTP link
    } else {
      alert("Please select a valid contact method (Email or Phone).");
    }
  };

  // Countdown effect for the "Resend OTP" link
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, [countdown]);

  // Handle OTP verification
  const handleVerifyOtp = () => {
    if (otp === "1234") {
      setIsVerified(true);
      console.log("OTP verified successfully!");
      navigate("/register"); // Navigate to the Register page after successful verification
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="otp-verification-page">
      <h1>OTP Verification</h1>
      <div className="otp-verification-container">
        {/* Provide option to select method (Email or Phone) */}
        <div className="input-group">
          <label className="input-label">
            OTP will be sent to:
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="method-select"
              required
            >
              <option value="">Select Email or Phone</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </label>
        </div>

        {/* Display selected contact info */}
        {method && (
          <div className="input-group">
            <label className="input-label">
              {method === "email"
                ? "Enter your Email:"
                : "Enter your Phone Number:"}
            </label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="input-field"
              placeholder={`Enter your ${method}`}
              required
            />
          </div>
        )}

        {/* OTP Sent Section */}
        {otpSent && (
          <>
            <div className="input-group">
              <label htmlFor="otp" className="input-label">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="input-field"
                placeholder="Enter OTP"
              />
            </div>
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="verify-button"
            >
              Verify
            </button>
            <div className="resend-section">
              <span>
                Resend OTP{" "}
                <a
                  href="#"
                  onClick={() => {
                    if (countdown <= 0) {
                      setCountdown(15); // Reset countdown
                      setOtpSent(false); // Reset OTP sent state
                    }
                  }}
                  className={countdown > 0 ? "disabled" : ""}
                >
                  {countdown > 0 ? `(${countdown}s)` : "Click here to resend"}
                </a>
              </span>
            </div>
          </>
        )}

        {/* Get OTP Button */}
        {!otpSent && (
          <button
            type="button"
            onClick={handleGetOtp}
            className="get-otp-button"
          >
            Get OTP
          </button>
        )}
      </div>

      {isVerified && (
        <p className="success-message">OTP Verified Successfully!</p>
      )}
    </div>
  );
}

export default OTPVerificationPage;
