import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import "./mainLayout.css";

export default function MainLayout() {
  return (
    <Box className="main-layout">
      <Outlet />
    </Box>
  );
}
