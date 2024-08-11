import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout, DashboardLayout, MainLayout } from "~/layouts";
import { NotFound, SignIn, SignUp, CashierContainer } from "~/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"cashier"} />,
      },
      {
        path: "cashier",
        element: <CashierContainer />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <div>hello world </div>,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
