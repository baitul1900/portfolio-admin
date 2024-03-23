import React, { useState } from "react";
import Test from "../../Layout/Test";
import serviceStore from "../../store/serviceStore";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const CreateService = () => {
  const { createService } = serviceStore((state) => state);
  const navigate = useNavigate();

  const [from, setForm] = useState({
    serviceName: "",
    des: "",
    feature: [],
    image: "",
  });

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
      const response = await createService(from);
      if (response.status === "success") {
        toast.success("Service Created Successfully");
        navigate("/service");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create service");
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
            value={from.serviceName}
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
            value={from.des}
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
            value={from.feature.join(",")}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger mt-5">
          Create Service
        </button>
      </form>
    </Test>
  );
};

export default CreateService;
