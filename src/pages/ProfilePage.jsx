import React from "react";
import MasterLayout from "../Layout/MasterLayout";
import Profile from "../components/Profile";
import Cookies from "js-cookie";
import Test from "../Layout/Test";

const ProfilePage = () => {
  const token = Cookies.get("token");
  return (
    <Test>
      {!token ? (
        <div className="text-center mt-5 pt-5">
          <h1>Please Login First</h1>
        </div>
      ) : (
        <Profile />
      )}
    </Test>
  );
};

export default ProfilePage;
