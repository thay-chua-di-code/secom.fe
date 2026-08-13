import ProtectedRoutes from "../guards/ProtectedRoute";
import SellerRoute from "../guards/SellerRoute";

import MainLayout from "../layouts/MainLayout";
import SellerLayout from "../layouts/SellerLayout";

import Profile from "../pages/Profile";
import CartPage from "../pages/Cart/CartPage";
import Notifications from "../pages/Notifications";
import RegisterSeller from "../pages/RegisterSeller";
import Wishlist from "../pages/WishList";
import OrdersPage from "../pages/OrderSelf";

import Dashboard from "../pages/Seller/Dashboard/Dashboard";
import Products from "../pages/Seller/Products/Products";
import Orders from "../pages/Seller/Orders/Orders";
import Revenue from "../pages/Seller/Revenue/Revenue";
import Settings from "../pages/Seller/Settings/Settings";
import Vouchers from "../pages/Seller/Voucher/Voucher";
import SellerWallet from "../pages/Seller/Wallet/Wallet";
import SellerReturnRequests from "../pages/Seller/ReturnRequests";

import { ROUTES } from "../constants/routes";

export const protectedRoutes = [
  {
    element: <ProtectedRoutes />,
    children: [
      // BUYER
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.PROFILE,
            element: <Profile />,
          },
          {
            path: ROUTES.CART,
            element: <CartPage />,
          },
          {
            path: ROUTES.NOTIFICATIONS,
            element: <Notifications />,
          },
          {
            path: ROUTES.SELLER.REGISTER,
            element: <RegisterSeller />,
          },
          {
            path: ROUTES.SELF.WISH_LIST,
            element: <Wishlist />,
          },
          {
            path: ROUTES.SELF.ORDER_SELF,
            element: <OrdersPage />,
          },
        ],
      },

      // SELLER
      {
        element: <SellerRoute />,
        children: [
          {
            path: "/seller",
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
                path: "vouchers",
                element: <Vouchers />,
              },
              {
                path: "orders",
                element: <Orders />,
              },
              {
                path: "return-requests",
                element: <SellerReturnRequests />,
              },
              {
                path: "wallet",
                element: <SellerWallet />,
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
        ],
      },
    ],
  },
];
