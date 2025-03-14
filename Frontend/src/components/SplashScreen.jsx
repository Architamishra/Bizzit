import React, { useEffect } from "react";
import bizzing from "./bizzing.png"; // Adjust the path accordingly
import "./SplashScreen.css"; // For animation styles

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src={bizzing} className="logo zoom-in-out" alt="logo" />
    </div>
  );
};

export default SplashScreen;
