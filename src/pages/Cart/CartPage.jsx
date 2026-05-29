import { useEffect, useMemo, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CartEmpty from "../../components/cart/CartEmpty";
import CartList from "../../components/cart/CartList";
import CartSkeleton from "../../components/cart/CartSkeleton";
import CartSummary from "../../components/cart/CartSummary";
import { useCart } from "../../hooks/useCart";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function CartPage() {
  const navigate = useNavigate();
  const headerCheckboxRef = useRef(null);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [selectionMessage, setSelectionMessage] = useState("");

  const {
    items,
    loading,
    actionLoading,
    error,
    voucherCode,
    calculateCheckout,
    updateQuantity,
    applyVoucher,
  } = useCart();

  useEffect(() => {
    document.title = "Shopping Cart | SECOM";
  }, []);

  useEffect(() => {
    setSelectedItemIds((previous) =>
      previous.filter((itemId) =>
        items.some((item) => item.cartItemId === itemId),
      ),
    );
  }, [items]);

  const selectedItems = useMemo(
    () => items.filter((item) => selectedItemIds.includes(item.cartItemId)),
    [items, selectedItemIds],
  );

  const selectedItemCount = selectedItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  const selectedSubtotal = selectedItems.reduce(
    (total, item) => total + (item.subtotal || 0),
    0,
  );

  const selectedDiscountAmount = selectedItemIds.length > 0 ? 0 : 0;
  const selectedFinalTotal = Math.max(
    0,
    selectedSubtotal - selectedDiscountAmount,
  );

  const allSelected =
    items.length > 0 && selectedItemIds.length === items.length;
  const partiallySelected =
    selectedItemIds.length > 0 && selectedItemIds.length < items.length;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = partiallySelected;
    }
  }, [partiallySelected]);

  const handleSelectItem = (cartItemId, checked) => {
    setSelectionMessage("");
    setSelectedItemIds((previous) => {
      if (checked) {
        return previous.includes(cartItemId)
          ? previous
          : [...previous, cartItemId];
      }
      return previous.filter((id) => id !== cartItemId);
    });
  };

  const handleSelectAll = (checked) => {
    setSelectionMessage("");
    setSelectedItemIds(checked ? items.map((item) => item.cartItemId) : []);
  };

  const handleApplyVoucher = (code) => {
    if (!selectedItemIds.length) {
      setSelectionMessage(
        "Please select at least one item before applying a voucher.",
      );
      return;
    }
    setSelectionMessage("");
    applyVoucher(code);
  };

  const handleCheckout = async () => {
    if (!selectedItemIds.length) {
      setSelectionMessage("Please select at least one item before checkout.");
      return;
    }

    setSelectionMessage("");

    // TODO: Backend checkout currently calculates all cart items.
    // Need backend support for selected cart items before production checkout.
    const result = await calculateCheckout();

    if (result?.meta?.requestStatus === "fulfilled") {
      navigate("/checkout");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-page pb-36">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <CartSkeleton />
        </div>
      </main>
    );
  }

  if (!items.length) {
    return (
      <main className="min-h-screen bg-page pb-36">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <CartEmpty />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-page pb-36">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secom-50 text-secom-600">
                <ShoppingCart size={24} />
              </span>
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Shopping Cart
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Review your selected products before checkout
                </p>
              </div>
            </div>
          </div>
        </section>

        {error ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}

        {selectionMessage ? (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-700">
            {selectionMessage}
          </div>
        ) : null}

        <CartList
          items={items}
          disabled={actionLoading}
          onQuantityChange={updateQuantity}
          voucherCode={voucherCode}
          onApplyVoucher={handleApplyVoucher}
          selectedItemIds={selectedItemIds}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          allSelected={allSelected}
          partiallySelected={partiallySelected}
          headerCheckboxRef={headerCheckboxRef}
        />
      </div>

      <CartSummary
        subtotal={selectedSubtotal}
        discountAmount={selectedDiscountAmount}
        finalTotal={selectedFinalTotal}
        itemCount={selectedItemCount}
        disabled={actionLoading || !selectedItemIds.length}
        onCheckout={handleCheckout}
        selectedCount={selectedItemIds.length}
        allSelected={allSelected}
        partiallySelected={partiallySelected}
        onSelectAll={handleSelectAll}
      />
    </main>
  );
}
