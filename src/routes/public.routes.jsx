import MainLayout from "../layouts/MainLayout";
import { ROUTES } from "../constanst/routes";
import Home from "../pages/Home/index";

export const publicRoutes = [
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
];
