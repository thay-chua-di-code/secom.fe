import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRoleFromToken, isLoggedIn, isSeller } from "../utils/auth";

export default function SellerRoute() {
  const token = localStorage.getItem("token");
  const storeRole = useSelector((state) => state.auth.role);
  const role = storeRole || getRoleFromToken(token);

  if (!isLoggedIn(token)) {
    return <Navigate to="/login" replace />;
  }

  if (!isSeller(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
