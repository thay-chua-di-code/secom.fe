import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle,
  Clock3,
  LoaderCircle,
  LogIn,
  RefreshCw,
  RotateCcw,
  XCircle,
} from "lucide-react";
import axiosClient from "../../api/axiosClient";
import { paymentApi } from "../../api/paymentApi";
import "./style.scss";

const RETRY_DELAYS = [0, 1000, 2000, 3000];

const sleep = (delay) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, delay);
  });

const unwrapVerifyResponse = (response) => {
  const payload = response?.data ?? response;
  return payload?.data ?? payload;
};

const normalizePaymentStatus = (status) => status?.trim().toLowerCase() ?? "";

const getHttpStatus = (error) => error?.response?.status || error?.status;

const getQueryOrderCode = () => {
  const params = new URLSearchParams(window.location.search);

  return params.get("orderCode");
};

const mapTerminalState = (result) => {
  const paymentStatus = normalizePaymentStatus(result?.paymentStatus);
  const orderStatus = normalizePaymentStatus(result?.orderStatus);

  if (result?.isPaid || paymentStatus === "success" || paymentStatus === "paid") {
    return "success";
  }

  if (result?.isPending) {
    return "pending";
  }

  if (
    paymentStatus === "cancelled" ||
    paymentStatus === "canceled" ||
    orderStatus === "cancelled" ||
    orderStatus === "canceled"
  ) {
    return "cancelled";
  }

  if (paymentStatus === "pending" || orderStatus === "pending") {
    return "pending";
  }

  if (paymentStatus === "refunded" || orderStatus === "refunded") {
    return "failed";
  }

  return "failed";
};

const getResultConfig = (state) => {
  switch (state) {
    case "verifying":
      return {
        className: "pending",
        icon: <LoaderCircle className="payment-return__spinner" size={64} />,
        title: "Verifying payment",
        message:
          "The system is checking the transaction and updating the order status. Please do not close this page.",
      };
    case "success":
      return {
        className: "success",
        icon: <CheckCircle size={64} />,
        title: "Payment successful",
        message: "Your order has been updated successfully.",
      };
    case "pending":
      return {
        className: "pending",
        icon: <Clock3 size={64} />,
        title: "Payment is processing",
        message:
          "The system has not received the final confirmation from the payment gateway. You can wait a bit longer or check again in your order list.",
      };
    case "cancelled":
      return {
        className: "failed",
        icon: <RotateCcw size={64} />,
        title: "Payment cancelled",
        message: "The transaction was not completed. The order has not been marked as paid.",
      };
    case "failed":
      return {
        className: "failed",
        icon: <XCircle size={64} />,
        title: "Payment failed",
        message: "The payment gateway did not confirm a successful transaction.",
      };
    case "not_found":
      return {
        className: "failed",
        icon: <AlertTriangle size={64} />,
        title: "Transaction not found",
        message:
          "Unable to identify the transaction from the PayOS response, or the transaction does not belong to the current account.",
      };
    case "unauthorized":
      return {
        className: "failed",
        icon: <LogIn size={64} />,
        title: "Your session has expired",
        message: "Please sign in again to check the payment status.",
      };
    case "error":
    default:
      return {
        className: "failed",
        icon: <XCircle size={64} />,
        title: "Unable to verify payment",
        message:
          "An error occurred while connecting to the system. The order status has not been confirmed.",
      };
  }
};

export default function PaymentReturn() {
  const navigate = useNavigate();
  const hasStartedRef = useRef(false);
  const isMountedRef = useRef(true);
  const [uiState, setUiState] = useState("verifying");
  const [paymentData, setPaymentData] = useState(null);
  const [message, setMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [manualChecking, setManualChecking] = useState(false);
  const orderCode = useMemo(() => getQueryOrderCode(), []);

  const applyVerifyResult = useCallback((result, mappedState) => {
    if (!isMountedRef.current) {
      return;
    }

    setPaymentData(result || null);
    setMessage(result?.message || "");
    setUiState(mappedState);

    if (mappedState === "success") {
      localStorage.removeItem("lastOrderId");
    }
  }, []);

  const verifyOnce = useCallback(async () => {
    if (!orderCode) {
      return {
        state: "not_found",
        result: {
          message: "Payment transaction code not found.",
        },
      };
    }

    if (import.meta.env.DEV) {
      console.info("Verifying PayOS payment", {
        orderCode,
        baseURL: axiosClient.defaults.baseURL,
        endpoint: "/payments/payos/verify",
      });
    }

    const response = await paymentApi.verifyPayOSPayment(orderCode);
    const result = unwrapVerifyResponse(response);

    return {
      state: mapTerminalState(result),
      result,
    };
  }, [orderCode]);

  const verifyWithRetry = useCallback(async () => {
    if (!orderCode) {
      return {
        state: "not_found",
        result: {
          message: "Payment transaction code not found.",
        },
      };
    }

    let lastResult = null;

    for (let attempt = 0; attempt < RETRY_DELAYS.length; attempt += 1) {
      if (RETRY_DELAYS[attempt] > 0) {
        await sleep(RETRY_DELAYS[attempt]);
      }

      if (!isMountedRef.current) {
        return { state: "verifying", result: lastResult };
      }

      setRetryCount(attempt + 1);

      if (import.meta.env.DEV) {
        console.info("Verifying PayOS payment", {
          orderCode,
          baseURL: axiosClient.defaults.baseURL,
          endpoint: "/payments/payos/verify",
        });
      }

      const response = await paymentApi.verifyPayOSPayment(orderCode);
      const result = unwrapVerifyResponse(response);
      const mappedState = mapTerminalState(result);

      if (mappedState === "success") {
        return { state: "success", result };
      }

      lastResult = result;

      if (mappedState !== "pending") {
        return { state: mappedState, result };
      }
    }

    return {
      state: "pending",
      result: lastResult,
    };
  }, [orderCode]);

  const handleVerifyError = useCallback((error) => {
    const status = getHttpStatus(error);

    if (status === 401) {
      setUiState("unauthorized");
      setMessage("Please log in again to check payment.");
      return;
    }

    if (status === 403) {
      setUiState("unauthorized");
      setMessage("This account does not have permission to check this transaction.");
      return;
    }

    if (status === 404) {
      setUiState("not_found");
      setMessage(
        error?.response?.data?.message ||
          error?.response?.data?.data?.message ||
          "No matching transaction found.",
      );
      return;
    }

    setUiState("error");
    setMessage(
      error?.response?.data?.message ||
        error?.response?.data?.data?.message ||
        "Unable to verify payment status.",
    );
  }, []);

  const runVerification = useCallback(
    async ({ withRetry = true, manual = false } = {}) => {
      try {
        if (manual) {
          setManualChecking(true);
        }

        setUiState("verifying");
        setMessage("");

        const { state, result } = withRetry
          ? await verifyWithRetry()
          : await verifyOnce();

        applyVerifyResult(result, state);
      } catch (error) {
        if (isMountedRef.current) {
          handleVerifyError(error);
        }
      } finally {
        if (isMountedRef.current && manual) {
          setManualChecking(false);
        }
      }
    },
    [applyVerifyResult, handleVerifyError, verifyOnce, verifyWithRetry],
  );

  useEffect(() => {
    isMountedRef.current = true;

    if (hasStartedRef.current) {
      return undefined;
    }

    hasStartedRef.current = true;
    runVerification({ withRetry: true });

    return () => {
      isMountedRef.current = false;
    };
  }, [runVerification]);

  const resultConfig = getResultConfig(uiState);
  const orderId = paymentData?.orderId || null;
  const canOpenOrder = Boolean(orderId);

  const handleOpenOrder = () => {
    if (orderId) {
      navigate(`/order-self?orderId=${orderId}`);
    }
  };

  const handleRetry = () => {
    runVerification({ withRetry: true, manual: true });
  };

  return (
    <main className="payment-return">
      <section className={`payment-return__card payment-return__card--${resultConfig.className}`}>
        <div className="payment-return__icon">{resultConfig.icon}</div>
        <h1>{resultConfig.title}</h1>
        <p>{resultConfig.message}</p>

        {message && <p className="payment-return__muted">{message}</p>}
        {uiState === "verifying" && retryCount > 0 && (
          <p className="payment-return__muted">Checking attempt {retryCount}/{RETRY_DELAYS.length}...</p>
        )}

        <div className="payment-return__actions">
          {(uiState === "pending" || uiState === "error") && (
            <button type="button" onClick={handleRetry} disabled={manualChecking}>
              <RefreshCw size={16} />
              {manualChecking ? "Checking..." : "Check again"}
            </button>
          )}

          {uiState === "success" && canOpenOrder && (
            <button type="button" onClick={handleOpenOrder}>
              View order details
            </button>
          )}

          {uiState === "success" && !canOpenOrder && (
            <Link to="/order-self">View order list</Link>
          )}

          {uiState === "pending" && <Link to="/order-self">View order list</Link>}

          {uiState === "cancelled" && (
            <>
              {canOpenOrder && <button type="button" onClick={handleOpenOrder}>View order</button>}
              <Link to="/cart">Back to cart</Link>
            </>
          )}

          {uiState === "failed" && (
            <>
              {canOpenOrder && <button type="button" onClick={handleOpenOrder}>View order</button>}
              <Link to="/order-self">View order list</Link>
            </>
          )}

          {uiState === "not_found" && <Link to="/order-self">View order list</Link>}

          {uiState === "unauthorized" && (
            <Link to={`/login?returnUrl=${encodeURIComponent(window.location.pathname + window.location.search)}`}>
              Log in
            </Link>
          )}

          {uiState === "error" && <Link to="/order-self">View order</Link>}

          {uiState !== "unauthorized" && (
            <Link to="/products" className="payment-return__secondary">
              Continue shopping
            </Link>
          )}

          {(uiState === "pending" || uiState === "not_found" || uiState === "error") && (
            <Link to="/" className="payment-return__secondary">
              Back to home
            </Link>
          )}
        </div>
      </section>

      {paymentData && (
        <section className="payment-return__details">
          <div className="payment-return__section">
            <h2>Verification information</h2>
            <dl>
              <div>
                <dt>PayOS transaction code</dt>
                <dd>{paymentData.orderCode || orderCode || "--"}</dd>
              </div>
              <div>
                <dt>Order ID</dt>
                <dd>{paymentData.orderId || "--"}</dd>
              </div>
              <div>
                <dt>Payment status</dt>
                <dd>{paymentData.paymentStatus || "--"}</dd>
              </div>
              <div>
                <dt>Order status</dt>
                <dd>{paymentData.orderStatus || "--"}</dd>
              </div>
              <div>
                <dt>Payment time</dt>
                <dd>
                  {paymentData.paidAtUtc || paymentData.paidAt
                    ? new Date(paymentData.paidAtUtc || paymentData.paidAt).toLocaleString("en-US")
                    : "--"}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      )}
    </main>
  );
}
