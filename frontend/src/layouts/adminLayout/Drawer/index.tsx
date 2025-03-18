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

const drawerWidth = 300;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
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
    const matchItem = adminMenuItems.find((item) =>
      pathname.includes(item.pathName)
    );
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
          backgroundColor: "#111827", // Dark sidebar background
          color: "#FFFFFF", // White text
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose} sx={{ color: "#FFFFFF" }}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider sx={{ borderColor: "#374151" }} />
      <List>
        {adminMenuItems.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedItem?.id === item.id;
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => handleItemChange(item)}
                selected={isSelected}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#6366F1 ", // Ensure selected background
                    color: "#FFFFFF", // Text color for selected item
                    "&:hover": {
                      backgroundColor: "#4F46E5 ", // Darker purple on hover
                    },
                  },
                  "&:hover": { backgroundColor: "#374151" }, // Hover effect for non-selected items
                  borderRadius: "8px",
                  marginX: "12px",
                  marginY: "4px",

                }}
              >
                <ListItemIcon
                  sx={{
                    color: isSelected ? "#FFFFFF" : "#9CA3AF", // White if selected, gray otherwise
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{
                    color: isSelected ? "#FFFFFF" : "#D1D5DB", // White if selected, light gray otherwise
                    fontWeight: isSelected ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
