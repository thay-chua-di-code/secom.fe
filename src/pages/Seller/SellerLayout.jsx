import { NavLink, Outlet } from "react-router-dom";
import "./style.scss";

const SellerLayout = () => {
  return (
    <div className="seller">
      <aside className="seller__sidebar">
        <div className="seller__logo">
          <h2>Seller Center</h2>
        </div>

        <nav>
          <NavLink end to="/seller">
            Dashboard
          </NavLink>

          <NavLink to="/seller/products">Products</NavLink>

          <NavLink to="/seller/vouchers">Voucher</NavLink>

          <NavLink to="/seller/orders">Orders</NavLink>

          <NavLink to="/seller/customers">Customers</NavLink>

          <NavLink to="/seller/revenue">Revenue</NavLink>

          <NavLink to="/seller/settings">Settings</NavLink>
        </nav>
      </aside>

      <main className="seller__content">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerLayout;
