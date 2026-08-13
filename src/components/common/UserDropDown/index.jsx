import { Package, Heart, LogOut, User } from "lucide-react";
import Button from "../Button/Button";
import "./style.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../../../service/authService";
import { isAdmin } from "../../../utils/auth";

const fallbackAvatar =
  "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png";

const UserNotLogin = () => {
  return (
    <div className="user-dropdown__header user-dropdown__header--guest">
      <div className="user-info">
        <img src={fallbackAvatar} alt="avatar" className="user-avatar" />

        <div className="user-content">
          <span className="user-content__eyebrow">AIDR ACCOUNT</span>

          <h3>Welcome to AIDR</h3>

          <p>Sign in to continue your shopping experience.</p>
        </div>
      </div>
    </div>
  );
};

export default function UserDropdown({ open }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  if (!open) return null;

  const normalizedRole = auth.role?.toLowerCase();

  const handleLogout = async () => {
    await authService.logout(dispatch);
  };

  const getRoleLabel = () => {
    if (normalizedRole === "admin") return "Administrator";
    if (normalizedRole === "seller") return "Seller account";
    if (normalizedRole === "customer") return "Customer account";

    return "AIDR member";
  };

  return (
    <div className={`user-dropdown ${!userInfo ? "guest" : ""}`}>
      {/* HEADER */}
      {userInfo ? (
        <div className="user-dropdown__header">
          <div className="user-info">
            <img
              src={userInfo.avatarUrl || fallbackAvatar}
              alt={userInfo?.fullName || "Avatar"}
              className="user-avatar"
            />

            <div className="user-content">
              <span className="user-content__eyebrow">{getRoleLabel()}</span>

              <h3>{userInfo?.fullName}</h3>

              <p>Welcome back to AIDR</p>
            </div>
          </div>
        </div>
      ) : (
        <UserNotLogin />
      )}

      {/* BODY */}
      <div className="user-dropdown__body">
        {userInfo && (
          <div className="user-dropdown__menu">
            {normalizedRole === "customer" && (
              <>
                <Link to="/profile" className="dropdown-item">
                  <span className="dropdown-item__icon">
                    <User size={17} />
                  </span>

                  <span className="dropdown-item__content">
                    <strong>My Profile</strong>
                    <small>Manage your personal information</small>
                  </span>
                </Link>

                <Link to="/order-self" className="dropdown-item">
                  <span className="dropdown-item__icon">
                    <Package size={17} />
                  </span>

                  <span className="dropdown-item__content">
                    <strong>My Orders</strong>
                    <small>Track and manage your purchases</small>
                  </span>
                </Link>

                <Link
                  to="/wish-list"
                  data-testid="wishlist-link"
                  className="dropdown-item"
                >
                  <span className="dropdown-item__icon">
                    <Heart size={17} />
                  </span>

                  <span className="dropdown-item__content">
                    <strong>Wishlist</strong>
                    <small>Products you saved for later</small>
                  </span>
                </Link>
              </>
            )}

            {isAdmin(auth.role) && (
              <Link to="/admin" className="dropdown-item">
                <span className="dropdown-item__icon">
                  <Package size={17} />
                </span>

                <span className="dropdown-item__content">
                  <strong>Admin Dashboard</strong>
                  <small>Manage the AIDR platform</small>
                </span>
              </Link>
            )}

            {normalizedRole === "seller" && (
              <Link to="/seller" className="dropdown-item">
                <span className="dropdown-item__icon">
                  <Package size={17} />
                </span>

                <span className="dropdown-item__content">
                  <strong>Seller Dashboard</strong>
                  <small>Manage products and orders</small>
                </span>
              </Link>
            )}
          </div>
        )}

        <div className="user-dropdown__divider" />

        {userInfo ? (
          <Button
            type="button"
            onClick={handleLogout}
            className="dropdown-item dropdown-item--logout"
          >
            <span className="dropdown-item__icon">
              <LogOut size={17} />
            </span>

            <span className="dropdown-item__content">
              <strong>Log out</strong>
              <small>Sign out of your AIDR account</small>
            </span>
          </Button>
        ) : (
          <Link to="/login" className="dropdown-item dropdown-item--login">
            <span className="dropdown-item__icon">
              <LogOut size={17} />
            </span>

            <span className="dropdown-item__content">
              <strong>Sign in</strong>
              <small>Access your account</small>
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
