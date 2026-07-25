import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Search, ShoppingCart, Menu, UserRound } from "lucide-react";
import UserDropdown from "../../../common/UserDropDown";
import Button from "../../../common/Button/Button";
import Input from "../../../common/Input";
import Cart from "../../../common/Cart";
import "./style.scss";
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
  const auth = useSelector((state) => state.auth);
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
    <header className="main-header">
      <div className="container-custom">
        <div className="main-header__wrapper">
          <button className="main-header__menu">
            <Menu size={24} />
          </button>

          <Link to="/" className="main-header__logo">
            <div className="main-header__brand">
              <h1>AIDR</h1>
              <span>AI Driven Retail</span>
            </div>
          </Link>

          <div className="main-header__search">
            <div ref={searchRef} className="main-header__search-box">
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

          <div className="main-header__actions">
            {isAuthenticated && (
              <>
                <div
                  className="main-header__user"
                  onMouseEnter={handleUserEnter}
                  onMouseLeave={handleUserLeave}
                >
                  <Button variant="ghost" className="main-header__avatar">
                    {userInfo?.avatarUrl ? (
                      <img
                        src={userInfo.avatarUrl}
                        alt={userInfo?.fullName || "Avatar"}
                      />
                    ) : (
                      <UserRound size={22} />
                    )}
                  </Button>

                  <UserDropdown user={user} open={openUser} />
                </div>
                {auth.role.toLowerCase() === "customer" && (
                  <div
                    className="main-header__cart"
                    onMouseEnter={handleCartEnter}
                    onMouseLeave={handleCartLeave}
                  >
                    <Button variant="ghost" className="main-header__cart-btn">
                      <ShoppingCart size={24} />

                      {cartCount > 0 && (
                        <span className="main-header__cart-badge">
                          {cartCount}
                        </span>
                      )}
                    </Button>

                    <Cart open={openCart} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="main-header__mobile-search">
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
      </div>
    </header>
  );
}
