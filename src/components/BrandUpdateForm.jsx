import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBrandById, updateBrand } from "../store/authStore";

const BrandUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brandName: "",
    des: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBrandById(id);
        const brandData = response.data;
        setFormData({
          brandName: brandData.brandName,
          des: brandData.des,
        });
      } catch (error) {
        console.error("Error fetching brand:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBrand(id, formData);
      navigate(`/brands`);
    } catch (error) {
      console.error("Error updating brand:", error);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="brandName" className="form-label">
            Brand Name
          </label>
          <input
            type="text"
            className="form-control"
            id="brandName"
            placeholder="Enter brand name"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Enter description"
            name="des"
            value={formData.des}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Brand
        </button>
      </form>
    </div>
  );
};

export default BrandUpdateForm;
