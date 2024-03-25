import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
const ProfileDropDown = () => {
  const [userData, setUserData] = useState(null);
  const isLoggedIn = Cookies.get("token");
  const navigation = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const items = [
    {
      key: "1",
      label: (
        <MenuItem component={Link} to="/profile" onClick={handleClose}>
          Profile
        </MenuItem>
      ),
      icon: <i className="bi bi-person"></i>,
    },
    {
      key: "2",
      label: (
        <MenuItem onClick={() => { handleLogout(); handleClose(); }}>
          Logout
        </MenuItem>
      ),
    },
  ];

  return (
    <>
      {userData && (
        <>
          <Toaster position="top-center" reverseOrder={false} />
          <Button onClick={handleClick}>
            <img
              src={userData.image ? userData.image : "user-avatar.png"}
              alt="User Avatar"
              className="img-fluid profile-top pb-2 profile-image"
            />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {items.map((item) => (
              <div key={item.key}>
                {item.label}
              </div>
            ))}
          </Menu>
        </>
      )}
    </>
  );
};

export default ProfileDropDown;
