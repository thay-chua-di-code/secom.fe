import { ShoppingCart, Search } from "lucide-react";

export default function MainHeader() {
  return (
    <div className="bg-[#ee4d2d] pb-4">
      <div className="container-custom flex items-center gap-10 pt-4">
        <div className="text-4xl font-bold text-white">SHOPEE</div>

        <div className="flex-1">
          <div className="flex overflow-hidden rounded-sm bg-white p-1 shadow-md">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 px-4 py-2 outline-none"
            />

            <button className="flex h-14 w-16 items-center justify-center bg-[#fb5533] text-white">
              <Search size={20} />
            </button>
          </div>
        </div>

        <button className="relative text-white">
          <ShoppingCart size={30} />

          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-[#ee4d2d]">
            2
          </span>
        </button>
      </div>
    </div>
  );
}
