import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Search, ShoppingCart, Menu, UserRound } from "lucide-react";

import logo from "../../../../assets/icons/logo.jpg";

import UserDropdown from "../../../common/UserDropDown";
import Button from "../../../common/Button/Button";
import Input from "../../../common/Input";
import Cart from "../../../common/Cart";

import { fetchCart } from "../../../../redux/slice/cartSlice";

export default function MainHeader() {
  const dispatch = useDispatch();

  const [openUser, setOpenUser] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [keyword, setKeyword] = useState("");

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const { items = [] } = useSelector((state) => state.cart);

  const cartCount = items.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  const handleSearch = () => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) return;

    console.log(trimmedKeyword);
  };

  const handleCartToggle = () => {
    setOpenCart((prev) => {
      const nextOpen = !prev;

      if (nextOpen && isAuthenticated) {
        dispatch(fetchCart());
      }

      return nextOpen;
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="container-custom flex h-16 items-center justify-between gap-3 md:h-20">
        {/* Mobile menu */}
        <button className="text-black lg:hidden">
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2 md:gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow md:h-12 md:w-12">
            <img
              src={logo}
              alt="Secom logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-xl font-extrabold text-black md:text-2xl">
              Secom
            </h1>

            <p className="hidden text-xs text-gray-500 md:block">
              Secondhand E-Commerce
            </p>
          </div>
        </Link>

        {/* Search desktop */}
        <div className="hidden flex-1 px-4 lg:block">
          <div className="mx-auto max-w-2xl">
            <Input
              type="text"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              icon={Search}
              clearable
              className="header-search"
            />
          </div>
        </div>

        {/* User & Cart */}
        <div className="social-wrapper flex shrink-0 items-center gap-2 md:gap-4">
          {isAuthenticated && (
            <>
              <div
                className="relative"
                onClick={() => setOpenUser((prev) => !prev)}
              >
                <Button variant="ghost" className="social-btn text-black">
                  <UserRound size={24} />
                </Button>

                <UserDropdown user={user} open={openUser} />
              </div>

              <div className="relative" onClick={handleCartToggle}>
                <Button variant="ghost" className="relative text-black">
                  <ShoppingCart size={26} />

                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-600 px-1 text-xs font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </Button>

                <Cart open={openCart} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile search */}
      <div className="container-custom pb-4 lg:hidden">
        <Input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          icon={Search}
          clearable
          className="header-search"
        />
      </div>
    </header>
  );
}
