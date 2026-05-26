import { Package, Heart, LogOut, User } from "lucide-react";
import Button from "../Button/Button";
import "./style.scss";
import { Link } from "react-router-dom";

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
export default function UserDropdown({ user, open }) {
  if (!open) return null;

  const handleLogout = () => {
    alert("Hello");
  };
  return (
    <div className={`user-dropdown ${!user ? "guest" : ""}`}>
      {/* HEADER */}
      {user ? (
        <div className="user-dropdown__header">
          <div className="user-info">
            <img src={user.avatar} alt="avatar" className="user-avatar" />

            <div className="user-content">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <UserNotLogin />
      )}

      {/* BODY */}
      <div className="user-dropdown__body">
        {user && (
          <div>
            <Link to={`/profile/${user.id}`} className="dropdown-item">
              <User size={20} />
              My Profile
            </Link>
            <Link to="/orders" className="dropdown-item">
              <Package size={20} />
              My Orders
            </Link>

            <Link to="/wishlist" className="dropdown-item">
              <Heart size={20} />
              Wishlist
            </Link>
          </div>
        )}

        <hr className="divider" />
        {user ? (
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
