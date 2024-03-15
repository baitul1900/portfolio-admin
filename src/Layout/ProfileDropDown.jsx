import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const ProfileDropDown = () => {
  const [userData, setUserData] = useState(null);
  const isLoggedIn = Cookies.get("token");
  const navigation = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the token
          },
        };
        const response = await axios.get(
          "http://localhost:8000/api/v1/profile",
          config
        ); // Fetch user profile data
        setUserData(response.data.data); // Assuming the user data is nested under the 'data' key
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    Cookies.remove("token");
    sessionStorage.removeItem("token");
    toast.success("Logout successful");
    navigation("/login");
  };

  const items = [
    {
      key: "1",
      label: (
        <Link className="nav-link" to="/profile">
          Profile
        </Link>
      ),
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: (
        <Link className="nav-link" onClick={handleLogout}>
          Logout
        </Link>
      ),
    },
  ];

  return (
    <>
      {userData && (
        <>
          <Toaster position="top-center" reverseOrder={false} />
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
            style={{ zIndex: 999 }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <img
                  src={userData.image ? userData.image : "user-avatar.png"}
                  alt="User Avatar"
                  className="img-fluid profile-top pb-2 profile-image"
                />
              </Space>
            </a>
          </Dropdown>
        </>
      )}
    </>
  );
};

export default ProfileDropDown;
