import { useEffect, useState } from "react";
import { getUserProfile } from "../../store/authStore";
import { Link } from "react-router-dom";

const TopSection = () => {
  const day = new Date();
  let date = day.toDateString().toLocaleString();

  const [userProfile, setUserProfile] = useState(null);

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

  return (
    <>
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
        </div>
      </div>
    </>
  );
};

export default TopSection;
