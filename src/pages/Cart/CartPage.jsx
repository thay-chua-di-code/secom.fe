import { useEffect, useMemo, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartList from "./List/index";
import CartSummary from "./CartSummary/index";
import VoucherList from "./VoucherList/index";
import { fetchCart } from "../../redux/slice/cartSlice";
import { fetchVouchers } from "../../redux/slice/voucherSlice";
import { useCart } from "../../hooks/useCart";
import { paymentApi } from "../../api/paymentApi";
import { orderApi } from "../../api/orderApi";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
  const dispatch = useDispatch();
  const location = useLocation();
  const fetchedRef = useRef(false);
  const navigate = useNavigate();
  const headerCheckboxRef = useRef(null);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [cardInfo, setCardInfo] = useState({
    cardName: "JOHN DOE",
    cardNumber: "4242424242424242",
    expirationMonth: "12",
    expirationYear: "2030",
    securityCode: "123",
  });

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
      setSelectedItemIds([cartItem.cartItemId]);
    }

    navigate(location.pathname, {
      replace: true,
      state: {},
    });
  }, [items, location.state, navigate]);

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
      toast.error("Please select at least one item before applying a voucher.");
      return;
    }

    if (!selectedVoucher) {
      toast.error("Please select a voucher.");
      return;
    }

    applyVoucher(selectedVoucher);
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
      "Không thể tạo đơn hàng. Vui lòng thử lại."
    );
  };

  const getApiErrorMessage = (error) => {
    return (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.response?.data?.errors?.[0] ||
      error?.message ||
      "Không thể tạo giao dịch thanh toán. Vui lòng thử lại."
    );
  };

  const handleCardInfoChange = (field, value) => {
    setCardInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const loadOmiseScript = () => {
    return new Promise((resolve, reject) => {
      if (window.Omise) {
        resolve(window.Omise);
        return;
      }

      const existingScript = document.querySelector(
        'script[src="https://cdn.omise.co/omise.js"]',
      );

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(window.Omise));
        existingScript.addEventListener("error", () => {
          reject(new Error("Cannot load Omise.js"));
        });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.omise.co/omise.js";
      script.async = true;
      script.onload = () => resolve(window.Omise);
      script.onerror = () => reject(new Error("Cannot load Omise.js"));
      document.body.appendChild(script);
    });
  };

  const createOmiseToken = async () => {
    const publicKey = import.meta.env.VITE_OMISE_PUBLIC_KEY;

    if (!publicKey) {
      throw new Error("Missing VITE_OMISE_PUBLIC_KEY");
    }

    const Omise = await loadOmiseScript();

    Omise.setPublicKey(publicKey);

    const cardPayload = {
      name: cardInfo.cardName.trim(),
      number: cardInfo.cardNumber.trim(),
      expiration_month: cardInfo.expirationMonth.trim(),
      expiration_year: cardInfo.expirationYear.trim(),
      security_code: cardInfo.securityCode.trim(),
    };

    return new Promise((resolve, reject) => {
      Omise.createToken("card", cardPayload, (statusCode, response) => {
        if (statusCode === 200 && response?.id) {
          resolve(response);
          return;
        }

        reject(
          new Error(
            response?.message ||
              response?.object ||
              "Không thể tạo token thanh toán.",
          ),
        );
      });
    });
  };

  const handleCheckout = async () => {
    if (!selectedItemIds.length) {
      toast.error("Please select at least one item before checkout.");
      return;
    }

    let createdOrder;
    setCheckoutError("");

    try {
      setCheckoutLoading(true);

      const createOrderResponse = await orderApi.createOrder({
        cartItemIds: selectedItemIds,
        voucherCode: selectedVoucher || voucherCode || null,
      });

      console.log("Create order response:", createOrderResponse);

      createdOrder = getCreatedOrder(createOrderResponse);
    } catch (orderError) {
      toast.error(getCreateOrderErrorMessage(orderError));
      setCheckoutLoading(false);
      return;
    }

    try {
      const orderId = getCreatedOrderId(createdOrder);
      const amount = getCreatedOrderAmount(createdOrder);

      console.log("Created order:", createdOrder);

      if (!orderId) {
        throw new Error("Missing orderId from create order response");
      }

      if (!amount || amount <= 0) {
        throw new Error("Missing finalTotal from create order response");
      }

      const token = await createOmiseToken();

      console.log("Omise token:", token);

      const paymentRequest = {
        orderId,
        amount,
        currency: "vnd",
        returnUri: `${window.location.origin}/payment-return`,
        tokenId: token.id,
      };

      console.log("Payment request:", paymentRequest);

      const paymentResponse =
        await paymentApi.createPaymentTransaction(paymentRequest);

      console.log("Payment response:", paymentResponse);

      const paymentUrl =
        paymentResponse?.data?.data?.paymentUrl ||
        paymentResponse?.data?.paymentUrl ||
        paymentResponse?.paymentUrl;

      if (!paymentUrl) {
        toast.success("Thanh toán thành công.");
        return;
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
            disabled={
              actionLoading || checkoutLoading || !selectedItemIds.length
            }
            checkoutLoading={checkoutLoading}
            onCheckout={handleCheckout}
            selectedCount={selectedItems.length}
            cardInfo={cardInfo}
            onCardInfoChange={handleCardInfoChange}
            allSelected={allSelected}
            partiallySelected={partiallySelected}
            onSelectAll={handleSelectAll}
          />
        </div>
      </div>
    </main>
  );
}
