import ProtectedRoutes from "../guards/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Notifications from "../pages/Notifications";

export const protectedRoutes = [
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/profile",
        element: <MainLayout />,
        children: [
          { index: true, element: <Profile /> },
          { path: "cart", element: <Cart /> },
          { path: "notifications", element: <Notifications /> },
        ],
      },
    ],
  },
];
