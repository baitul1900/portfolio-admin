import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateProduct,
  productList,
  brandList,
  categoryList,
} from "../../store/authStore";
import { toast } from "react-hot-toast";

const UpdateProductForm = () => {
  const { productId } = useParams(); // Get productId from URL
  const [formData, setFormData] = useState({
    title: "",
    Des: "",
    price: "",
    image: "",
    categoryID: "",
    brandID: "",
  });
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await productList(); // Fetch product data
        const brandsData = await brandList();
        const categoriesData = await categoryList();
        setBrands(brandsData.data);
        setCategories(categoriesData.data);

        const productData = productResponse.data; // Access the data property
        if (Array.isArray(productData)) {
          const product = productData.find(
            (product) => product._id === productId
          );
          if (product) {
            setFormData({
              title: product.title,
              Des: product.Des,
              price: product.price,
              image: product.image,
              categoryID: product.categoryID,
              brandID: product.brandID,
            });
          } else {
            console.log("Product not found in productData:", productId);
          }
        } else {
          console.log("Unexpected productData format:", productData);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(productId, formData);
      toast.success("Product updated successfully!");
      navigate("/product"); // Navigate to the product route after successful update
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px !important" }}>
      <h2 className="">Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
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
            name="Des"
            value={formData.Des}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-control"
            id="category"
            name="categoryID"
            value={formData.categoryID}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">
            Brand
          </label>
          <select
            className="form-control"
            id="brand"
            name="brandID"
            value={formData.brandID}
            onChange={handleChange}
            required
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.brandName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
