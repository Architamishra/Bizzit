// LoginForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./LoginForm.css"; // Import your login styles

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Welcome</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Continue
          </button>

          <div className="signup-link">
            <div className="line"></div>
            <p className="link-text">Don't have an account yet?</p>
            <Link to="/signin" className="link">
              Create an account
            </Link>
            <div className="line"></div>
          </div>

          <div className="or-divider">
            <p>or</p>
          </div>

          <div className="google-button-group">
            <button className="google-button">
              <img src="Google.png" alt="Google" /> Continue with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
