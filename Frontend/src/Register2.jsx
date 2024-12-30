import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register2.css"; // Import the custom styles

const Register2 = () => {
  const navigate = useNavigate();

  // State variables
  const [verificationMethod, setVerificationMethod] = useState(null); // email or phone
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(15); // Timer for OTP resend
  const [isOtpSent, setIsOtpSent] = useState(false); // Whether OTP is sent or not
  const [isVerified, setIsVerified] = useState(false); // Whether OTP is verified

  // Handle OTP method selection
  const handleVerificationMethod = (method) => {
    setVerificationMethod(method);
    setIsOtpSent(false); // Reset OTP sent state
    setOtp(""); // Reset OTP field
    setTimer(15); // Reset timer
  };

  // Send OTP to email or phone (simulated)
  const sendOtp = () => {
    // Simulating OTP sending
    console.log(`OTP sent to ${verificationMethod}`);
    setIsOtpSent(true);
    startTimer();
  };

  // Timer function for OTP resend
  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0; // Stop the timer
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  // Handle OTP verification
  const handleVerify = () => {
    if (otp.length === 6) {
      console.log("OTP Verified");
      setIsVerified(true);
      navigate("/register3"); // Navigate to Register3 page after verification
    } else {
      alert("Please enter a valid OTP.");
    }
  };

  return (
    <div className="verification-page">
      <div className="verification-container">
        <div className="register-header">
          <div className="section completed">
            Otverification <span className="checkmark">✔</span>
          </div>
          <div className="section completed">
            About Business <span className="checkmark">✔</span>
          </div>
          <div className="section">
            Verification <span className="checkmark"></span>
          </div>
          <div className="section">
            Tax Details <span className="checkmark"></span>
          </div>
          <div className="section">Bank Details</div>
        </div>
        <div className="verification-box">
          <h1>Verification</h1>

          {/* Verification method selection */}
          <div className="verification-method">
            <button
              className={verificationMethod === "email" ? "active" : ""}
              onClick={() => handleVerificationMethod("email")}
            >
              Verify via Email
            </button>
            <button
              className={verificationMethod === "phone" ? "active" : ""}
              onClick={() => handleVerificationMethod("phone")}
            >
              Verify via Phone
            </button>
          </div>

          {/* OTP Input */}
          {isOtpSent && (
            <div className="otp-section">
              <label>Enter OTP:</label>
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              <div className="timer">
                {timer > 0 ? (
                  <span>Resend code in {timer}s</span>
                ) : (
                  <button onClick={sendOtp} className="resend-btn">
                    Resend Code
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Get OTP Button */}
          {!isOtpSent && (
            <button onClick={sendOtp} className="get-otp-btn">
              Get OTP
            </button>
          )}

          {/* Verify Button */}
          {isOtpSent && (
            <button onClick={handleVerify} className="verify-btn">
              Verify
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register2;
