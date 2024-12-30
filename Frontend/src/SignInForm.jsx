import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./SignInForm.css"; // Import SignInForm CSS here

function SignInForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [workaddress, setWorkaddress] = useState(""); // Corrected state variable
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation if needed
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Perform further actions like submitting the form data (e.g., to a backend)

    // Redirect to the NewRegistrationPage after form submission
    navigate("/new-registration"); // This will navigate to NewRegistrationPage
  };

  return (
    <div className="signin-page">
      <div className="signin-form-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="horizontal-form">
          <div className="input-group">
            <label htmlFor="name" className="input-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone" className="input-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="workaddress" className="input-label">
              Work Address
            </label>
            <input
              type="text"
              id="workaddress"
              value={workaddress}
              onChange={(e) => setWorkaddress(e.target.value)} // Fixed the onChange handler
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Role</label>
            <div className="role-options">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Retailer"
                  checked={role === "Retailer"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Retailer
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Distributor"
                  checked={role === "Distributor"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Distributor
              </label>
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Gender</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={gender === "Other"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Other
              </label>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password" className="input-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
