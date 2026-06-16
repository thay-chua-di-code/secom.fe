import ProtectedRoutes from "../guards/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Notifications from "../pages/Notifications";
import { ROUTES } from "../constants/routes";

export const protectedRoutes = [
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: ROUTES.PROFILE, element: <Profile /> },
          { path: ROUTES.CART, element: <Cart /> },
          { path: ROUTES.NOTIFICATIONS, element: <Notifications /> },
          { path: ROUTES.SELLER.REGISTER },
        ],
      },
    ],
  },
];
