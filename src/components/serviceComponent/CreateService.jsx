import React, { useState } from "react";
import Test from "../../Layout/Test";
import serviceStore from "../../store/serviceStore";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CreateService = () => {
  const { createService } = serviceStore((state) => state);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const [from, setForm] = useState({
    serviceName: "",
    des: "",
    feature: [],
    image: "",
    longDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: name === "feature" ? value.split(",") : value,
    }));
  };

  const handleCKEditorChange = (e, editor) => {
    const data = editor.getData();
    setForm((prevState) => ({
      ...prevState,
      longDescription: data,
    }));
  };

  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (image) {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`service/images/${image.name}`);
        const snapshot = await imageRef.put(image);
        imageUrl = await snapshot.ref.getDownloadURL();
      }
      const updatedFormData = { ...from, image: imageUrl };
      const response = await createService(updatedFormData);

      if (response.status === "success") {
        toast.success("Service Created Successfully");
        navigate("/service");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create Service");
    }
  };

  return (
    <Test>
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="w-50 m-auto">
        <div className="form-group">
          <label htmlFor="serviceName" className="text-light">Service Name</label>
          <input
            type="text"
            className="form-control bg-light text-dark"
            id="serviceName"
            name="serviceName"
            value={from.serviceName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="des" className="text-light">Description</label>
          <textarea
            className="form-control bg-light text-dark"
            id="des"
            name="des"
            value={from.des}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="des" className="form-label">
            Long Description
          </label>
          <CKEditor
            editor={ClassicEditor}
            onChange={handleCKEditorChange}
            data={from.longDescription}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="text-light">
            Image Upload
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="form-control bg-light text-dark"
            id="image"
          />
        </div>
        <div className="form-group">
          <label htmlFor="feature" className="text-light">Feature</label>
          <input
            type="text"
            className="form-control bg-light text-dark"
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
