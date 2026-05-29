import { Search, ShoppingCart, Menu, UserRound } from "lucide-react";
import logo from "../../../../assets/icons/logo.jpg";
import UserDropdown from "../../../common/UserDropDown/index";
import Cart from "../../../common/Cart/index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../common/Button/Button";
import { fetchCart } from "../../../../redux/slice/cartSlice";

export default function MainHeader() {
  const dispatch = useDispatch();
  const [openUser, setOpenUser] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const cartCount = items.reduce((total, item) => total + (item.quantity || 0), 0);

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

  const user = isAuthenticated
    ? {
        id: 123,
        name: "Long Bua Dinh",
        email: "longdev@gmail.com",
        avatar:
          "https://static.wikitide.net/deathbattlewiki/5/51/Portrait.homelander.png",
      }
    : null;

  return (
    <div className="border-b border-secom-600/40 bg-secom-500 shadow-md">
      <div className="container-custom flex h-20 items-center justify-between gap-4">
        <button className="text-white lg:hidden hover:opacity-80">
          <Menu size={28} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-md">
            <img
              src={logo}
              alt="Secom logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-2xl font-extrabold tracking-wide text-white">Secom</h1>
            <p className="text-xs text-secom-100">Secondhand E-Commerce</p>
          </div>
        </Link>

        <div className="hidden max-w-3xl flex-1 lg:block">
          <div className="flex overflow-hidden rounded-xl bg-white px-3 shadow-lg focus-within:ring-2 focus-within:ring-secom-300">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-3 py-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none md:text-base"
            />

            <button className="m-1 flex h-11 w-12 items-center justify-center rounded-lg text-secom-600 hover:bg-secom-50">
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative" onClick={() => setOpenUser((prev) => !prev)}>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <UserRound size={28} />
            </Button>

            <UserDropdown open={openUser} />
          </div>

          <div className="relative" onClick={handleCartToggle}>
            <Button variant="ghost" className="relative text-white hover:bg-white/10">
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

      <div className="container-custom pb-5 lg:hidden">
        <div className="flex overflow-hidden rounded-xl bg-white px-3 shadow-lg focus-within:ring-2 focus-within:ring-secom-300">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-3 py-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none"
          />

          <button className="m-1 flex h-11 w-12 items-center justify-center rounded-lg text-secom-600 hover:bg-secom-50">
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
