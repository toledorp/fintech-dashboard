import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Transactions } from "../pages/Transactions";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Transactions />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
