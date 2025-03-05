import { createBrowserRouter } from "react-router-dom";

import { authRoutes } from "./authRoutes";
import { adminRoutes } from "./adminRoutes";
import {  mainRoutes } from "./mainRoutes";
import { otherRoute } from "./notFound";

export const router = createBrowserRouter([
  mainRoutes,
  authRoutes,
  adminRoutes,
  otherRoute,
]);
