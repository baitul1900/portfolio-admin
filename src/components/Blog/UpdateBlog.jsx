import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import blogStore from "../../store/blogStore";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const UpdateBlog = () => {
  const { updateBlog, blogRequestById } = blogStore((state) => state);
  const { id } = useParams(); // Assuming you have access to the project ID from the route
  const [formData, setFormData] = useState({
    title: "",
    shortDes: "",
    des: "",
    author: "",
    image: "",
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    const fetachBlogData = async () => {
      try {
        const blogData = await updateBlog(id);
        console.log("Blog data:", blogData); // Log the blog data here
        setFormData(blogData);
      } catch (e) {
        console.error(e);
        toast.error("Failed to fetch blog data");
      }
    };
    fetachBlogData();
  }, [id]);

  const handleCKEditorChange = (e, editor) => {
    const data = editor.getData();
    setFormData((prevState) => ({
      ...prevState,
      des: data,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form
    try {
      let imageUrl = formData.image; // Keep the existing image URL if not updated
      if (image) {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`blog-images/${image.name}`);
        const snapshot = await imageRef.put(image);
        imageUrl = await snapshot.ref.getDownloadURL();
      }
      const updatedFormData = { ...formData, image: imageUrl };
      const response = await updateBlog(id, updatedFormData);

      if (response) {
        toast.success("Blog Updated Successfully");
        navigate("/blog");
      } else {
        toast.error("Failed to update Blog");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Blog");
    } finally {
      setLoading(false); // Set loading back to false after form submission
    }
  };

  return (
    <>
      <div className="container">
        <h2>Create Blog</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-control"
              id="blogTitle"
              placeholder="Title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="shortDes" className="form-label">
              Short Des
            </label>
            <input
              type="text"
              name="shortDes"
              value={formData.shortDes}
              onChange={handleInputChange}
              className="form-control"
              id="shortDes"
              placeholder="Short Des "
            />
          </div>

          <div className="mb-3">
            <label htmlFor="des" className="form-label">
              Description
            </label>
            <CKEditor
              editor={ClassicEditor}
              onChange={handleCKEditorChange}
              data={formData.des}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image Upload
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="form-control"
              id="image"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="form-control"
              id="author"
              placeholder="Author Name"
            />
          </div>

          <button
            type="submit"
            className="btn btn-danger mt-4 border-0"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Create Blog"}
          </button>
        </form>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default UpdateBlog;
