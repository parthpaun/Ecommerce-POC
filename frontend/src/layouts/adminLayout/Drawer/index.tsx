import * as React from "react";
import { SvgIconTypeMap, styled, useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { adminMenuItems } from "../../../utils/menuItems";
import { useLocation, useNavigate } from "react-router-dom";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type DrawerProps = {
  open: boolean;
  handleDrawerClose: () => void;
};

interface ImenuItem {
  title: string;
  id: string;
  url: string;
  type: string;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  pathName: string;
}
const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const DrawerComponent = ({ open, handleDrawerClose }: DrawerProps) => {
  const [selectedItem, setSelectedItem] = React.useState<
    ImenuItem | undefined
  >();
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  React.useEffect(() => {
    const matchItem = adminMenuItems.find((item) => item.pathName === pathname);
    setSelectedItem(matchItem);
  }, [pathname]);
  const handleItemChange = (item: ImenuItem) => {
    navigate(item?.url);
  };
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {adminMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => handleItemChange(item)}
                selected={selectedItem?.id === item.id}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
