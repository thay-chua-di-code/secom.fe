import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Search, ShoppingCart, Menu, UserRound } from "lucide-react";
import logo from "../../../../assets/icons/logo.jpg";
import UserDropdown from "../../../common/UserDropDown";
import Button from "../../../common/Button/Button";
import Input from "../../../common/Input";
import Cart from "../../../common/Cart";

import { fetchCart } from "../../../../redux/slice/cartSlice";
import SearchDropdown from "../../../common/SearchDropDown";
import { searchProductsThunk } from "../../../../redux/slice/productSlice";

export default function MainHeader() {
  const dispatch = useDispatch();
  const [openSearch, setOpenSearch] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const userInfo = useSelector((state) => state.user?.userInfo);
  const { items = [] } = useSelector((state) => state.cart);
  const { categories } = useSelector((state) => state.categories);
  const closeTimer = useRef(null);
  const cartTimer = useRef(null);
  const cartCount = items.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log("input:", value);
    setKeyword(value);

    if (!value.trim()) return;

    dispatch(
      searchProductsThunk({
        keyword: value,
        page: 1,
        pageSize: 8,
      }),
    );
  };

  const searchRef = useRef(null);

  const handleUserEnter = () => {
    clearTimeout(closeTimer.current);
    setOpenUser(true);
  };

  const handleUserLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenUser(false);
    }, 20);
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
    }, 20);
  };


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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
              Smart Tech, Recharged.
            </p>
          </div>
        </Link>

        {/* Search desktop */}
        <div className="hidden flex-1 px-4 lg:block">
          <div ref={searchRef} className="relative mx-auto max-w-2xl">
            <Input
              data-testid="product-search-input"
              type="text"
              placeholder="Search products..."
              value={keyword}
              onFocus={() => setOpenSearch(true)}
              onChange={handleInputChange}
              icon={Search}
              clearable
              className="header-search"
            />

            <SearchDropdown
              open={openSearch}
              keyword={keyword}
              categories={categories}
              products={[]}
              onClose={() => setOpenSearch(false)}
            />
          </div>
        </div>

        {/* User & Cart */}
        <div className="social-wrapper flex shrink-0 items-center gap-2 md:gap-4">
          {isAuthenticated && (
            <>
              <div
                className="relative"
                onMouseEnter={handleUserEnter}
                onMouseLeave={handleUserLeave}
              >
                <Button
                  variant="ghost"
                  className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-gray-200 p-0 shadow-sm transition-all hover:border-sky-500 hover:shadow-md"
                >
                  {userInfo?.avatarUrl ? (
                    <img
                      src={userInfo.avatarUrl}
                      alt={userInfo?.fullName || "Avatar"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound size={22} />
                  )}
                </Button>

                <UserDropdown user={user} open={openUser} />
              </div>

              <div
                className="relative"
                onMouseEnter={handleCartEnter}
                onMouseLeave={handleCartLeave}
              >
                <Button variant="ghost" className="relative text-black">
                  <span data-testid="cart-link" className="sr-only">
                    Cart
                  </span>
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
          data-testid="product-search-input"
          type="text"
          placeholder="Search products..."
          value={keyword}
          onFocus={() => setOpenSearch(true)}
          onChange={handleInputChange}
          icon={Search}
          clearable
          className="header-search"
        />
      </div>
    </header>
  );
}
