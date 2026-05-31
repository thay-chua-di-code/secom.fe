import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const routeNameMap = {
  "": "Home",
  products: "Products",
  product: "Product Details",
  categories: "Categories",
  cart: "Cart",
  checkout: "Checkout",
  profile: "My Account",
  orders: "My Orders",
  wishlist: "Wishlist",
  "change-password": "Change Password",
  login: "Login",
  register: "Register",
  about: "About",
  contact: "Contact",
};

export default function Breadcrumb() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="mb-6 flex items-center text-sm text-gray-500">
      <Link to="/" className="transition hover:text-secom-600">
        Home
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        const isLast = index === pathnames.length - 1;

        return (
          <div key={to} className="flex items-center">
            <ChevronRight size={16} className="mx-2" />

            {isLast ? (
              <span className="font-medium text-black">
                {routeNameMap[value] || value}
              </span>
            ) : (
              <Link to={to} className="transition hover:text-secom-600">
                {routeNameMap[value] || value}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
