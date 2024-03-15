import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../store/authStore";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    image: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("email", formData.email);

     // Phone number validation
     const isValidPhoneNumber = /^\+88\d{11}$/.test(formData.phone);
     if (!isValidPhoneNumber) {
       toast.error("Please enter a valid Bangladeshi phone number with +88"); // Display error message
       return;
     }

    // Start loading
    setLoading(true);

    // Check if the email already exists
    try {
      const response = await registerUser(formData);
      if (response && response.status === "success") {
        toast.success(response.message); // Display success message
        navigate("/otp"); // Redirect to OTP page
      } else {
        toast.error(response.message || "Failed to register user"); // Display error message
      }
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.response && error.response.status === 409) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        toast.error("An error occurred while registering user");
      }
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Phone"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Registration;
