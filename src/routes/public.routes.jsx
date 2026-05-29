import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import { ROUTES } from "../constants/routes";
import Home from "../pages/Home/index";
import AuthPage from "../pages/Auth/index";
import DetailPage from "../pages/Profile";
import CartPage from "../pages/Cart";
import ProfilePage from "../pages/Profile";
import NotificationPage from "../pages/Notifications";
export const publicRoutes = [
  // NORMAL PAGE
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.CART,
        element: <CartPage />,
      },
      {
        path: ROUTES.NOTIFICATIONS,
        element: <NotificationPage />,
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

      {
        path: ROUTES.RS_PWD,
        element: <AuthPage />,
      },
    ],
  },
];
