import PrivateRoute from "../guards/PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/index";
import Users from "../pages/Admin/Users/index";
import Products from "../pages/Admin/Products/index";
import Orders from "../pages/Admin/Orders/index";
import { ADMIN_ROUTES } from "../constants/routes";
import Categories from "../pages/Admin/Categories";

export const privateRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: ADMIN_ROUTES.ADMIN_USERS,
        element: <Users />,
      },
      {
        path: ADMIN_ROUTES.ADMIN_PRODUCTS,
        element: <Products />,
      },
      {
        path: ADMIN_ROUTES.ADMIN_ORDERS,
        element: <Orders />,
      },
      {
        path: ADMIN_ROUTES.ADMIN_CATEGORIES,
        element: <Categories />,
      },
    ],
  },
];
