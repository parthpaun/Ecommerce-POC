/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Loadable from "../components/Loadable";
import Categories from "../pages/admin/category";
const MainLayout = Loadable(lazy(() => import("../layouts/mainLayout")));

const NotFoundPage = Loadable(lazy(() => import("../pages/404")));

export const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "",
      element: (
        <div className="flex justify-center items-center h-96">
          <h1>Ecommerce Home </h1>{" "}
        </div>
      ),
    },
    {
      path: "products",
      element: (
        <div>
          <h1>Products</h1>{" "}
        </div>
      ),
    },
    {
      path: "categories",
      element: <Categories />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
};
