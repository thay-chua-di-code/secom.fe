import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import { ROUTES } from "../constants/routes";
import Home from "../pages/Home/index";
import AuthPage from "../pages/Auth/index";
import DetailPage from "../pages/Profile";
import CartPage from "../pages/Cart";
import ProfilePage from "../pages/Profile";
export const publicRoutes = [
  // NORMAL PAGE
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
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: ROUTES.CART,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <CartPage />,
      },
    ],
  },

  // AUTH
  {
    path: "/",
    element: <AuthLayout />,
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
        path: ROUTES.FORGOT_PWD,
        element: <AuthPage />,
      },

      {
        path: ROUTES.VERIFY,
        element: <AuthPage />,
      },
    ],
  },
];
