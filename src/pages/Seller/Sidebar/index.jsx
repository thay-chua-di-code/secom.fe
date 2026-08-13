import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Wallet,
  Menu,
  X,
  Ticket,
  RotateCcw,
  Zap,
  Settings,
  LogOut,
  BarChart3,
} from "lucide-react";

import "./style.scss";

import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slice/authSlice";
import { resetSellerStatus } from "../../../redux/slice/sellerStatusSlice";
import { clearUserInfo } from "../../../redux/slice/userSlice";

import toast from "react-hot-toast";

const SidebarSeller = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUserInfo());
    dispatch(resetSellerStatus());
    dispatch(logout());

    toast.success("Logged out");

    navigate("/auth", {
      replace: true,
    });
  };

  const menus = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={17} />,
      path: "/seller",
      end: true,
    },
    {
      title: "Products",
      icon: <Package size={17} />,
      path: "/seller/products",
    },
    {
      title: "Vouchers",
      icon: <Ticket size={17} />,
      path: "/seller/vouchers",
    },
    {
      title: "Orders",
      icon: <ShoppingCart size={17} />,
      path: "/seller/orders",
    },
    {
      title: "Exchanges / Warranty",
      icon: <RotateCcw size={17} />,
      path: "/seller/return-requests",
    },
    {
      title: "Wallet",
      icon: <Wallet size={17} />,
      path: "/seller/wallet",
    },
    // {
    //   title: "Revenue",
    //   icon: <BarChart3 size={17} />,
    //   path: "/seller/revenue",
    // },
    {
      title: "Settings",
      icon: <Settings size={17} />,
      path: "/seller/settings",
    },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        type="button"
        className="seller-sidebar-toggle"
        onClick={() => setIsOpen(true)}
        aria-label="Open seller sidebar"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="seller-sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`seller-sidebar ${isOpen ? "open" : ""}`}>
        {/* Mobile Close */}
        <button
          type="button"
          className="seller-sidebar-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close seller sidebar"
        >
          <X size={20} />
        </button>

        {/* Brand */}
        <Link to="/" className="seller-sidebar__brand">
          <div className="seller-sidebar__brand-icon">
            <Zap size={18} fill="white" />
          </div>

          <div className="seller-sidebar__brand-content">
            <strong>ElectroSeller</strong>
            <span>Seller Management</span>
          </div>
        </Link>

        {/* Menu */}
        <div className="seller-sidebar__content">
          <span className="seller-sidebar__section-title">MAIN MENU</span>

          <nav className="seller-sidebar__menu">
            {menus.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `seller-sidebar__item ${isActive ? "active" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                <span className="seller-sidebar__item-icon">{item.icon}</span>

                <span className="seller-sidebar__item-title">{item.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Seller User */}
        <div className="seller-sidebar__user">
          <div className="seller-sidebar__avatar">SE</div>

          <div className="seller-sidebar__user-info">
            <strong>Seller</strong>
            <span>Seller Center</span>
          </div>

          <button
            type="button"
            className="seller-sidebar__settings"
            onClick={() => setIsSettingsOpen((current) => !current)}
            aria-label="Seller settings"
            aria-expanded={isSettingsOpen}
            title="Settings"
          >
            <Settings size={15} />
          </button>

          {isSettingsOpen && (
            <div className="seller-sidebar__settings-menu">
              <button type="button" onClick={handleLogout}>
                <LogOut size={14} />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default SidebarSeller;
