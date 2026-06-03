import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import { ROUTES } from "../constants/routes";
import Home from "../pages/Home";
import AuthPage from "../pages/Auth";

export const publicRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <AuthPage />,
      },

      {
        path: ROUTES.REGISTER,
        element: <AuthPage />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.FORGOT_PWD,
        element: <AuthPage />,
      },

      {
        path: ROUTES.VERIFY,
        element: <AuthPage />,
      },

      {
        path: ROUTES.RS_PWD,
        element: <AuthPage />,
      },
    ],
  },
];
