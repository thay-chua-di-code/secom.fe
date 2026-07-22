import { Package, Heart, LogOut, User } from "lucide-react";
import Button from "../Button/Button";
import "./style.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../../../service/authService";
import { isAdmin } from "../../../utils/auth";

const UserNotLogin = () => {
  return (
    <div className="user-dropdown__header not-login">
      <div className="user-info">
        <img
          src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
          alt="avatar"
          className="user-avatar"
        />
      </div>
    </div>
  );
};
export default function UserDropdown({ open }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!open) return null;

  const handleLogout = async () => {
    await authService.logout(auth.refreshToken, dispatch);
  };
  return (
    <div className={`user-dropdown ${!userInfo ? "guest" : ""}`}>
      {/* HEADER */}
      {userInfo ? (
        <div className="user-dropdown__header">
          <div className="user-info">
            <img
              src={
                userInfo.avatarUrl === null
                  ? "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
                  : userInfo.avatarUrl
              }
              alt="avatar"
              className="user-avatar"
            />

            <div className="user-content">
              <h3>{userInfo?.fullName}</h3>
              <p>Welcome back to Secom</p>
            </div>
          </div>
        </div>
      ) : (
        <UserNotLogin />
      )}

      {/* BODY */}
      <div className="user-dropdown__body">
        {userInfo && (
          <div>
            <Link to={`/profile`} className="dropdown-item">
              <User size={20} />
              My Profile
            </Link>
            <Link to="/order-self" className="dropdown-item">
              <Package size={20} />
              My Orders
            </Link>

            <Link
              to="/wish-list"
              data-testid="wishlist-link"
              className="dropdown-item"
            >
              <Heart size={20} />
              Wishlist
            </Link>
            {isAdmin(auth.role) && (
              <Link to="/admin" className="dropdown-item">
                <Package size={20} />
                Admin Dashboard
              </Link>
            )}
            {auth.role === "Seller" && (
              <Link to="/seller" className="dropdown-item">
                <Package size={20} />
                Seller Dashboard
              </Link>
            )}
          </div>
        )}

        <hr className="divider" />
        {userInfo ? (
          <Button
            type="button"
            onClick={handleLogout}
            className="dropdown-item logout"
          >
            <LogOut size={20} />
            Logout
          </Button>
        ) : (
          <Link to="/login" className="dropdown-item">
            <LogOut size={20} />
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
