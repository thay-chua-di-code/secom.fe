import ProtectedRoutes from "../guards/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import Profile from "../pages/Profile";
import CartPage from "../pages/Cart/CartPage";
import Notifications from "../pages/Notifications";
import RegisterSeller from "../pages/RegisterSeller";
import { ROUTES } from "../constants/routes";
import Wishlist from "../pages/WishList";
import OrdersPage from "../pages/OrderSelf";
import Seller from "../pages/Seller";
import SellerLayout from "../pages/Seller/SellerLayout";
import Dashboard from "../pages/Seller/Dashboard/Dashboard";
import Products from "../pages/Seller/Products/Products";
import Orders from "../pages/Seller/Orders/Orders";
import Customers from "../pages/Seller/Customers/Customers";
import Revenue from "../pages/Seller/Revenue/Revenue";
import Settings from "../pages/Seller/Settings/Settings";

export const protectedRoutes = [
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: ROUTES.PROFILE, element: <Profile /> },
          { path: ROUTES.CART, element: <CartPage /> },
          { path: ROUTES.NOTIFICATIONS, element: <Notifications /> },
          { path: ROUTES.SELLER.REGISTER, element: <RegisterSeller /> },
          {
            path: ROUTES.SELLER.MAIN_PAGE,
            element: <SellerLayout />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: "dashboard",
                element: <Dashboard />,
              },
              {
                path: "products",
                element: <Products />,
              },
              {
                path: "orders",
                element: <Orders />,
              },
              {
                path: "customers",
                element: <Customers />,
              },
              {
                path: "revenue",
                element: <Revenue />,
              },
              {
                path: "settings",
                element: <Settings />,
              },
            ],
          },
          { path: ROUTES.SELF.WISH_LIST, element: <Wishlist /> },
          { path: ROUTES.SELF.ORDER_SELF, element: <OrdersPage /> },
        ],
      },
    ],
  },
];
