  import { StrictMode } from "react";
  import { createRoot } from "react-dom/client";
  import "./index.css";
  import App from "./App.jsx";
  import { createBrowserRouter, RouterProvider } from "react-router";
  import Layout from "./layouts/DashboardLayout.jsx";
  import DashboardPage from "./pages/Dashboard/Dashboard.jsx";
  import LendersPage from "./pages/Lenders/Lenders.jsx";
  import Register from "./pages/Auth/Register.jsx";
  import AuthLayout from "./pages/Auth/AuthLayout.jsx";
  import * as React from "react";

  const router = createBrowserRouter([
    {
      Component: App, // root layout route
      children: [
        {
          path: "/",
          Component: Layout,
          children: [
            {
              path: "/",
              Component: DashboardPage,
            },
            {
              path: "/lenders",
              Component: LendersPage,
            },
          ],
        },
      ],
    },
    {
      path: "/auth",
      component: AuthLayout,
      children: [
        {
          path: "register",
          Component: Register,
        }
      ]
    }
  ]);

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );