import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { updateUserProfile, getUserProfile } from "../store/authStore";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { Link } from "react-router-dom";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

const Profile = () => {
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, [userProfile]);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      if (response.status === "success") {
        setUserProfile(response.data);
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Failed to fetch user profile");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = userProfile.image;

      // If a new image is selected, upload it to Firebase Storage
      if (image) {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`profile-images/${image.name}`);
        const snapshot = await imageRef.put(image);
        imageUrl = await snapshot.ref.getDownloadURL();
      }

      // Call the updateUserProfile function from the API service
      const response = await updateUserProfile(password, imageUrl);

      // Check the response status
      if (response.status === "success") {
        // If successful, display success message
        toast.success("Profile updated successfully");
      } else {
        // If there's an error, display error message
        toast.error(response.message);
      }
    } catch (error) {
      // Handle any errors
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (info) => {
    setImage(info.file.originFileObj);
  };

  return (
    <div className="container-fluid mt-4">
      <Toaster position="top-center" reverseOrder={false} />
      <h3 className="font-weight-one">Profile Details</h3>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb ">
          <li className="breadcrumb-item">
            <Link to={"/"} className="text-decoration-none p-s-five link-one">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={"/profile"} className="text-decoration-none p-s-five">
              Profile
            </Link>
          </li>
        </ol>
      </nav>

      {/* profile section here */}
      {userProfile && (
        <div className="row">
          <div className="col-7 rounded p-4 mt-4 mb-4 shadow">
            {/* information box here */}
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      value={userProfile.name}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      value={userProfile.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone:
                  </label>
                  <input
                    id="phone"
                    type="text"
                    className="form-control"
                    value={userProfile.phone}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Update Profile Picture:
                  </label>
                  <ImgCrop rotate>
                    <Upload
                      onChange={handleImageChange}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      className="avatar-uploader text-light"
                    >
                      {image ? null : "+ Upload"}
                    </Upload>
                  </ImgCrop>
                </div>
                <button type="submit" className="btn btn-primary w-25" disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>

          <div className="col-5 d-flex justify-content-center p-4 mt-4 mb-4">
            <div className="header_img-02">
              <img
                src={userProfile.image}
                className="img-fluid pro-pic"
                alt="Profile"
              />
            </div>
          </div>
        </div>
      )}

      {/* profile section here */}
    </div>
  );
};

export default Profile;
