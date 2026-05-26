import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import { ROUTES } from "../constanst/routes";
import Home from "../pages/Home/index";
import AuthPage from "../pages/Auth/index";
import DetailPage from "../pages/Profile";

export const publicRoutes = [
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: ROUTES.PROFILE,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DetailPage />,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
    ],
  },
  {
    path: ROUTES.REGISTER,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
    ],
  },
];
