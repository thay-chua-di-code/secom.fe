import { Search, ShoppingCart, Menu, UserRound } from "lucide-react";
import logo from "../../../../assets/icons/logo.jpg";
import UserDropdown from "../../../common/UserDropDown/index";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../common/Button/Button";
import { fetchCart } from "../../../../redux/slice/cartSlice";
import Cart from "../../../common/Cart/index";

export default function MainHeader() {
  const dispatch = useDispatch();
  const [openUser, setOpenUser] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const cartCount = items.reduce((total, item) => total + (item.quantity || 0), 0);

  // Fetch cart when dropdown opens and user authenticated
  const handleCartToggle = () => {
    setOpenCart((prev) => {
      const nextOpen = !prev;
      if (nextOpen && isAuthenticated) {
        dispatch(fetchCart());
      }
      return nextOpen;
    });
  };

  const user = {
    id: 123,
    name: "Long Bua Dinh",
    email: "longdev@gmail.com",
    avatar:
      "https://static.wikitide.net/deathbattlewiki/5/51/Portrait.homelander.png",
  };

  return (
    <div className="bg-sky-600 shadow-md">
      <div className="container-custom flex h-20 items-center justify-between gap-4">
        {/* MOBILE MENU */}
        <button className="text-white lg:hidden">
          <Menu size={28} />
        </button>

        {/* LOGO */}
        <div className="flex items-center gap-3">
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

            <p className="text-xs text-sky-100">Secondhand E-Commerce</p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="hidden max-w-3xl flex-1 lg:block">
          <div className="flex px-5 overflow-hidden rounded-lg bg-white shadow-lg">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-5 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none md:text-base"
            />

            <button className="m-1 flex h-12 w-14 items-center justify-center rounded-xl text-black ">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-5">
          {/* USER */}
          <div
            className="relative hidden md:block"
            onClick={() => setOpenUser((prev) => !prev)}
          >
            <button className="text-white transition hover:scale-105">
              <UserRound size={28} />
            </button>

            <UserDropdown user={user} open={openUser} />
          </div>
          {/* CART */}
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

      {/* MOBILE SEARCH */}
      <div className="container-custom pb-5 lg:hidden ">
        <div className="flex px-5 overflow-hidden rounded-lg bg-white shadow-lg">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-5 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none md:text-basee"
          />

          <button className="m-1 flex h-11 w-14 items-center justify-center rounded-xl  text-black">
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
