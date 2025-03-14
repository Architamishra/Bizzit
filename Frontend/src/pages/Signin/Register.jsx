import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [businessName, setBusinessName] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [completedSections, setCompletedSections] = useState({
    termsAndConditions: false,
    business: false,
    taxDetails: false,
    bankDetails: false,
  });

  const navigate = useNavigate();

  const handleContinue = () => {
    if (businessName && isAgreed) {
      const signupData = {
        businessName: businessName,
        isAgreed: isAgreed,
      };

      console.log("Business Name and Agreement: ", signupData);

      let existingUsers = JSON.parse(localStorage.getItem("register")) || [];

      while (existingUsers.length < 2) {
        existingUsers.push(null);
      }

      existingUsers[1] = { registerData: signupData };

      localStorage.setItem("register", JSON.stringify(existingUsers));

      // Update completed sections
      setCompletedSections((prevState) => ({
        ...prevState,
        business: true,
        termsAndConditions: true,
      }));

      navigate("/register1");
    } else {
      alert("Please fill in all fields and agree to the terms");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[800px] max-w-full">
        <h1 className="text-5xl font-bold mb-8 text-center font-serif">
          Register
        </h1>

        <div className="register-header">
          <div
            className={`section ${
              completedSections.termsAndConditions ? "completed" : ""
            }`}
          >
            Terms & Conditions{" "}
            {completedSections.termsAndConditions && (
              <span className="checkmark">✔</span>
            )}
          </div>
          <div
            className={`section ${
              completedSections.business ? "completed" : ""
            }`}
          >
            About Business{" "}
            {completedSections.business && <span className="checkmark">✔</span>}
          </div>
          <div
            className={`section ${
              completedSections.taxDetails ? "completed" : ""
            }`}
          >
            Tax Details{" "}
            {completedSections.taxDetails && (
              <span className="checkmark">✔</span>
            )}
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

        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 gap-y-6"
        >
          <div className="flex flex-col">
            <label htmlFor="businessName" className="font-medium">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              className="border rounded-md p-2 w-full"
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
            className="bg-blue-500 text-white font-bold p-2 rounded-md w-full"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
