import ProtectedRoutes from "../guards/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Notifications from "../pages/Notifications";
import RegisterSeller from "../pages/RegisterSeller";
import { ROUTES } from "../constants/routes";
import Wishlist from "../pages/WishList";
import OrdersPage from "../pages/OrderSelf";

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
          { path: ROUTES.SELLER.REGISTER, element: <RegisterSeller /> },
          { path: ROUTES.SELF.WISH_LIST, element: <Wishlist /> },
          { path: ROUTES.SELF.ORDER_SELF, element: <OrdersPage /> },
        ],
      },
    ],
  },
];
