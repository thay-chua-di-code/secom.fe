import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import NotificationDropdown from "../../../../pages/Notifications/Popup";

export default function TopHeader({ onOpenLogin, onOpenRegister }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const normalizedRole = role?.toLowerCase();
  const isAdmin = normalizedRole === "admin";
  const isSeller = normalizedRole === "seller";

  const checkIsLogin = () => {
    if (pathname === "/login" || pathname === "/register") {
      return true;
    }

    return false;
  };

  return (
    <div className="top-header">
      <div className="container-custom">
        <div
          className={`top-header__wrapper ${
            isAdmin ? "top-header__wrapper--admin" : ""
          }`}
        >
          {!isAdmin && (
            <div className="top-header__left">
              {isSeller ? (
                <Link to="/seller" className="top-header__link">
                  Seller Channel
                </Link>
              ) : (
                <Link to="/seller-register" className="top-header__link">
                  Become a Seller
                </Link>
              )}
            </div>
          )}

          {checkIsLogin() ? (
            <div></div>
          ) : (
            <div className="top-header__right">
              <NotificationDropdown />

              {!isAuthenticated && (
                <>
                  <span className="top-header__divider" />

                  <Link
                    to="/login"
                    onClick={onOpenLogin}
                    className="top-header__link"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={onOpenRegister}
                    className="top-header__button"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
