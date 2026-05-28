import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartEmpty from "../../components/cart/CartEmpty";
import CartList from "../../components/cart/CartList";
import CartSkeleton from "../../components/cart/CartSkeleton";
import CartSummary from "../../components/cart/CartSummary";
import CartVoucher from "../../components/cart/CartVoucher";
import { useCart } from "../../hooks/useCart";

export default function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    loading,
    actionLoading,
    error,
    voucherCode,
    subtotal,
    discountAmount,
    finalTotal,
    calculateCheckout,
    updateQuantity,
    applyVoucher,
  } = useCart();

  useEffect(() => {
    document.title = "Cart";
  }, []);

  const handleCheckout = async () => {
    const resultAction = await calculateCheckout();

    if (resultAction.meta.requestStatus === "fulfilled") {
      navigate("/checkout");
    }
  };

  if (loading) {
    return <CartSkeleton />;
  }

  if (!items.length) {
    return <CartEmpty />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Your Cart</h1>
        <p className="mt-2 text-sm text-slate-500">
          Review your items, update quantities, and apply vouchers before checkout.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-start">
        <div className="space-y-4">
          <CartList
            items={items}
            disabled={actionLoading}
            onQuantityChange={updateQuantity}
          />
        </div>

        <CartSummary
          subtotal={subtotal}
          discountAmount={discountAmount}
          finalTotal={finalTotal}
          disabled={actionLoading}
          onCheckout={handleCheckout}
        >
          <CartVoucher
            defaultValue={voucherCode}
            disabled={actionLoading}
            onApply={applyVoucher}
          />
        </CartSummary>
      </div>
    </div>
  );
}
