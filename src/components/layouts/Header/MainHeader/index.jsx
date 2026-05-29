import { Search, ShoppingCart, Menu, UserRound } from "lucide-react";

import logo from "../../../../assets/icons/logo.jpg";

import UserDropdown from "../../../common/UserDropDown";
import Cart from "../../../common/Cart";
import Button from "../../../common/Button/Button";
import Input from "../../../common/Input";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { fetchCart } from "../../../../redux/slice/cartSlice";

export default function MainHeader() {
  const dispatch = useDispatch();

  const [openUser, setOpenUser] = useState(false);

  const [openCart, setOpenCart] = useState(false);

  const [keyword, setKeyword] = useState("");

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { items } = useSelector((state) => state.cart);

  const cartCount = items.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleCartToggle = () => {
    setOpenCart((prev) => {
      const nextOpen = !prev;

      if (nextOpen && isAuthenticated) {
        dispatch(fetchCart());
      }

      return nextOpen;
    });
  };

  const handleSearch = () => {
    console.log(keyword);

    // navigate(`/products?keyword=${keyword}`)
  };

  return (
    <header className="border-b border-secom-600/40 bg-secom-500 shadow-md">
      <div className="container-custom flex h-20 items-center justify-between gap-4">
        {/* MOBILE MENU */}
        <button className="text-white lg:hidden hover:opacity-80">
          <Menu size={28} />
        </button>

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-md">
            <img
              src={logo}
              alt="Secom logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-2xl font-extrabold tracking-wide text-white">
              Secom
            </h1>

            <p className="text-xs text-secom-100">Secondhand E-Commerce</p>
          </div>
        </Link>

        {/* DESKTOP SEARCH */}
        <div className="hidden max-w-3xl flex-1 lg:block">
          <Input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            icon={Search}
            clearable
            className="header-search"
          />
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-5">
          {/* USER */}
          <div
            className="relative"
            onClick={() => setOpenUser((prev) => !prev)}
          >
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <UserRound size={28} />
            </Button>

            <UserDropdown open={openUser} />
          </div>

          {/* CART */}
          <div className="relative" onClick={handleCartToggle}>
            <Button
              variant="ghost"
              className="relative text-white hover:bg-white/10"
            >
              <ShoppingCart size={30} />

              {isAuthenticated && cartCount > 0 ? (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-secom-600 shadow">
                  {cartCount}
                </span>
              ) : null}
            </Button>

            <Cart open={openCart} />
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="container-custom pb-5 lg:hidden">
        <Input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          icon={Search}
          clearable
          className="header-search"
        />
      </div>
    </header>
  );
}
