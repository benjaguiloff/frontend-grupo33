import React, { useState } from "react";
import "./SignupPage.css";
//import axios from "axios";
//import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Submitting signup form with email ${email} and password ${password}`
    );
  };

  return (
    <div className="signup-page">
      <div className="signup-form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2 className="signup-form-title">Create an Account</h2>
          <div className="signup-form-group">
            <label htmlFor="email" className="signup-form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="signup-form-input"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="signup-form-group">
            <label htmlFor="password" className="signup-form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="signup-form-input"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="signup-form-group">
            <label htmlFor="confirm-password" className="signup-form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="signup-form-input"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <button type="submit" className="signup-form-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
