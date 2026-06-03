import { Navigate, Outlet } from "react-router-dom";
import { isAdmin, isLoggedIn } from "../utils/auth";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
  const token = localStorage.getItem("token");
  const role = useSelector((state) => state.auth.role);
  if (!isLoggedIn(token)) {
    return <Navigate to="/login" replace />;
  }

  if (!role) {
    return <div>Loading...</div>;
  }

  if (!isAdmin(role)) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
