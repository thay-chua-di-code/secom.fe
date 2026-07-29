import MainLayout from "../layouts/MainLayout";
import { ROUTES } from "../constants/routes";
import Home from "../pages/Home";
import AuthPage from "../pages/Auth";
import ProductDetail from "../pages/ProductDetail";
import ProductsPage from "../pages/Products";
import SellerDetail from "../pages/SellerDetail";
import PaymentReturn from "../pages/PaymentReturn/PaymentReturn";
import PaymentCancel from "../pages/PaymentCancel/PaymentCancel";
import CompareProductsPage from "../pages/Compare";

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
      {
        path: ROUTES.PRODUCT.PRODUCT_DETAIL,
        element: <ProductDetail />,
      },
      {
        path: ROUTES.PRODUCT.PRODUCTS,
        element: <ProductsPage />,
      },
      {
        path: "/compare",
        element: <CompareProductsPage />,
      },
      {
        path: "/payment-return",
        element: <PaymentReturn />,
      },
      {
        path: "/payment-cancel",
        element: <PaymentCancel />,
      },
      {
        path: ROUTES.SELLER.DETAIL,
        element: <SellerDetail />,
      },
    ],
  },
];
