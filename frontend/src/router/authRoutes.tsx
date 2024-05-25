/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Loadable from "../components/Loadable";

const AuthLayout = Loadable(lazy(() => import("../layouts/authLayout")));
const Login = Loadable(lazy(() => import("../pages/auth/login")));
const SignUP = Loadable(lazy(() => import("../pages/auth/signup")));

const NotFoundPage = Loadable(lazy(() => import("../pages/404")));

export const authRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <SignUP />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
};
