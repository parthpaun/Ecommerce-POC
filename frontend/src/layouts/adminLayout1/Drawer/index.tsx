import React, { useContext, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useMediaQuery } from "@mui/material";
import DrawerContent from "./DrawerContent";
import DrawerHeader from "./DrawerHeader";
import MiniDrawerStyled from "./MiniDrawerStyled";
import { MenuConfigContext } from "../MenuConfigContext";
import MaterialDrawer from "./MaterialResponsiveDrawer";

const drawerWidth = 260;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

const initialState = {
  openedItem: "dashboard",
  isDrawerOpened: true,
};
export default function ResponsiveDrawer(props: Props) {
  // const [menuConfig, setMenuConfig] = useState(initialState);
  const { menuConfig, handleDrawer } = useContext(MenuConfigContext);
  const { window } = props;
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const container =
    window !== undefined ? () => window().document.body : undefined;

  // header content
  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(
    () => <DrawerHeader open={!!menuConfig.isDrawerOpened} />,
    [menuConfig.isDrawerOpened]
  );

  // return <MaterialDrawer />;
  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, zIndex: 1200 }}
      aria-label="mailbox folders"
    >
      {!matchDownMD ? (
        <MiniDrawerStyled variant="permanent" open={true}>
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={menuConfig.isDrawerOpened}
          onClose={() => handleDrawer(!menuConfig.isDrawerOpened)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid",
              borderRightColor: "divider",
              backgroundImage: "none",
              boxShadow: "inherit",
            },
          }}
        >
          {drawerHeader}
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}
