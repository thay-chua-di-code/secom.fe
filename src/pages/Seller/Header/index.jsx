import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Input from "../../../components/common/Input/index";
import NotificationDropdown from "../../../pages/Notifications/Popup";

import "./style.scss";

const sellerSearchTargets = [
  {
    label: "Products",
    description: "Search your products by name, status or stock",
    path: "/seller/products",
  },
  {
    label: "Vouchers",
    description: "Search voucher code and campaign",
    path: "/seller/vouchers",
  },
  {
    label: "Orders",
    description: "Search orders by order id, buyer or status",
    path: "/seller/orders",
  },
  {
    label: "Exchanges / Warranty",
    description: "Search exchange and warranty requests",
    path: "/seller/return-requests",
  },
  {
    label: "Wallet",
    description: "Search transactions and wallet activity",
    path: "/seller/wallet",
  },
  {
    label: "Revenue",
    description: "View and search revenue information",
    path: "/seller/revenue",
  },
  {
    label: "Settings",
    description: "Manage seller shop and account settings",
    path: "/seller/settings",
  },
];

const SellerHeader = ({
  subtitle = "AIDR Shop – Seller Center",
  searchValue = "",
  onSearch,
  searchPlaceholder = "Search seller...",
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [openSearch, setOpenSearch] = useState(false);
  const [keyword, setKeyword] = useState(searchValue);

  const pageTitles = {
    "/seller": "Dashboard",
    "/seller/dashboard": "Dashboard",
    "/seller/products": "Product Management",
    "/seller/vouchers": "Voucher Management",
    "/seller/orders": "Order Management",
    "/seller/return-requests": "Exchanges / Warranty Management",
    "/seller/wallet": "Wallet Management",
    "/seller/revenue": "Revenue Management",
    "/seller/settings": "Seller Settings",
  };

  const title =
    pageTitles[location.pathname] ||
    (location.pathname.startsWith("/seller/products/")
      ? "Product Management"
      : location.pathname.startsWith("/seller/orders/")
        ? "Order Management"
        : location.pathname.startsWith("/seller/return-requests/")
          ? "Exchanges / Warranty Management"
          : location.pathname.startsWith("/seller/vouchers/")
            ? "Voucher Management"
            : location.pathname.startsWith("/seller/wallet/")
              ? "Wallet Management"
              : location.pathname.startsWith("/seller/revenue/")
                ? "Revenue Management"
                : "Seller Center");

  const currentTarget = useMemo(
    () =>
      sellerSearchTargets.find(
        (target) =>
          location.pathname === target.path ||
          location.pathname.startsWith(`${target.path}/`),
      ),
    [location.pathname],
  );

  const visibleTargets = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    if (!normalizedKeyword) {
      return sellerSearchTargets;
    }

    return sellerSearchTargets.filter(
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setKeyword(searchValue);
  }, [searchValue]);

  const buildSearchUrl = (path) => {
    const params = new URLSearchParams();
    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword) {
      params.set("q", trimmedKeyword);
    }

    return params.toString() ? `${path}?${params.toString()}` : path;
  };

  const submitSearch = () => {
    const targetPath = currentTarget?.path || "/seller/products";

    onSearch?.(keyword.trim());

    navigate(buildSearchUrl(targetPath), {
      replace: false,
    });

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
    <header className="seller-header">
      <div className="seller-header__page-info">
        <h1>{title}</h1>

        <span>{subtitle}</span>
      </div>

      <div className="seller-header__actions">
        <div className="seller-header__search" ref={searchRef}>
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={keyword}
            onFocus={() => setOpenSearch(true)}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            icon={Search}
            clearable
            className="seller-header__search-input"
            aria-label="Search seller dashboard"
          />

          {openSearch && (
            <div className="seller-search-dropdown">
              <div className="seller-search-dropdown__section">
                <h4>
                  {keyword.trim()
                    ? "Search Seller Modules"
                    : "Quick Seller Navigation"}
                </h4>

                <div className="seller-search-dropdown__targets">
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
                    <div className="seller-search-dropdown__empty">
                      No matching seller modules.
                    </div>
                  )}
                </div>
              </div>

              <div className="seller-search-dropdown__footer">
                Press Enter to search in {currentTarget?.label || "Products"}
              </div>
            </div>
          )}
        </div>

        <div className="seller-header__notification-home">
          <NotificationDropdown />
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;
