import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Wallet,
  Menu,
  X,
  Tags,
  Ticket,
  Zap,
  Settings,
} from "lucide-react";

import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminUsers } from "../../../../redux/slice/admin/users/userThunk";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const usersState = useSelector((state) => state?.usersAdmin);

  useEffect(() => {
    dispatch(
      fetchAdminUsers({
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  }, [dispatch]);
  const menus = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={17} />,
      path: "/admin",
    },
    {
      title: "Categories",
      icon: <Tags size={17} />,
      path: "/admin/categories",
    },
    {
      title: "Users",
      icon: <Users size={17} />,
      path: "/admin/users",
      badge: usersState.users.length,
    },
    {
      title: "Products",
      icon: <Package size={17} />,
      path: "/admin/products",
    },
    {
      title: "Orders",
      icon: <ShoppingCart size={17} />,
      path: "/admin/orders",
    },
    {
      title: "Vouchers",
      icon: <Ticket size={17} />,
      path: "/admin/vouchers",
    },
    {
      title: "Finance",
      icon: <Wallet size={17} />,
      path: "/admin/finance",
    },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(true)}>
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Mobile Close */}
        <button className="sidebar-close" onClick={() => setIsOpen(false)}>
          <X size={20} />
        </button>

        {/* Logo */}
        <Link to="/" className="sidebar__brand">
          <div className="sidebar__brand-icon">
            <Zap size={18} fill="white" />
          </div>

          <div className="sidebar__brand-content">
            <strong>ElectroAdmin</strong>
            <span>Management Console</span>
          </div>
        </Link>

        {/* Menu */}
        <div className="sidebar__content">
          <span className="sidebar__section-title">MAIN MENU</span>

          <nav className="sidebar__menu">
            {menus.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `sidebar__item ${isActive ? "active" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                <span className="sidebar__item-icon">{item.icon}</span>

                <span className="sidebar__item-title">{item.title}</span>

                {item.badge && (
                  <span className="sidebar__badge">{item.badge}</span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User */}
        <div className="sidebar__user">
          <div className="sidebar__avatar">AD</div>

          <div className="sidebar__user-info">
            <strong>Admin</strong>
            <span>admin@aidr.vn</span>
          </div>

          <button className="sidebar__settings">
            <Settings size={15} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
