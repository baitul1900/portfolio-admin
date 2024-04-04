import { Fragment, useEffect, useState } from "react";
import { getUserProfile } from "../../store/authStore";
import { Link } from "react-router-dom";
import imageOne from "../../assets/image/instructor-with-woman (1).webp";
import axios from "axios";

const TopSection = () => {
  const day = new Date();
  let date = day.toDateString().toLocaleString();

  const [userProfile, setUserProfile] = useState(null);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/cpu-performance"
        );
        setProgress(response.data.progress);
      } catch (error) {
        console.error("Error fetching CPU performance data:", error);
      }
    };

    // Fetch data periodically
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <section className="d-flex justify-content-evenly">
        <div className="card horizontal-card">
          <div className="row">
            <div className="col-8">
              <p className="p-s-five pb-1">{date}</p>

              <h2 className="pb-2">Welcome Back, {userProfile?.name}</h2>

              <strong className="">
                Ready to set up your club’s Loyalty Card?
              </strong>
              <br />
              <Link
                to="tel:whatsapp://send?phone=+8801779777542"
                className="btn btn-secondary mt-5"
              >
                WhatsApp me
              </Link>
            </div>

            <div className="col-4 align-self-center">
              <img src={imageOne} className="img-fluid" alt="image" />
            </div>
          </div>
        </div>

        <div className="">
          <h3>Activity Progress</h3>
          <p className="p-s-five text-light">Progress: {progress}%</p>
          <div className="progress" style={{ height: "5px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default TopSection;
