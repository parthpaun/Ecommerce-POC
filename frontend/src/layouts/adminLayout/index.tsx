import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Header from "./Header";
import DrawerComponent from "./Drawer";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserData } from "../../utils/helperFunctions";
// import Header from "./../Header";
// import DrawerComponent from "../Drawer";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  marginTop: 65,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export default function AdminLayout() {
  const [open, setOpen] = React.useState(false);
  const [isUnauthorized, setIsUnAuthorized] = React.useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userData = getUserData();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
    if (token && userData) {
      const { role = "" } = userData;
      const expDate = userData?.exp ? userData?.exp * 1000 : 0;
      const currentTime = Date.now();
      if (currentTime > expDate) {
        localStorage.removeItem("token");
        navigate("/auth/login");
      } else {
        if (role !== "admin") {
          setIsUnAuthorized(true);
        } else {
          setIsUnAuthorized(false);
        }
      }
    }
  }, [navigate, token, userData]);

  return !isUnauthorized ? (
    <Box sx={{ display: "flex" }}>
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <DrawerComponent open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <Outlet />
      </Main>
    </Box>
  ) : (
    <Box>
      <h1>You Don't Have an access of this page </h1>
    </Box>
  );
}

// export default AdminLayout;
