import { Navigate, Outlet } from "react-router-dom";
import { isAdmin, isLoggedIn } from "../utils/auth";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
  const token = localStorage.getItem("token");

  const userInfo = useSelector((state) => state.userInfo?.userInfo);

  if (!isLoggedIn(token)) {
    return <Navigate to="/login" replace />;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  if (!isAdmin(userInfo)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
