import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartEmpty() {
  return (
    <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <ShoppingCart size={28} />
      </div>
      <h1 className="mt-6 text-2xl font-semibold text-slate-900">Your cart is empty</h1>
      <p className="mt-2 text-sm text-slate-500">
        Add products to your cart to continue with checkout.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Continue shopping
      </Link>
    </div>
  );
}
