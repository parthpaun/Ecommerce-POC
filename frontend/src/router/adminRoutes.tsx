/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Loadable from "../components/Loadable";
import Categories from "../pages/admin/category";

const AdminLayout = Loadable(lazy(() => import("../layouts/adminLayout")));
// const Categories = Loadable(lazy(() => import("../pages/admin/category")));

export const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      path: "dashboard",
      element: (
        <div>
          <h1>Dashboard </h1>{" "}
        </div>
      ),
    },
    {
      path: "categories",
      element: <Categories />,
    },
  ],
};
