/* eslint-disable react/prop-types */
import { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ProfileDropDown from "./ProfileDropDown";

const MasterLayout = (props) => {
  const [userData, setUserData] = useState(null);
  const isLoggedIn = Cookies.get("token");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(
            "http://localhost:8000/api/v1/profile",
            config
          );
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
      const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId);

      // Validate that all variables exist
      if (toggle && nav && bodypd && headerpd) {
        toggle.addEventListener("click", () => {
          // show navbar
          nav.classList.toggle("show");
          // change icon
          toggle.classList.toggle("bx-x");
          // add padding to body
          bodypd.classList.toggle("body-pd");
          // add padding to header
          headerpd.classList.toggle("body-pd");
        });
      }
    };

    showNavbar("header-toggle", "nav-bar", "main-container", "header");
  }, []);

  return (
    <Fragment>
      {/* Header */}
      <header className="header" id="header">
        <div className="header_toggle" onClick={toggleSidebar}>
          <i className="bi bi-list-nested" id="header-toggle"></i>
        </div>
        <div className="header_img">
          {isLoggedIn && userData ? <ProfileDropDown /> : <></>}
        </div>
      </header>

      {/* Sidebar */}
      <div className={`l-navbar ${isSidebarOpen ? "show" : ""}`} id="nav-bar">
        <nav className="nav">
          <div>
            <a href="#" className="nav_logo">
              <i className="bx bx-layer nav_logo-icon"></i>
              <span className="nav_logo-name">BBBootstrap</span>
            </a>
            <div className="nav_list">
              <NavLink
                to={"/users"}
                className="nav_link active text-decoration-none"
              >
                <i className="bi bi-person-circle"></i>
                <span className="nav_name">Dashboard</span>
              </NavLink>
              <a href="#" className="nav_link">
                <i className="bx bx-user nav_icon"></i>
                <span className="nav_name">Users</span>
              </a>
              <NavLink to={'/project'} className="nav_link active text-decoration-none">
              <i className="bx bx-message-square-detail nav_icon"></i>
                <span className="nav_name">Project</span>

              </NavLink>
              <a href="#" className="nav_link">
                <i className="bx bx-bookmark nav_icon"></i>
                <span className="nav_name">Bookmark</span>
              </a>
              <a href="#" className="nav_link">
                <i className="bx bx-folder nav_icon"></i>
                <span className="nav_name">Files</span>
              </a>
              <a href="#" className="nav_link">
                <i className="bx bx-bar-chart-alt-2 nav_icon"></i>
                <span className="nav_name">Stats</span>
              </a>
            </div>
          </div>
          <a href="#" className="nav_link">
            <i className="bx bx-log-out nav_icon"></i>
            <span className="nav_name">SignOut</span>
          </a>
        </nav>
      </div>

      {/* Main Container */}
      <div
        className={`container ${isSidebarOpen ? "" : "main-full-width"}`}
        id="main-container"
      >
        {props.children}
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </Fragment>
  );
};

export default MasterLayout;
