import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm"; // Import LoginForm
import SignInForm from "./SignInForm"; // Import SignInForm component
import bizzing from "./bizzing.png"; // Import your loading image
import NewRegistrationPage from "./NewRegistrationPage";
import Register from "./Register"; // Adjust the path accordingly
import Register1 from "./Register1"; // Adjust the path as needed
import Register2 from "./Register2";
import Register3 from "./Register3";
import Register4 from "./Register4";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  // Use useEffect to trigger after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true); // Set the state to true after 5 seconds
    }, 5000); // 5000ms = 5 seconds

    // Cleanup timer on component unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App">
        {!showLogin ? (
          // Show the loading screen (logo) if showLogin is false
          <header className="App-header">
            <img src={bizzing} className="App-logo zoom-in-out" alt="logo" />
          </header>
        ) : (
          // After 5 seconds, show the LoginForm and routes
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/new-registration" element={<NewRegistrationPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register1" element={<Register1 />} />
            <Route path="/register2" element={<Register2 />} />
            <Route path="/register3" element={<Register3 />} />
            <Route path="/register4" element={<Register4 />} />
            <Route path="/dashboard" element={<Dashboard />} />{" "}
            {/* Route for SignInForm */}
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
