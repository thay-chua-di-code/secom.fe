import { useEffect, useMemo, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartList from "./List/index";
import CartSummary from "./CartSummary/index";
import VoucherList from "./VoucherList/index";
import { fetchCart } from "../../redux/slice/cartSlice";
import { fetchVouchers } from "../../redux/slice/voucherSlice";
import { useCart } from "../../hooks/useCart";
import toast from "react-hot-toast";
import "./style.scss";

function CartEmpty() {
  return (
    <div className="cart-empty">
      {" "}
      <div className="cart-empty__icon">
        {" "}
        <ShoppingCart size={64} />{" "}
      </div>{" "}
      <h2>Your cart is empty</h2>{" "}
      <p> Looks like you haven't added any products yet. </p>{" "}
      <Link to="/" className="cart-empty__button">
        {" "}
        Continue Shopping{" "}
      </Link>{" "}
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="cart-skeleton">
      {" "}
      {[1, 2, 3].map((item) => (
        <div className="cart-skeleton__item" key={item} />
      ))}{" "}
    </div>
  );
}
export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchedRef = useRef(false);
  const headerCheckboxRef = useRef(null);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { vouchers, loading: voucherLoading } = useSelector(
    (state) => state.voucher,
  );

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
    if (isAuthenticated && !fetchedRef.current) {
      fetchedRef.current = true;

      dispatch(fetchCart());
      dispatch(fetchVouchers());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    setSelectedItemIds((prev) =>
      prev.filter((id) => items.some((item) => item.cartItemId === id)),
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

  const selectedDiscountAmount = 0;

  const selectedFinalTotal = selectedSubtotal - selectedDiscountAmount;

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
    setSelectedItemIds((prev) => {
      if (checked) {
        return prev.includes(cartItemId) ? prev : [...prev, cartItemId];
      }

      return prev.filter((id) => id !== cartItemId);
    });
  };

  const handleSelectAll = (checked) => {
    setSelectedItemIds(checked ? items.map((i) => i.cartItemId) : []);
  };

  const handleApplyVoucher = () => {
    if (!selectedItemIds.length) {
      toast.error(
        "Please select at least one item before applying a voucher.",
      );
      return;
    }

    if (!selectedVoucher) {
      toast.error("Please select a voucher.");
      return;
    }

    applyVoucher(selectedVoucher);
  };

  const handleCheckout = async () => {
    if (!selectedItemIds.length) {
      toast.error("Please select at least one item before checkout.");
      return;
    }

    const result = await calculateCheckout();

    if (result?.meta?.requestStatus === "fulfilled") {
      navigate("/checkout");
    }
  };

  if (loading) {
    return (
      <main className="cart-page">
        <div className="cart-page__container">
          <CartSkeleton />
        </div>
      </main>
    );
  }

  if (!items.length) {
    return (
      <main className="cart-page">
        <div className="cart-page__container">
          {error ? (
            <div className="cart-page__error">{error}</div>
          ) : (
            <CartEmpty />
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-page__container">
        {error && <div className="cart-page__error">{error}</div>}

        <div className="cart-page__content">
          <div>
            <CartList
              items={items}
              disabled={actionLoading}
              onQuantityChange={updateQuantity}
              voucherCode={voucherCode}
              selectedItemIds={selectedItemIds}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              allSelected={allSelected}
              partiallySelected={partiallySelected}
              headerCheckboxRef={headerCheckboxRef}
            />

            <VoucherList
              vouchers={vouchers}
              loading={voucherLoading}
              selectedVoucher={selectedVoucher}
              onSelectVoucher={setSelectedVoucher}
            />

            <div className="voucher-action">
              <button onClick={handleApplyVoucher} disabled={!selectedVoucher}>
                Apply Voucher
              </button>
            </div>
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
        </div>
      </div>
    </main>
  );
}
