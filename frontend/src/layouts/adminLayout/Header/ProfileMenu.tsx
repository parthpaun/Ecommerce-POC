import { useState } from "react";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (option: string) => {
    console.log(option);
    handleMenuClose();
  };
  return (
    <Box>
      <IconButton onClick={handleMenuOpen} color="inherit">
        <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuClick("Profile")}>
          <Box width={"200px"}>Profile</Box>
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick("Orders")}>Orders</MenuItem>
        <MenuItem onClick={() => handleMenuClick("Settings")}>
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick("Logout")}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};
export default ProfileMenu;
