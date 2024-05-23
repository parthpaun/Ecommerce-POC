import { createBrowserRouter } from "react-router-dom";

import { authRoutes } from "./authRoutes";
import { adminRoutes } from "./adminRoutes";

// const routes: RouteObject[] = [
//   {
//     path: "/",
//     element: (
//       <AuthCheck>
//         <div>Home </div>
//       </AuthCheck>
//     ),
//   },
//   {
//     path: "auth",
//     element: <AuthLayout />,
//     children: [
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "signup",
//         element: <SignUP />,
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <NotFoud />,
//   },
// ];

export const router = createBrowserRouter([authRoutes, adminRoutes]);
