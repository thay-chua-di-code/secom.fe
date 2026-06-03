import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  if (!isLoggedIn(token)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
