/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Loadable from "../components/Loadable";
import Categories from "../pages/admin/category";
import ProductList from "../pages/admin/products/productList";
import { Outlet } from "react-router-dom";
import ProductForm from "../pages/admin/products/addUpdateProduct";
import CategoryForm from "../pages/admin/category/addUpdateCategory";

const AdminLayout = Loadable(lazy(() => import("../layouts/adminLayout")));

const NotFoundPage = Loadable(lazy(() => import("../pages/404")));

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
      path: "products",
      element: (
        <div>
          <Outlet />
        </div>
      ),
      children: [
        {
          path: "",
          element: <ProductList />,
        },
        {
          path: "add",
          element: (
            <div>
              <ProductForm />
            </div>
          ),
        },
        {
          path: "update/:productId",
          element: (
            <div>
              <ProductForm isUpdateProduct />
            </div>
          ),
        },
        {
          path: ":productId",
          element: (
            <div>
              <h1>Details </h1>{" "}
            </div>
          ),
        },
      ],
    },
    //  {
    //   path: "products",
    //   element: <Products />,
    // },
    {
      path: "categories",
      element: (
        <div>
          <Outlet />
        </div>
      ),
      children: [
        {
          path: "",
          element: <Categories />,
        },
        {
          path: "add",
          element: (
            <div>
              <CategoryForm />
            </div>
          ),
        },
        {
          path: "update/:categoryId",
          element: (
            <div>
              <CategoryForm isUpdate />
            </div>
          ),
        },
        {
          path: ":productId",
          element: (
            <div>
              <h1>Details </h1>{" "}
            </div>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
};
