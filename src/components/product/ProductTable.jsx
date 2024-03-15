import { useEffect, useState } from "react";
import {
  brandList,
  categoryList,
  productList,
  productByBrand,
  productListByCategory,
  deleteProduct,
} from "../../store/authStore";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { Button, Modal } from "antd";
import NewProductForm from "./NewProductForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(
    () => {
      const fetchInitialData = async () => {
        try {
          const productData = await productList();
          const brandsData = await brandList();
          const categoriesData = await categoryList();
          setProducts(productData.data); // Set the products data array
          setBrands(brandsData.data); // Set the brands data array
          setCategories(categoriesData.data); // Set the categories data array
        } catch (error) {
          console.log("Error fetching initial data:", error);
        }
      };

      // Check if token is available
      const token = sessionStorage.getItem("token") || Cookies.get("token");
      if (token) {
        fetchInitialData(); // Fetch initial data only if token is available
      } else {
        // Show toast notification
        toast.error("You need to login to access this page", {
          duration: 4000,
          position: "top-center",
        });

        // Navigate to login route
        navigate("/login");
      }
    },
    [navigate],
    [products]
  );

  const getBrandNameById = (brandId) => {
    const brand = brands.find((brand) => brand._id === brandId);
    return brand ? brand.brandName : "";
  };

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((category) => category._id === categoryId);
    return category ? category.categoryName : "";
  };

  const filterByBrand = async (brandID) => {
    try {
      const filteredProducts = await productByBrand(brandID);
      setProducts(filteredProducts.data);
    } catch (error) {
      console.error("Error filtering products by brand:", error);
    }
  };

  const filterByCategory = async (categoryID) => {
    try {
      const filteredProducts = await productListByCategory(categoryID);
      setProducts(filteredProducts.data);
    } catch (error) {
      console.error("Error filtering products by category:", error);
    }
  };

  const handleCreateBrand = () => {
    if (token) {
      setIsModalOpen(true);
    } else {
      navigate("/login");
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      // Remove the deleted brand from the brands state
      setBrands(products.filter((products) => products._id !== id));
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  return (
    <section className="container mt-5 pt-5">
      {token && (
        <div className="text-end">
          <Button className="bg-success text-light" onClick={handleCreateBrand}>
            Create Products
          </Button>
        </div>
      )}
      <div>
        <h2>Product List</h2>
        {/* Filter by brand dropdown */}
        <select onChange={(e) => filterByBrand(e.target.value)}>
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.brandName}
            </option>
          ))}
        </select>

        {/* Filter by category dropdown */}
        <select onChange={(e) => filterByCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th scope="col">Brand</th>
              <th scope="col">Category</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.Des}</td>
                <td>{product.price}</td>
                <td>
                  <img
                    src={product["image"]}
                    className="img-fluid w-25"
                    alt="Product"
                  />
                </td>
                <td>{getBrandNameById(product.brandID)}</td>{" "}
                {/* Get brand name by ID */}
                <td>{getCategoryNameById(product.categoryID)}</td>{" "}
                {/* Get category name by ID */}
                <td>
                  {token && (
                    <Link to={`/product-update/${product._id}`}>
                      <EditOutlined />
                    </Link>
                  )}
                </td>
                <td>
                  {token && (
                    <DeleteOutlined
                      className="ml-2"
                      onClick={() => handleDeleteProduct(product._id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <NewProductForm />
      </Modal>
    </section>
  );
};

export default ProductTable;
