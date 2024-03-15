import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { brandList, deleteBrand } from "../store/authStore";
import BrandCreateModal from "./BrandCreateModal";

const BrandTable = () => {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await brandList();
        setBrands(data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const handleCreateBrand = () => {
    if (token) {
      setIsModalOpen(true);
    } else {
      navigate("/login");
    }
  };

  const handleDeleteBrand = async (id) => {
    try {
      await deleteBrand(id);
      // Remove the deleted brand from the brands state
      setBrands(brands.filter((brand) => brand._id !== id));
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
      <h1>Brands Page</h1>
      {token && (
        <div className="text-end">
          <Button className="bg-success text-light" onClick={handleCreateBrand}>
            Create Brands
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
          {brands.map((brand, index) => (
            <tr key={index}>
              <th className="py-2" scope="row">
                {index + 1}
              </th>
              <td>{brand.brandName}</td>
              <td>{brand.des}</td>
              <td className="text-end"></td>
              <td>
                {token && (
                  <Link to={`/brands/${brand._id}`}>
                    <EditOutlined />
                  </Link>
                )}
              </td>
              <td>
                {token && (
                  <DeleteOutlined
                    className="ml-2"
                    onClick={() => handleDeleteBrand(brand._id)}
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
      <BrandCreateModal/>
      </Modal>
    </div>
  );
};

export default BrandTable;
