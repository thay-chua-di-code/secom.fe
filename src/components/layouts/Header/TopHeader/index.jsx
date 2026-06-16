import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import NotificationDropdown from "../../../../pages/Notifications/Popup";

export default function TopHeader({ onOpenLogin, onOpenRegister }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return (
    <div className="border-b border-white/10 bg-black text-white">
      <div className="container-custom flex h-10 items-center justify-end md:justify-between">
        <div className="hidden items-center gap-5 text-xs md:flex">
          {role?.toLowerCase() === "seller" ? (
            <Link to="/seller" className="transition hover:text-sky-200">
              Seller Channel
            </Link>
          ) : (
            <Link
              to="/seller-register"
              className="transition hover:text-sky-200"
            >
              Become a Seller
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs md:text-sm">
          <NotificationDropdown />

          {!isAuthenticated && (
            <>
              <div className="hidden h-4 w-px bg-white/20 md:block" />

              <Link
                to="/login"
                onClick={onOpenLogin}
                className="font-medium transition hover:text-sky-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={onOpenRegister}
                className="font-medium transition hover:text-sky-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
