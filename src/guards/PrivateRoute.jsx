import { Navigate, Outlet } from "react-router-dom";
import { getRoleFromToken, isAdmin, isLoggedIn } from "../utils/auth";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
  const token = localStorage.getItem("token");
  const storeRole = useSelector((state) => state.auth.role);
  const role = storeRole || getRoleFromToken(token);

  if (!isLoggedIn(token)) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
