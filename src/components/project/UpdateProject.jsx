import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import projectStore from "../../store/projectStore";

const UpdateProject = () => {
  const { updateProject, projectRequestById } = projectStore((state) => state);
  const { id } = useParams(); // Assuming you have access to the project ID from the route
  const [formData, setFormData] = useState({
    projectName: "",
    shortDes: "",
    Des: "",
    technologyUse: "",
    image: "",
    notes: "",
    allPage: [],
    allFeature: [],
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectData = await updateProject(id);
        console.log("Project data:", projectData); // Log the project data here
        setFormData(projectData);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch project data");
      }
    };
    fetchProjectData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "allPage" || name === "allFeature" ? value.split(",") : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image; // Keep the existing image URL if not updated
      if (image) {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`project-images/${image.name}`);
        const snapshot = await imageRef.put(image);
        imageUrl = await snapshot.ref.getDownloadURL();
      }
      const updatedFormData = { ...formData, image: imageUrl };
      const response = await updateProject(id, updatedFormData);
  
      if (response) {
        toast.success("Project Updated Successfully");
        navigate("/project");
      } else {
        toast.error("Failed to update project");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update project");
    }
  };
  

  return (
    <div>
      <div className="container mt-5">
        <h2>Update Project</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Render form fields pre-filled with existing project data */}
          {/* You can adjust the input fields based on your project data structure */}
          {/* Example: */}
          <div className="mb-3">
            <label htmlFor="projectName" className="form-label">
              Project Name
            </label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="form-control"
              id="projectName"
              placeholder="Enter project name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="technologyUse" className="form-label">
              technologyUse
            </label>
            <input
              type="text"
              name="technologyUse"
              value={formData.technologyUse}
              onChange={handleChange}
              className="form-control"
              id="technologyUse"
              placeholder="Enter Tech Name "
            />
          </div>

          <div className="mb-3">
            <label htmlFor="shortDes" className="form-label">
              Short Description
            </label>
            <input
              type="text"
              name="shortDes"
              value={formData.shortDes}
              onChange={handleChange}
              className="form-control"
              id="shortDes"
              placeholder="Enter short description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Des" className="form-label">
              Description
            </label>
            <textarea
              name="Des"
              value={formData.Des}
              onChange={handleChange}
              className="form-control"
              id="Des"
              rows="3"
              placeholder="Enter description"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="Image" className="form-label">
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
            <label htmlFor="notes" className="form-label">
              notes (optional)
            </label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-control"
              id="notes"
              placeholder="Enter Image Url"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="allPage" className="form-label">
              All Pages (comma-separated)
            </label>
            <input
              type="text"
              name="allPage"
              value={formData.allPage.join(",")}
              onChange={handleChange}
              className="form-control"
              id="allPage"
              placeholder="Enter all pages"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="allFeature" className="form-label">
              All Features (comma-separated)
            </label>
            <input
              type="text"
              name="allFeature"
              value={formData.allFeature.join(",")}
              onChange={handleChange}
              className="form-control"
              id="allFeature"
              placeholder="Enter all features"
            />
          </div>

          {/* Add more fields for other project properties */}

          <button type="submit" className="btn btn-primary">
            Update Project
          </button>
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default UpdateProject;
