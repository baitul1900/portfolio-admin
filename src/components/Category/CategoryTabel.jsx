import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { categoryList, deleteCategory } from "../../store/authStore";
import CategoryUpdateModal from "./CategoryUpdateModal";
import CategoryCreate from "./CategoryCreate";

const CategoryTabel = () => {
  const [category, setcategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await categoryList();
        setcategory(data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchCategory();
  }, []);

  const handleCreateCategory = () => {
    if (token) {
      setIsModalOpen(true);
    } else {
      navigate("/login");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      // Remove the deleted brand from the brands state
      setcategory(category.filter((brand) => brand._id !== id));
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mt-5 pt-5">
        <h1>Category Page</h1>
      {token && (
        <div className="text-end">
          <Button
            className="bg-success text-light"
            onClick={handleCreateCategory}
          >
            Create Category
          </Button>
        </div>
      )}
      <table className="table" id="tabel-brands">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Des</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {category.map((items, index) => (
            <tr key={index}>
              <th className="py-2" scope="row">
                {index + 1}
              </th>
              <td>{items["categoryName"]}</td>
              <td>{items["des"]}</td>
              <td className="text-end"></td>
              <td>
                {token && (
                  <Link to={`/category/${items._id}`}>
                    <EditOutlined />
                  </Link>
                )}
              </td>
              <td>
                {token && (
                  <DeleteOutlined
                    className="ml-2"
                    onClick={() => handleDeleteCategory(items._id)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <CategoryCreate/>
      </Modal>
    </div>
  );
};

export default CategoryTabel;
