/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Loadable from "../components/Loadable";

const NotFoundPage = Loadable(lazy(() => import("../pages/404")));

export const otherRoute = {
  path: "*",
  element: <NotFoundPage />,
};
