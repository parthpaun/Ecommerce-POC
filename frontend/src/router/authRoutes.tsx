/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Loadable from "../components/Loadable";

const AuthLayout = Loadable(lazy(() => import("../layouts/authLayout")));
const Login = Loadable(lazy(() => import("../pages/auth/login")));
const SignUP = Loadable(lazy(() => import("../pages/auth/signup")));

export const authRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUP />,
    },
  ],
};
