import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartList from "./List/index";
import CartSummary from "./CartSummary/index";
import VoucherList from "./VoucherList/index";
import { ArrowRight, ShoppingBag } from "lucide-react";
import {
  fetchCart,
  calculateCheckoutSummary,
  setVoucherCode,
} from "../../redux/slice/cartSlice";
import { fetchVouchers } from "../../redux/slice/voucherSlice";
import { useCart } from "../../hooks/useCart";
import { paymentApi } from "../../api/paymentApi";
import { orderApi } from "../../api/orderApi";
import { addressService } from "../../service/addressService";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddAddressModal from "../Profile/Address/Form/FormAdd";
import "./style.scss";
import "../../components/cart/CartEmpty.scss";
import { formatCurrencyVN } from "../../utils/fncUtils";
function CartEmpty() {
  return (
    <section className="cart-empty">
      <div className="cart-empty__card">
        <div className="cart-empty__icon">
          <ShoppingBag size={70} strokeWidth={1.8} />
        </div>

        <h2 className="cart-empty__title">Your cart is empty</h2>

        <p className="cart-empty__description">
          Looks like you haven't added any products yet. Discover thousands of
          amazing products and start shopping today.
        </p>

        <Link to="/" className="cart-empty__button">
          <span>Continue Shopping</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
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
  const dispatch = useDispatch();
  const location = useLocation();
  const fetchedRef = useRef(false);
  const navigate = useNavigate();
  const headerCheckboxRef = useRef(null);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [voucherValidationTime] = useState(() => Date.now());
  const { isAuthenticated } = useSelector((state) => state.auth);
  const addresses = useSelector((state) => state.user.addresses ?? []);

  const {
    vouchers,
    loading: voucherLoading,
    error: voucherError,
  } = useSelector((state) => state.voucher);

  const {
    items,
    loading,
    actionLoading,
    error,
    voucherCode,
    subtotal,
    updateQuantity,
    applyVoucher,
    removeVoucher,
  } = useCart();

  useEffect(() => {
    document.title = "Shopping Cart | SECOM";
  }, []);

  useEffect(() => {
    if (isAuthenticated && !fetchedRef.current) {
      fetchedRef.current = true;

      dispatch(fetchCart());
      dispatch(calculateCheckoutSummary());
      dispatch(fetchVouchers({ page: 1, pageSize: 20, status: "active" }));
      addressService.getAddress(dispatch).catch(() => undefined);
    }
  }, [dispatch, isAuthenticated]);

  const validSelectedItemIds = useMemo(() => {
    const availableIds = new Set(items.map((item) => item.cartItemId));
    return selectedItemIds.filter((id) => availableIds.has(id));
  }, [items, selectedItemIds]);

  const selectedItems = useMemo(
    () =>
      items.filter((item) => validSelectedItemIds.includes(item.cartItemId)),
    [items, validSelectedItemIds],
  );

  const selectedItemCount = selectedItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  const selectedSubtotal = selectedItems.reduce(
    (total, item) => total + (item.subtotal || 0),
    0,
  );

  const activeVoucherCode = appliedVoucher || voucherCode;
  const cartSubtotalForVoucherValidation = Number(
    subtotal ?? items.reduce((total, item) => total + (item?.subtotal || 0), 0),
  );
  const activeVoucher = useMemo(
    () =>
      (Array.isArray(vouchers) ? vouchers : []).find(
        (voucher) => voucher.code === activeVoucherCode,
      ),
    [activeVoucherCode, vouchers],
  );

  const summaryDiscountAmount = useMemo(() => {
    if (!activeVoucher || selectedSubtotal <= 0) {
      return 0;
    }

    const minOrderAmount = Number(activeVoucher.minOrderAmount || 0);

    if (selectedSubtotal < minOrderAmount) {
      return 0;
    }

    const discountValue = Number(activeVoucher.discountValue || 0);
    const discountType = String(activeVoucher.discountType || "").toLowerCase();
    const rawDiscount = discountType.includes("percent")
      ? (selectedSubtotal * discountValue) / 100
      : discountValue;
    const maxDiscountAmount = Number(activeVoucher.maxDiscountAmount || 0);
    const cappedDiscount =
      maxDiscountAmount > 0
        ? Math.min(rawDiscount, maxDiscountAmount)
        : rawDiscount;

    return Math.min(Math.max(cappedDiscount, 0), selectedSubtotal);
  }, [activeVoucher, selectedSubtotal]);

  const getVoucherApplyValidationMessage = useMemo(
    () => (voucher) => {
    if (!voucher?.code) {
      return "Voucher code is required.";
    }

    if (voucher?.isActive === false) {
      return "This voucher is not active.";
    }

    if (
      voucher?.approvalStatus &&
      String(voucher.approvalStatus).toLowerCase() !== "approved"
    ) {
      return "This voucher is not approved yet.";
    }

    const expiresAt = voucher?.expiresAtUtc || voucher?.endAtUtc;
    if (expiresAt && new Date(expiresAt).getTime() < voucherValidationTime) {
      return "This voucher has expired.";
    }

    const remainingQuantity = Number(
      voucher?.remainingQuantity ??
        ((voucher?.quantity ?? 0) - (voucher?.usedQuantity ?? 0)),
    );
    if (remainingQuantity <= 0) {
      return "This voucher is out of stock.";
    }

    const minOrderAmount = Number(voucher?.minOrderAmount || 0);
    if (cartSubtotalForVoucherValidation < minOrderAmount) {
      return `Minimum order amount is ${formatCurrencyVN(minOrderAmount)}.`;
    }

    return "";
    },
    [cartSubtotalForVoucherValidation, voucherValidationTime],
  );

  const voucherDisabledReasons = useMemo(() => {
    const entries = (Array.isArray(vouchers) ? vouchers : []).map((voucher) => [
      voucher?.code,
      getVoucherApplyValidationMessage(voucher),
    ]);

    return Object.fromEntries(entries.filter(([code]) => Boolean(code)));
  }, [getVoucherApplyValidationMessage, vouchers]);

  const summarySubtotal = selectedSubtotal;
  const summaryFinalTotal = Math.max(
    selectedSubtotal - summaryDiscountAmount,
    0,
  );
  const resolvedSelectedAddressId = useMemo(() => {
    if (!addresses.length) {
      return null;
    }

    if (selectedAddressId && addresses.some((address) => address.id === selectedAddressId)) {
      return selectedAddressId;
    }

    const defaultAddress = addresses.find((address) => address.isDefault);
    return defaultAddress?.id || addresses[0]?.id || null;
  }, [addresses, selectedAddressId]);

  const selectedAddress = useMemo(
    () =>
      addresses.find((address) => address.id === resolvedSelectedAddressId) ||
      null,
    [addresses, resolvedSelectedAddressId],
  );

  const allSelected = items.length > 0 && selectedItems.length === items.length;

  const partiallySelected =
    selectedItems.length > 0 && selectedItems.length < items.length;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = partiallySelected;
    }
  }, [partiallySelected]);

  useEffect(() => {
    if (!items.length) return;

    const productId = location.state?.autoSelectProductId;

    if (!productId) return;

    const cartItem = items.find(
      (item) => String(item.productId) === String(productId),
    );

    if (cartItem) {
      queueMicrotask(() => setSelectedItemIds([cartItem.cartItemId]));
    }

    navigate(location.pathname, {
      replace: true,
      state: {},
    });
  }, [items, location.pathname, location.state, navigate]);

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

  const handleSelectVoucher = async (code) => {
    setSelectedVoucher(code);

    if (!validSelectedItemIds.length) {
      toast.error("Please select at least one item before applying a voucher.");
      return;
    }

    if (!code || code === appliedVoucher) {
      return;
    }

    const voucher = (Array.isArray(vouchers) ? vouchers : []).find(
      (item) => item?.code === code,
    );
    const validationMessage = getVoucherApplyValidationMessage(voucher);

    if (validationMessage) {
      toast.error(validationMessage);
      return;
    }

    try {
      await applyVoucher(code).unwrap();
      setAppliedVoucher(code);
      dispatch(setVoucherCode(code));
      toast.success("Voucher applied successfully.");
    } catch (applyError) {
      setSelectedVoucher(appliedVoucher || null);
      toast.error(
        applyError?.response?.data?.message ||
          applyError?.response?.data?.error ||
          applyError?.message ||
          applyError ||
          "Cannot apply voucher. Please try again.",
      );
    }
  };

  const handleRemoveVoucher = async () => {
    try {
      await removeVoucher().unwrap();
      setSelectedVoucher(null);
      setAppliedVoucher(null);
      dispatch(setVoucherCode(null));
      toast.success("Voucher removed.");
    } catch (removeError) {
      toast.error(
        removeError?.message ||
          removeError ||
          "Cannot remove voucher. Please try again.",
      );
    }
  };

  const getCreatedOrder = (response) => {
    return (
      response?.data?.data?.order || response?.data?.order || response?.order
    );
  };

  const getCreatedOrderId = (createdOrder) => {
    return createdOrder?.orderId;
  };

  const getCreatedOrderAmount = (createdOrder) => {
    return createdOrder?.finalTotal;
  };

  const getCreateOrderErrorMessage = (error) => {
    return (
      error?.response?.data?.message ||
      error?.response?.data?.Message ||
      error?.message ||
      "Unable to create order. Please try again."
    );
  };

  const getApiErrorMessage = (error) => {
    return (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.response?.data?.errors?.[0] ||
      error?.message ||
      "Unable to create payment transaction. Please try again."
    );
  };

  const handleCheckout = async () => {
    if (!validSelectedItemIds.length) {
      toast.error("Please select at least one item before checkout.");
      return;
    }

    if (!resolvedSelectedAddressId) {
      toast.error("Please select a shipping address.");
      return;
    }

    let createdOrder;
    setCheckoutError("");

    try {
      setCheckoutLoading(true);

      const createOrderResponse = await orderApi.createOrder({
        cartItemIds: validSelectedItemIds,
        shippingAddressId: resolvedSelectedAddressId,
      });

      createdOrder = getCreatedOrder(createOrderResponse);
    } catch (orderError) {
      toast.error(getCreateOrderErrorMessage(orderError));
      setCheckoutLoading(false);
      return;
    }

    try {
      const orderId = getCreatedOrderId(createdOrder);
      const amount = getCreatedOrderAmount(createdOrder);

      if (!orderId) {
        throw new Error("Missing orderId from create order response");
      }

      if (!amount || amount <= 0) {
        throw new Error("Missing finalTotal from create order response");
      }

      const paymentRequest = {
        orderId,
        amount,
        currency: "vnd",
        returnUri: `${window.location.origin}/payment-return`,
        cancelUri: `${window.location.origin}/payment-cancel`,
      };

      if (!paymentRequest.orderId) {
        throw new Error("Missing orderId");
      }

      if (!paymentRequest.amount || paymentRequest.amount <= 0) {
        throw new Error("Missing amount");
      }

      if (!paymentRequest.returnUri) {
        throw new Error("Missing returnUri");
      }

      if (!paymentRequest.cancelUri) {
        throw new Error("Missing cancelUri");
      }

      const paymentResponse =
        await paymentApi.createPaymentTransaction(paymentRequest);

      const paymentUrl =
        paymentResponse?.data?.data?.paymentUrl ||
        paymentResponse?.data?.paymentUrl ||
        paymentResponse?.paymentUrl ||
        paymentResponse?.data?.data?.checkoutUrl ||
        paymentResponse?.data?.checkoutUrl ||
        paymentResponse?.checkoutUrl;

      if (!paymentUrl) {
        throw new Error("Missing paymentUrl from PayOS response");
      }

      localStorage.setItem("lastOrderId", orderId);
      window.location.assign(paymentUrl);
    } catch (paymentError) {
      console.error("Payment error:", paymentError);
      console.error("Payment error response:", paymentError?.response);
      console.error("Payment error data:", paymentError?.response?.data);

      const message = getApiErrorMessage(paymentError);

      setCheckoutError(message);
      toast.error(message);
    } finally {
      setCheckoutLoading(false);
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
        {checkoutError && (
          <div className="cart-page__error">{checkoutError}</div>
        )}
        {voucherError && <div className="cart-page__error">{voucherError}</div>}

        <div className="cart-page__content">
          <div>
            <CartList
              items={items}
              disabled={actionLoading}
              onQuantityChange={updateQuantity}
              voucherCode={voucherCode}
              selectedItemIds={validSelectedItemIds}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              allSelected={allSelected}
              partiallySelected={partiallySelected}
              headerCheckboxRef={headerCheckboxRef}
            />

            <div className="voucher-action">
              {activeVoucherCode && (
                <button
                  type="button"
                  onClick={handleRemoveVoucher}
                  disabled={actionLoading || checkoutLoading}
                  aria-label="Remove applied voucher"
                  title="Remove applied voucher"
                >
                  Remove Voucher
                </button>
              )}
            </div>

            <VoucherList
              vouchers={vouchers}
              loading={voucherLoading}
              selectedVoucher={selectedVoucher}
              disabledReasons={voucherDisabledReasons}
              onSelectVoucher={handleSelectVoucher}
            />
          </div>

          <CartSummary
            addresses={addresses}
            selectedAddress={selectedAddress}
            onSelectAddress={setSelectedAddressId}
            onAddAddress={() => setIsAddAddressOpen(true)}
            selectedItems={selectedItems}
            subtotal={summarySubtotal}
            discountAmount={summaryDiscountAmount}
            finalTotal={summaryFinalTotal}
            itemCount={selectedItemCount}
            disabled={
              actionLoading ||
              checkoutLoading ||
              !validSelectedItemIds.length
            }
            checkoutLoading={checkoutLoading}
            onCheckout={handleCheckout}
            selectedCount={selectedItems.length}
          />
        </div>
      </div>

      <AddAddressModal
        open={isAddAddressOpen}
        onClose={() => setIsAddAddressOpen(false)}
      />
    </main>
  );
}
