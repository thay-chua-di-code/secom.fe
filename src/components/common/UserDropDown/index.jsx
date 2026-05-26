import {
  Package,
  Heart,
  LogOut,
  User,
} from "lucide-react";

import "./style.scss";

export default function UserDropdown({ user, open }) {
  if (!open) return null;

  return (
    <div className="user-dropdown">
      {/* HEADER */}
      <div className="user-dropdown__header">
        <div className="user-info">
          <img
            src={user.avatar}
            alt="avatar"
            className="user-avatar"
          />

          <div className="user-content">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="user-dropdown__body">
        <button className="dropdown-item">
          <User size={20} />
          My Profile
        </button>

        <button className="dropdown-item">
          <Package size={20} />
          My Orders
        </button>

        <button className="dropdown-item">
          <Heart size={20} />
          Wishlist
        </button>

        <hr className="divider" />

        <button className="dropdown-item logout">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}