import React from "react";
import { Bell, Search } from "lucide-react";

import "./style.scss";
import { useLocation } from "react-router-dom";

const AdminHeader = ({
  subtitle = "AIDR Shop – Electronics Marketplace",
  searchValue = "",
  onSearch,
  searchPlaceholder = "Quick search...",
}) => {
  const location = useLocation();

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/categories": "Categories Management",
    "/admin/users": "User Management",
    "/admin/products": "Product Management",
    "/admin/orders": "Order Management",
    "/admin/vouchers": "Voucher Management",
    "/admin/finance": "Finance Management",
  };

  const title = pageTitles[location.pathname] || "Admin Management";

  return (
    <header className="admin-header">
      <div className="admin-header__page-info">
        <h1>{title}</h1>

        <span>{subtitle}</span>
      </div>

      <div className="admin-header__actions">
        <div className="admin-header__search">
          <Search size={15} />

          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder={searchPlaceholder}
          />
        </div>

        <button className="admin-header__notification">
          <Bell size={16} />

          <span className="notification-dot" />
        </button>

        <div className="admin-header__avatar">AD</div>
      </div>
    </header>
  );
};

export default AdminHeader;
