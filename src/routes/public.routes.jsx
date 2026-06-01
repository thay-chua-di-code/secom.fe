import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home";
import AuthPage from "../pages/Auth";

export const publicRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <AuthPage /> },
      { path: "register", element: <AuthPage /> },
      { path: "forgot-password", element: <AuthPage /> },
    ],
  },
];
