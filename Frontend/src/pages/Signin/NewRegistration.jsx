import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function OTPVerificationPage() {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [method, setMethod] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { emailOrPhone = "", selectedMethod = "" } = location.state || {};

  const storedData = JSON.parse(localStorage.getItem("register")) || {};
  const storedEmail = storedData.email || "";

  useEffect(() => {
    setContactInfo(storedEmail || emailOrPhone);
    setMethod(selectedMethod);
  }, [storedEmail, emailOrPhone, selectedMethod]);

  const handleGetOtp = () => {
    if (contactInfo && method) {
      console.log(`OTP sent to: ${contactInfo} via ${method}`);
      setOtpSent(true);
      setCountdown(15);
    } else {
      alert("Please select a valid contact method (Email or Phone).");
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerifyOtp = async () => {
    if (otp === "1234") {
      setIsVerified(true);
      console.log("OTP verified successfully!");

      const userData = JSON.parse(localStorage.getItem("register")) || [];

      if (userData.length === 0) {
        setError("No user data found.");
        return;
      }

      const signupData = {
        fullname: userData[0]?.fullname,
        email: userData[0]?.email,
        phoneNumber: userData[0]?.phoneNumber,
        role: userData[0]?.role || "retailer",
        gender: userData[0]?.gender,
        workAddress: userData[0]?.workAddress,
        password: userData[0]?.password,
        business: userData[1]?.registerData,
        businessDetails: userData[2]?.register1Data,
        taxDetails: userData[3]?.register3Data,
        bankDetails: userData[4]?.register4Data,
      };

      console.log("Signup Data:", signupData);

      try {
        const response = await axios.post(
          "http://localhost:3300/auth/register",
          signupData
        );

        if (response.status === 201) {
          console.log("Registration Successful:", response.data);
          localStorage.removeItem("register");

          const role1 = userData[0]?.role || "retailer";
          if (role1 === "retailer") {
            navigate("/loginretailer");
          } else if (role1 === "distributor") {
            navigate("/logindistributor");
          }
        } else {
          setError("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setError("An error occurred during registration.");
      }
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[800px] max-w-full">
        <h1 className="text-5xl font-bold mb-8 text-center font-serif">
          OTP Verification
        </h1>

        <div className="email-verification-info mb-4">
          <span>The email used for verification is: {storedEmail}</span>
          <button
            onClick={() => navigate("/signin")}
            className="edit-email-button text-blue-500 hover:underline"
          >
            Edit Email
          </button>
        </div>

        <div className="input-group mb-4">
          <label className="input-label">
            OTP will be sent to:
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="method-select border rounded-md p-2 w-full"
              required
            >
              <option value="">Select Email or Phone</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </label>
        </div>

        {method && (
          <div className="input-group mb-4">
            <label className="input-label">
              {method === "email"
                ? "Enter your Email:"
                : "Enter your Phone Number:"}
            </label>
            <input
              type={method === "phone" ? "tel" : "email"}
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="input-field border rounded-md p-2 w-full"
              placeholder={`Enter your ${method}`}
              required
            />
          </div>
        )}

        {otpSent && (
          <>
            <div className="input-group mb-4">
              <label htmlFor="otp" className="input-label">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                required
                className="input-field border rounded-md p-2 w-full"
                placeholder="Enter OTP"
                maxLength={4}
              />
            </div>
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="verify-button bg-blue-500 text-white font-bold p-2 rounded-md w-full"
            >
              Verify
            </button>
            <div className="resend-section mt-4">
              <span>
                Resend OTP{" "}
                <a
                  href="#"
                  onClick={() => countdown <= 0 && setCountdown(15)}
                  className={
                    countdown > 0 ? "disabled" : "text-blue-500 hover:underline"
                  }
                >
                  {countdown > 0 ? `(${countdown}s)` : "Click here to resend"}
                </a>
              </span>
            </div>
          </>
        )}

        {!otpSent && (
          <button
            type="button"
            onClick={handleGetOtp}
            className="get-otp-button bg-blue-500 text-white font-bold p-2 rounded-md w-full mt-4"
          >
            Get OTP
          </button>
        )}
      </div>
      {isVerified && (
        <p className="success-message text-green-500 text-center mt-4">
          OTP Verified Successfully!
        </p>
      )}
      {error && (
        <div className="error-message text-red-500 text-center mt-4">
          {error}
        </div>
      )}
    </div>
  );
}

export default OTPVerificationPage;
