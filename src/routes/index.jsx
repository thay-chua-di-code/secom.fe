import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { privateRoutes } from "./private.routes";
import { protectedRoutes } from "./protected.routes";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  const routes = [
    ...publicRoutes,
    ...protectedRoutes,
    ...privateRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  return useRoutes(routes);
}
