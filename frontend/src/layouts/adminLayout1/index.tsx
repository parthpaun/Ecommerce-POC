import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// material-ui
import useMediaQuery from "@mui/material/useMediaQuery";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// project import
import Drawer from "./Drawer";
import Header from "./Header";
// import ResponsiveDrawer from "./Drawer";

import { MenuConfigContext } from "./MenuConfigContext";

// ==============================|| MAIN LAYOUT ||============================== //
const initialState = {
  openedItem: "dashboard",
  isDrawerOpened: false,
};
export default function DashboardLayout() {
  const [menuConfig, setMenuConfig] = useState(initialState);
  const downXL = useMediaQuery((theme) => theme.breakpoints.down("xl"));

  const handleDrawer = useCallback((isOpened: boolean) => {
    setMenuConfig({ ...menuConfig, isDrawerOpened: isOpened });
  }, []);

  const handleOpenedItem = useCallback((item: string) => {
    setMenuConfig({ ...menuConfig, openedItem: item });
  }, []);

  useEffect(() => {
    handleDrawer(!downXL);
  }, [downXL, handleDrawer]);

  return (
    <MenuConfigContext.Provider
      value={{ menuConfig, handleDrawer, handleOpenedItem }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        {/* <Header /> */}
        <Drawer />
        <Box
          component="main"
          sx={{ width: "calc(100% - 260px)", flexGrow: 1, p: { xs: 2, sm: 3 } }}
        >
          <Toolbar />
          {/* <Breadcrumbs navigation={navigation} title /> */}
          <Outlet />
        </Box>
      </Box>
    </MenuConfigContext.Provider>
  );
}
