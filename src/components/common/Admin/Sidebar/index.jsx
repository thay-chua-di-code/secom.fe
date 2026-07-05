import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Wallet,
  Settings,
  Menu,
  X,
  Tags,
  Ticket,
} from "lucide-react";

import "./style.scss";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin",
    },
    // {
    //   title: "Banner",
    //   icon: <Wallet size={20} />,
    //   path: "/admin/finance",
    // },
    {
      title: "Categories",
      icon: <Tags size={20} />,
      path: "/admin/categories",
    },
    {
      title: "Users",
      icon: <Users size={20} />,
      path: "/admin/users",
    },
    {
      title: "Products",
      icon: <Package size={20} />,
      path: "/admin/products",
    },
    {
      title: "Orders",
      icon: <ShoppingCart size={20} />,
      path: "/admin/orders",
    },
    {
      title: "Vouchers",
      icon: <Ticket size={20} />,
      path: "/admin/vouchers",
    },
    {
      title: "Finance",
      icon: <Wallet size={20} />,
      path: "/admin/finance",
    },
  ];

  return (
    <>
      {/* Mobile Toggle */}

      <button className="sidebar-toggle" onClick={() => setIsOpen(true)}>
        <Menu size={24} />
      </button>

      {/* Overlay */}

      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="sidebar-close" onClick={() => setIsOpen(false)}>
          <X size={22} />
        </button>

        <Link to={"/"} className="sidebar__logo">
          <h2>SECOM</h2>
          <span>Admin Panel</span>
        </Link>

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
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
