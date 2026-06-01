import PrivateRoute from "../guards/PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/Admin/Dashboard/index";
import Users from "../pages/Admin/Users/index";
import Products from "../pages/Admin/Products/index";

export const privateRoutes = [
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "users", element: <Users /> },
          { path: "products", element: <Products /> },
        ],
      },
    ],
  },
];
