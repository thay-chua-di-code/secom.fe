import { Link, useLocation } from "react-router-dom";

const breadcrumbMap = {
  "/about": "About",
  "/contact": "Contact",
  "/cart": "Cart",
  "/wishlist": "Wishlist",
  "/profile": "My Account",
  "/profile/change-password": "Change Password",
  "/orders": "My Orders",
  "/products": "Products",
};

export default function Breadcrumb() {
  const { pathname } = useLocation();

  const currentPage = breadcrumbMap[pathname];

  if (!currentPage || pathname === "/") return null;

  return (
    <div className="mb-8 flex items-center gap-2 text-sm">
      <Link to="/" className="text-gray-500 transition hover:text-black">
        Home
      </Link>

      <span className="text-gray-400">/</span>

      <span className="font-medium text-black">{currentPage}</span>
    </div>
  );
}
