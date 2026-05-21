import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutes } from "./public.routes";

const router = createBrowserRouter([...publicRoutes]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
