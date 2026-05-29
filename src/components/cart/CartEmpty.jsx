import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-secom-50">
        <ShoppingBag size={64} className="text-secom-600" />
      </div>

      <h1 className="mt-8 text-xl font-semibold text-gray-500">
        Your cart is empty
      </h1>

      <Link
        to="/"
        className="mt-8 inline-flex h-12 min-w-[220px] items-center justify-center rounded-md bg-secom-500 px-8 text-base font-semibold text-white hover:bg-secom-600"
      >
        Continue Shopping
      </Link>
    </div>
  );
}