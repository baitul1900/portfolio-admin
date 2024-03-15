import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateCategory, fetchCategoryById } from "../../store/authStore";
import MasterLayout from "../../Layout/MasterLayout";

const CategoryUpdateModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    categoryName: "",
    des: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCategoryById(id);
        const categoryData = response.data;
        setFormData({
          categoryName: categoryData.categoryName,
          des: categoryData.des,
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
      await updateCategory(id, formData);
      navigate(`/brands`);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <MasterLayout>
      <div className="container mt-5 mb-5 pt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryName"
              placeholder="Enter category name"
              name="categoryName"
              value={formData.categoryName}
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
            Update Category
          </button>
        </form>
      </div>
    </MasterLayout>
  );
};

export default CategoryUpdateModal;
