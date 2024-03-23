import React, { useEffect, useState } from "react";
import Test from "../../Layout/Test";
import axios from "axios"; // Import axios for making API calls
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const ServiceUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    serviceName: "",
    des: "",
    feature: [],
  });

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const token = Cookies.get("token"); // Get the token from cookies
        const response = await axios.get(
          `http://localhost:8000/api/v1/service/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set the Authorization header
            },
          }
        );
        const { serviceName, des, feature } = response.data.data;
        setForm({
          serviceName,
          des,
          feature: Array.isArray(feature) ? feature : [], // Ensure feature is an array
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch service data");
      }
    };

    fetchServiceData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: name === "feature" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token"); // Get the token from cookies
      const response = await axios.post(
        `http://localhost:8000/api/v1/service-update/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        }
      );
      if (response) {
        toast.success("Service Updated Successfully");
        navigate("/service");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update service");
    }
  };

  return (
    <Test>
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="w-50 m-auto">
        <div className="form-group">
          <label htmlFor="serviceName">Service Name</label>
          <input
            type="text"
            className="form-control"
            id="serviceName"
            name="serviceName"
            value={form.serviceName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="des">Description</label>
          <textarea
            className="form-control"
            id="des"
            name="des"
            value={form.des}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="feature">Feature</label>
          <input
            type="text"
            className="form-control"
            id="feature"
            name="feature"
            value={Array.isArray(form.feature) ? form.feature.join(",") : ""} // Assuming form.feature is an array
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Service
        </button>
      </form>
    </Test>
  );
};

export default ServiceUpdate;
