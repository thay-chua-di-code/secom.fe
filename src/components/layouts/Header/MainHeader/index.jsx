import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";

import UserDropdown from "../../../common/UserDropDown";
import Button from "../../../common/Button/Button";
import Cart from "../../../common/Cart";

import { fetchCart } from "../../../../redux/slice/cartSlice";

import "./style.scss";

const NAV_ITEMS = [
  {
    key: "products",
    label: "Products",
    dropdown: [
      {
        title: "Marketplace",
        description: "Discover products from trusted sellers",
        to: "/products",
      },
      {
        title: "Categories",
        description: "Browse products by category",
        to: "/categories",
      },
      {
        title: "Smart Recommendations",
        description: "AI-powered recommendations made for you",
        to: "/products",
      },
    ],
  },
  {
    key: "solutions",
    label: "Solutions",
    dropdown: [
      {
        title: "For Buyers",
        description: "Discover and compare products easier",
        to: "/products",
      },
      {
        title: "For Sellers",
        description: "Manage your online store",
        to: "/seller",
      },
      {
        title: "AI Retail",
        description: "Smarter shopping powered by AI",
        to: "/",
      },
    ],
  },
  {
    key: "customers",
    label: "Customers",
    to: "/products",
  },
  {
    key: "pricing",
    label: "Pricing",
    to: "/",
  },
  {
    key: "company",
    label: "Company",
    dropdown: [
      {
        title: "About AIDR",
        description: "Learn more about AI Driven Retail",
        to: "/about",
      },
      {
        title: "Seller Channel",
        description: "Start selling with AIDR",
        to: "/seller-register",
      },
      {
        title: "Contact",
        description: "Get in touch with our team",
        to: "/contact",
      },
    ],
  },
];

export default function MainHeader() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { isAuthenticated, user, role } = useSelector((state) => state.auth);

  const userInfo = useSelector((state) => state.user?.userInfo);

  const { items = [] } = useSelector((state) => state.cart);

  const [activeMenu, setActiveMenu] = useState(null);
  const [openUser, setOpenUser] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const userTimer = useRef(null);
  const cartTimer = useRef(null);

  const normalizedRole = role?.toLowerCase();

  const cartCount = items.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  const activeNavItem = NAV_ITEMS.find((item) => item.key === activeMenu);

  const isExpanded = Boolean(activeNavItem?.dropdown) && !mobileOpen;

  const isLoginPage = pathname === "/login" || pathname === "/register";

  const handleUserEnter = () => {
    clearTimeout(userTimer.current);
    setOpenUser(true);
  };

  const handleUserLeave = () => {
    userTimer.current = setTimeout(() => {
      setOpenUser(false);
    }, 100);
  };

  const handleCartEnter = () => {
    clearTimeout(cartTimer.current);

    setOpenCart(true);

    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  };

  const handleCartLeave = () => {
    cartTimer.current = setTimeout(() => {
      setOpenCart(false);
    }, 100);
  };

  const closeMenus = () => {
    setActiveMenu(null);
  };

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  return (
    <div
      className={`main-header ${isExpanded ? "main-header--expanded" : ""}`}
      onMouseLeave={closeMenus}
    >
      <div className="main-header__inner">
        {/* LOGO */}
        <Link
          to="/"
          className="main-header__logo"
          onMouseEnter={() => setActiveMenu(null)}
        >
          <span className="main-header__logo-icon">
            <span />
            <span />
            <span />
            <span />
          </span>

          <div className="main-header__brand">
            <strong>AIDR</strong>
            <small>AI Driven Retail</small>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        {!isLoginPage && (
          <nav className="main-header__nav">
            {NAV_ITEMS.map((item) => {
              const hasDropdown = Boolean(item.dropdown);
              const isActive = activeMenu === item.key;

              if (!hasDropdown) {
                return (
                  <Link
                    key={item.key}
                    to={item.to}
                    className="main-header__nav-link"
                    onMouseEnter={() => setActiveMenu(null)}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <button
                  key={item.key}
                  type="button"
                  className={`main-header__nav-link ${
                    isActive ? "main-header__nav-link--active" : ""
                  }`}
                  onMouseEnter={() => setActiveMenu(item.key)}
                  onClick={() =>
                    setActiveMenu((current) =>
                      current === item.key ? null : item.key,
                    )
                  }
                >
                  {item.label}

                  <ChevronDown
                    size={16}
                    className={`main-header__chevron ${
                      isActive ? "main-header__chevron--open" : ""
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        )}

        {/* RIGHT ACTIONS */}
        <div
          className="main-header__actions"
          onMouseEnter={() => setActiveMenu(null)}
        >
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="main-header__login">
                Log in
              </Link>

              <Link to="/register" className="main-header__started">
                Get started
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                className="main-header__search-button"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {normalizedRole === "customer" && (
                <div
                  className="main-header__cart"
                  onMouseEnter={handleCartEnter}
                  onMouseLeave={handleCartLeave}
                >
                  <Button variant="ghost" className="main-header__icon-button">
                    <ShoppingCart size={21} />

                    {cartCount > 0 && (
                      <span className="main-header__cart-badge">
                        {cartCount}
                      </span>
                    )}
                  </Button>

                  <Cart open={openCart} />
                </div>
              )}

              <div
                className="main-header__user"
                onMouseEnter={handleUserEnter}
                onMouseLeave={handleUserLeave}
              >
                <Button variant="ghost" className="main-header__avatar">
                  {userInfo?.avatarUrl ? (
                    <img
                      src={userInfo.avatarUrl}
                      alt={userInfo?.fullName || "User avatar"}
                    />
                  ) : (
                    <UserRound size={21} />
                  )}
                </Button>

                <UserDropdown user={user} open={openUser} />
              </div>
            </>
          )}

          <button
            type="button"
            className="main-header__mobile-button"
            onClick={() => setMobileOpen((current) => !current)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* =======================
          MEGA MENU
      ======================== */}
      <div
        className={`main-header__mega ${
          isExpanded ? "main-header__mega--open" : ""
        }`}
      >
        <div className="main-header__mega-inner">
          {activeNavItem?.dropdown?.map((menuItem) => (
            <Link
              key={menuItem.title}
              to={menuItem.to}
              className="main-header__mega-item"
            >
              <span className="main-header__mega-title">{menuItem.title}</span>

              <span className="main-header__mega-description">
                {menuItem.description}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`main-header__mobile-menu ${
          mobileOpen ? "main-header__mobile-menu--open" : ""
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <div key={item.key} className="main-header__mobile-group">
            {item.to ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}

            {item.dropdown?.map((child) => (
              <Link
                key={child.title}
                to={child.to}
                className="main-header__mobile-child"
              >
                {child.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
