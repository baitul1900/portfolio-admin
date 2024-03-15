import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { verifyOTP } from "../store/authStore";

const OTPComponent = () => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]); // Array to hold OTP digits
  const navigate = useNavigate(); // Initialize useNavigate hook
  const inputRefs = useRef([]); // Ref for input fields

  const handleChange = (index, e) => {
    const newOTP = [...otp];
    newOTP[index] = e.target.value;
    setOTP(newOTP);

    // Move focus to next input field
    if (e.target.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOTP = otp.join(""); // Join OTP digits into a single string

    // Verify OTP
    try {
      const response = await verifyOTP(
        sessionStorage.getItem("email"),
        enteredOTP
      );
      if (response && response.status === "success") {
        toast.success("OTP verified successfully"); // Display success message
        navigate("/login"); // Redirect to dashboard
      } else {
        toast.error(response.message || "Failed to verify OTP"); // Display error message
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred while verifying OTP");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="form" onSubmit={handleSubmit}>
            <div className="mb-3 d-flex justify-content-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  ref={(ref) => (inputRefs.current[index] = ref)} // Set ref for input field
                />
              ))}
            </div>
            <button type="submit" className="btn btn-primary">
              Verify OTP
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default OTPComponent;
