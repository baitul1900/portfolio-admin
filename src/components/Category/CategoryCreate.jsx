import  { useState } from "react";
import { createCategory } from "../../store/authStore";
const CategoryCreate = () => {
    const [formData, setFormData] = useState({
        categoryName: "",
        des: "",
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await createCategory(formData);
          console.log(response);// Handle success response
        } catch (error) {
          console.error("Error creating brand:", error);
        }
      };





    return (
        <div className="container mt-5 mb-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            placeholder="Enter Category name"
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
            name="des" // Ensure that this matches the property name in formData
            value={formData.des} // Ensure that this is bound to the des property
            onChange={handleChange} // Make sure the handleChange function is correctly called on change
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Category
        </button>
      </form>
    </div>
    );
};

export default CategoryCreate;