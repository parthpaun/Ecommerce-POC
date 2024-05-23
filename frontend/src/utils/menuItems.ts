import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from '@mui/icons-material/Category';

export const adminMenuItems = [
  {
    title: "Dashboard",
    id: "dashboard",
    url: "dashboard",
    type: "item",
    icon: DashboardIcon,
    pathName: "/admin/dashboard",
  },
  {
    title: "Products",
    id: "products",
    url: "products",
    type: "item",
    icon: InventoryIcon,
    pathName: "/admin/products",
  },
  {
    title: "Categories",
    id: "categories",
    url: "categories",
    type: "item",
    icon: CategoryIcon,
    pathName: "/admin/categories",
  },
  {
    title: "Users",
    id: "users",
    url: "users",
    type: "item",
    icon: GroupIcon,
    pathName: "/admin/users",
  },
];
