import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import NotificationDropdown from "../../../../pages/Notifications/Popup";

export default function TopHeader({ onOpenLogin, onOpenRegister }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return (
    <div className="top-header">
      <div className="container-custom">
        <div className="top-header__wrapper">
          <div className="top-header__left">
            {role?.toLowerCase() === "seller" ? (
              <Link to="/seller" className="top-header__link">
                Seller Channel
              </Link>
            ) : (
              <Link to="/seller-register" className="top-header__link">
                Become a Seller
              </Link>
            )}
          </div>

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
        </div>
      </div>
    </div>
  );
}
