import { createBrowserRouter } from "react-router-dom";

import { authRoutes } from "./authRoutes";
import { adminRoutes } from "./adminRoutes";
import { otherRoute } from "./notFound";

export const router = createBrowserRouter([
  authRoutes,
  adminRoutes,
  otherRoute,
]);
