/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ProfileDropDown from "./ProfileDropDown";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  Space: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Test(props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const isLoggedIn = Cookies.get("token");

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerItems = [
    {
      text: "Project",
      icon: <i className="bi bi-kanban nav-icons"></i>,
      link: "/project",
    },
    {
      text: "Service",
      icon: <i className="bi bi-stack  nav-icons"></i>,
      link: "/service",
    },
    {
      text: "Blog",
      icon: <i className="bi bi-newspaper  nav-icons"></i>,
      link: "/blog",
    },
  ];

  const bottomDrawerItems = [
    {
      text: "Sign Out",
      icon: <i className="bi bi-box-arrow-right  nav-icons"></i>,
      onclick: () => {
        Cookies.remove("token");
        sessionStorage.removeItem("token");
        toast.success("Logout successful");
        window.location.href = "/login";
      },
    },
  ];

  if (!isLoggedIn) {
    drawerItems.push({ text: "Login", link: "/login" });
    drawerItems.push({
      text: "Registration",
      link: "/registration",
    });
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Toaster position="top-center" reverseOrder={false} />
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "#23262f", color: "#A5A5AB", height: "70px" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <div style={{ marginLeft: "auto" }}>
            {isLoggedIn && userData ? (
              <div className="header_img">
                <ProfileDropDown />
              </div>
            ) : (
              <div className="d-flex justify-content-evenly">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/registration" className="nav-link ms-4">
                  Registration
                </Link>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{ backgroundColor: "#23262f !important" }}
      >
        <DrawerHeader sx={{ backgroundColor: "#23262f", color: "#A5A5AB" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List sx={{ backgroundColor: "#23262f", color: "#A5A5AB" }}>
          {drawerItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={NavLink}
                to={item.link}
                exact
                activeClassName="Mui-selected"
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover": {
                    backgroundColor: "#FF592C",
                    color: "#FFFFFF",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    "&:hover": {
                      color: "red", // Change icon color when hovered
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List
          sx={{ backgroundColor: "#23262f", color: "#A5A5AB", height: "100%" }}
        >
          {bottomDrawerItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                display: "flex",
                height: "100%",
                justifyContent: "",
                alignItems: "end",
              }}
            >
              <ListItemButton
                component={NavLink}
                to={item.link}
                exact
                activeClassName="Mui-selected"
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover": {
                    backgroundColor: "#FF592C",
                    color: "#FFFFFF",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 3, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>

      <Toaster position="top-center" reverseOrder={false} />
    </Box>
  );
}
