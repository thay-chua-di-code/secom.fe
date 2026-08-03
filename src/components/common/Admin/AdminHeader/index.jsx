import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../../Input";
import NotificationDropdown from "../../../../pages/Notifications/Popup";

import "./style.scss";

const adminSearchTargets = [
  { label: "Products", description: "Search product name, seller, status", path: "/admin/products" },
  { label: "Orders", description: "Search buyer, order id, status", path: "/admin/orders" },
  { label: "Users", description: "Search users by name or email", path: "/admin/users" },
  { label: "Vouchers", description: "Search voucher code and campaign", path: "/admin/vouchers" },
  { label: "Return / Refund", description: "Search return requests", path: "/admin/return-requests" },
  { label: "Finance", description: "Search payouts and money flow", path: "/admin/finance" },
  { label: "Categories", description: "Search category name or slug", path: "/admin/categories" },
  { label: "Seller Shops", description: "Search seller approval requests", path: "/admin/seller" },
];

const AdminHeader = ({
  subtitle = "AIDR Shop – Electronics Marketplace",
  searchValue = "",
  onSearch,
  searchPlaceholder = "Search admin...",
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);
  const [keyword, setKeyword] = useState(searchValue);

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/categories": "Categories Management",
    "/admin/users": "User Management",
    "/admin/products": "Product Management",
    "/admin/orders": "Order Management",
    "/admin/return-requests": "Return / Refund Management",
    "/admin/vouchers": "Voucher Management",
    "/admin/finance": "Finance Management",
  };

  const title =
    pageTitles[location.pathname] ||
    (location.pathname.startsWith("/admin/return-requests/")
      ? "Return / Refund Management"
      : "Admin Management");

  const currentTarget = useMemo(
    () =>
      adminSearchTargets.find(
        (target) =>
          location.pathname === target.path ||
          (target.path !== "/admin" && location.pathname.startsWith(target.path)),
      ),
    [location.pathname],
  );

  const visibleTargets = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    if (!normalizedKeyword) {
      return adminSearchTargets;
    }

    return adminSearchTargets.filter(
      (target) =>
        target.label.toLowerCase().includes(normalizedKeyword) ||
        target.description.toLowerCase().includes(normalizedKeyword),
    );
  }, [keyword]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buildSearchUrl = (path) => {
    const params = new URLSearchParams();
    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword) {
      params.set("q", trimmedKeyword);
    }

    return params.toString() ? `${path}?${params.toString()}` : path;
  };

  const submitSearch = () => {
    const targetPath = currentTarget?.path || "/admin/products";
    onSearch?.(keyword.trim());
    navigate(buildSearchUrl(targetPath), { replace: false });
    setOpenSearch(false);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setKeyword(value);
    onSearch?.(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitSearch();
    }
  };

  return (
    <header className="admin-header">
      <div className="admin-header__page-info">
        <h1>{title}</h1>

        <span>{subtitle}</span>
      </div>

      <div className="admin-header__actions">
        <div className="admin-header__search" ref={searchRef}>
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={keyword}
            onFocus={() => setOpenSearch(true)}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            icon={Search}
            clearable
            className="admin-header__search-input"
            aria-label="Search admin dashboard"
          />

          {openSearch && (
            <div className="admin-search-dropdown">
              <div className="admin-search-dropdown__section">
                <h4>{keyword.trim() ? "Search Admin Modules" : "Quick Admin Navigation"}</h4>

                <div className="admin-search-dropdown__targets">
                  {visibleTargets.length ? (
                    visibleTargets.map((target) => (
                      <Link
                        key={target.path}
                        to={buildSearchUrl(target.path)}
                        onClick={() => setOpenSearch(false)}
                      >
                        <strong>{target.label}</strong>
                        <span>{target.description}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="admin-search-dropdown__empty">
                      No matching admin modules.
                    </div>
                  )}
                </div>
              </div>

              <div className="admin-search-dropdown__footer">
                Press Enter to search in {currentTarget?.label || "Products"}
              </div>
            </div>
          )}
        </div>

        <div className="admin-header__notification-home">
          <NotificationDropdown />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
