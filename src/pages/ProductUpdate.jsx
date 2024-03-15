import React from "react";
import MasterLayout from "../Layout/MasterLayout";
import UpdateProductForm from "../components/product/UpdateProductForm";

const ProductUpdate = () => {
  return (
    <MasterLayout>
      <div className="container mt-5 pt-5">
        <UpdateProductForm />
      </div>
    </MasterLayout>
  );
};

export default ProductUpdate;
