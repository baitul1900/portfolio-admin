import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { loginUser } from "../store/authStore";
import Lottie from "lottie-react";
import loginAnimation from "../assets/animation/login-animation.json";
import { LoadingOutlined } from '@ant-design/icons';

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(formData.email, formData.password);
      if (response.status === "success") {
        toast.success("Successfully Logged In!");
        navigate("/profile");
      } else {
        toast.error(response.message || "Failed to login");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred while logging in");
    }
    setLoading(false);
  };

  return (
    <div
      className="container-fluid p-0 d-flex justify-content-start align-items-center"
      id="login-container"
    >
      {loading ? (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark" style={{ zIndex: 9999 }}>
          <LoadingOutlined style={{ fontSize: 48, color: "#fff" }} spin />
        </div>
      ) : null}

      <Toaster position="bottom-center" reverseOrder={false} />
      
      <div className="container" style={{ maxWidth: "1000px" }}>
        <div className="row">
          <div className="col-6 d-flex justify-content-center align-items-center">
            <Lottie
              animationData={loginAnimation}
              className="w-50"
              loop={true}
            />
          </div>
          <div className="col-4 align-self-center">
            <h1 className="text-start text-light">Login</h1>
            <form className="form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default LoginComponent;
