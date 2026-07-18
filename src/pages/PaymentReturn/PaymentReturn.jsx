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
        title: "Đang xác minh thanh toán",
        message:
          "Hệ thống đang kiểm tra giao dịch và cập nhật trạng thái đơn hàng. Vui lòng không đóng trang.",
      };
    case "success":
      return {
        className: "success",
        icon: <CheckCircle size={64} />,
        title: "Thanh toán thành công",
        message: "Đơn hàng của bạn đã được cập nhật thành công.",
      };
    case "pending":
      return {
        className: "pending",
        icon: <Clock3 size={64} />,
        title: "Thanh toán đang được xử lý",
        message:
          "Hệ thống chưa nhận được xác nhận cuối cùng từ cổng thanh toán. Bạn có thể chờ thêm hoặc kiểm tra lại trong danh sách đơn hàng.",
      };
    case "cancelled":
      return {
        className: "failed",
        icon: <RotateCcw size={64} />,
        title: "Thanh toán đã bị hủy",
        message: "Giao dịch chưa được hoàn tất. Đơn hàng chưa được đánh dấu đã thanh toán.",
      };
    case "failed":
      return {
        className: "failed",
        icon: <XCircle size={64} />,
        title: "Thanh toán không thành công",
        message: "Cổng thanh toán không xác nhận giao dịch thành công.",
      };
    case "not_found":
      return {
        className: "failed",
        icon: <AlertTriangle size={64} />,
        title: "Không tìm thấy giao dịch",
        message:
          "Không thể xác định giao dịch từ thông tin PayOS trả về hoặc giao dịch không thuộc tài khoản hiện tại.",
      };
    case "unauthorized":
      return {
        className: "failed",
        icon: <LogIn size={64} />,
        title: "Phiên đăng nhập đã hết hạn",
        message: "Vui lòng đăng nhập lại để kiểm tra trạng thái thanh toán.",
      };
    case "error":
    default:
      return {
        className: "failed",
        icon: <XCircle size={64} />,
        title: "Không thể xác minh thanh toán",
        message:
          "Đã xảy ra lỗi khi kết nối với hệ thống. Trạng thái đơn hàng chưa được xác nhận.",
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
          message: "Không tìm thấy mã giao dịch thanh toán.",
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
          message: "Không tìm thấy mã giao dịch thanh toán.",
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
      setMessage("Vui lòng đăng nhập lại để kiểm tra thanh toán.");
      return;
    }

    if (status === 403) {
      setUiState("unauthorized");
      setMessage("Tài khoản không có quyền kiểm tra giao dịch này.");
      return;
    }

    if (status === 404) {
      setUiState("not_found");
      setMessage(
        error?.response?.data?.message ||
          error?.response?.data?.data?.message ||
          "Không tìm thấy giao dịch tương ứng.",
      );
      return;
    }

    setUiState("error");
    setMessage(
      error?.response?.data?.message ||
        error?.response?.data?.data?.message ||
        "Không thể xác minh trạng thái thanh toán.",
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
          <p className="payment-return__muted">Đang kiểm tra lần {retryCount}/{RETRY_DELAYS.length}...</p>
        )}

        <div className="payment-return__actions">
          {(uiState === "pending" || uiState === "error") && (
            <button type="button" onClick={handleRetry} disabled={manualChecking}>
              <RefreshCw size={16} />
              {manualChecking ? "Đang kiểm tra..." : "Kiểm tra lại"}
            </button>
          )}

          {uiState === "success" && canOpenOrder && (
            <button type="button" onClick={handleOpenOrder}>
              Xem chi tiết đơn hàng
            </button>
          )}

          {uiState === "success" && !canOpenOrder && (
            <Link to="/order-self">Xem danh sách đơn hàng</Link>
          )}

          {uiState === "pending" && <Link to="/order-self">Xem danh sách đơn hàng</Link>}

          {uiState === "cancelled" && (
            <>
              {canOpenOrder && <button type="button" onClick={handleOpenOrder}>Xem đơn hàng</button>}
              <Link to="/cart">Về giỏ hàng</Link>
            </>
          )}

          {uiState === "failed" && (
            <>
              {canOpenOrder && <button type="button" onClick={handleOpenOrder}>Xem đơn hàng</button>}
              <Link to="/order-self">Xem danh sách đơn hàng</Link>
            </>
          )}

          {uiState === "not_found" && <Link to="/order-self">Xem danh sách đơn hàng</Link>}

          {uiState === "unauthorized" && (
            <Link to={`/login?returnUrl=${encodeURIComponent(window.location.pathname + window.location.search)}`}>
              Đăng nhập
            </Link>
          )}

          {uiState === "error" && <Link to="/order-self">Xem đơn hàng</Link>}

          {uiState !== "unauthorized" && (
            <Link to="/products" className="payment-return__secondary">
              Tiếp tục mua sắm
            </Link>
          )}

          {(uiState === "pending" || uiState === "not_found" || uiState === "error") && (
            <Link to="/" className="payment-return__secondary">
              Về trang chủ
            </Link>
          )}
        </div>
      </section>

      {paymentData && (
        <section className="payment-return__details">
          <div className="payment-return__section">
            <h2>Thông tin xác minh</h2>
            <dl>
              <div>
                <dt>Mã giao dịch PayOS</dt>
                <dd>{paymentData.orderCode || orderCode || "--"}</dd>
              </div>
              <div>
                <dt>Order ID</dt>
                <dd>{paymentData.orderId || "--"}</dd>
              </div>
              <div>
                <dt>Trạng thái thanh toán</dt>
                <dd>{paymentData.paymentStatus || "--"}</dd>
              </div>
              <div>
                <dt>Trạng thái đơn hàng</dt>
                <dd>{paymentData.orderStatus || "--"}</dd>
              </div>
              <div>
                <dt>Thời gian thanh toán</dt>
                <dd>
                  {paymentData.paidAtUtc || paymentData.paidAt
                    ? new Date(paymentData.paidAtUtc || paymentData.paidAt).toLocaleString("vi-VN")
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
