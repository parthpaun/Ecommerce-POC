import { Outlet } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import "./authLayout.css";

export default function AuthLayout() {
  return (
    <Box className="auth-layout">
      <Paper elevation={6} square={false} className="auth-paper">
        <Outlet />
      </Paper>
    </Box>
  );
}
