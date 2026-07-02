import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Clock3, RefreshCw, RotateCcw, XCircle } from "lucide-react";
import { orderApi } from "../../api/orderApi";
import { paymentApi } from "../../api/paymentApi";
import { formatCurrencyVN } from "../../utils/fncUtils";
import "./style.scss";

const unwrapOrder = (response) => {
  return response?.data?.order || response?.data || response?.order || response;
};

const normalizeStatus = (status) => String(status || "").toLowerCase();

const getPaymentInfo = (order) => {
  return (
    order?.paymentTransaction ||
    order?.payment ||
    order?.paymentInfo ||
    order?.transaction ||
    {}
  );
};

const unwrapPayment = (response) => {
  return response?.data?.data || response?.data || response?.paymentTransaction || response;
};

const getOrderItems = (order) => {
  return order?.items || order?.orderItems || order?.products || [];
};

const getOrderAmount = (order) => {
  return order?.finalTotal ?? order?.finalTotalAmount ?? order?.total ?? 0;
};

export default function PaymentReturn() {
  const [searchParams] = useSearchParams();
  const queryOrderId = searchParams.get("orderId") || searchParams.get("order_id");
  const chargeId = searchParams.get("charge_id");
  const queryStatus = searchParams.get("status");
  const savedOrderId = localStorage.getItem("lastOrderId");
  const orderId = queryOrderId || savedOrderId;
  const pollCountRef = useRef(0);

  const [order, setOrder] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(Boolean(orderId));
  const [error, setError] = useState("");

  const fetchOrder = useCallback(async () => {
    if (!orderId) {
      setError("Không tìm thấy mã đơn hàng để kiểm tra thanh toán.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [orderResponse, paymentResponse] = await Promise.allSettled([
        orderApi.getOrderDetail(orderId),
        paymentApi.getPaymentTransactionByOrderId(orderId),
      ]);

      if (orderResponse.status !== "fulfilled") {
        throw orderResponse.reason;
      }

      const latestOrder = unwrapOrder(orderResponse.value);
      setOrder(latestOrder);
      setPayment(
        paymentResponse.status === "fulfilled"
          ? unwrapPayment(paymentResponse.value)
          : getPaymentInfo(latestOrder),
      );
      setError("");
    } catch (fetchError) {
      setError(
        fetchError?.response?.data?.message ||
          fetchError?.message ||
          "Không thể lấy trạng thái đơn hàng.",
      );
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchOrder, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchOrder]);

  const paymentInfo = payment || getPaymentInfo(order);
  const paymentStatus = paymentInfo?.status || order?.paymentStatus || queryStatus;
  const orderStatus = order?.status;

  const result = useMemo(() => {
    const normalizedOrderStatus = normalizeStatus(orderStatus);
    const normalizedPaymentStatus = normalizeStatus(paymentStatus);

    if (
      normalizedOrderStatus === "paid" ||
      normalizedOrderStatus === "completed" ||
      normalizedPaymentStatus === "paid" ||
      normalizedPaymentStatus === "successful" ||
      normalizedPaymentStatus === "success" ||
      normalizedPaymentStatus === "completed"
    ) {
      return {
        type: "success",
        icon: <CheckCircle size={64} />,
        title: "Thanh toán thành công",
        message: "Đơn hàng của bạn đã được ghi nhận.",
      };
    }

    if (normalizedPaymentStatus === "failed" || normalizedPaymentStatus === "fail") {
      return {
        type: "failed",
        icon: <XCircle size={64} />,
        title: "Thanh toán thất bại",
        message: "Giao dịch không thành công. Vui lòng thử lại.",
      };
    }

    if (normalizedPaymentStatus === "refunded") {
      return {
        type: "refunded",
        icon: <RotateCcw size={64} />,
        title: "Đơn hàng đã được hoàn tiền.",
        message: "Giao dịch của bạn đã được hoàn tiền.",
      };
    }

    return {
      type: "pending",
      icon: <Clock3 size={64} />,
      title: "Thanh toán đang được xử lý",
      message: "Chúng tôi đang xác nhận giao dịch.",
    };
  }, [orderStatus, paymentStatus]);

  useEffect(() => {
    if (result.type === "success") {
      localStorage.removeItem("lastOrderId");
      return undefined;
    }

    if (result.type !== "pending" || !orderId) {
      return undefined;
    }

    pollCountRef.current = 0;

    const intervalId = window.setInterval(() => {
      pollCountRef.current += 1;

      if (pollCountRef.current > 12) {
        window.clearInterval(intervalId);
        return;
      }

      fetchOrder();
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [fetchOrder, orderId, result.type]);

  const orderItems = getOrderItems(order);
  const paymentId =
    paymentInfo?.id || paymentInfo?.paymentId || paymentInfo?.transactionId || chargeId || "--";
  const gatewayTransactionId =
    paymentInfo?.gatewayTransactionId || paymentInfo?.chargeId || chargeId || "--";

  if (!orderId) {
    return (
      <main className="payment-return">
        <section className="payment-return__card payment-return__card--failed">
          <XCircle size={64} />
          <h1>Không tìm thấy đơn hàng</h1>
          <p>Không thể xác định đơn hàng cần kiểm tra thanh toán.</p>
          <Link to="/order-self" className="payment-return__button">
            Quay về đơn hàng
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="payment-return">
      <section className={`payment-return__card payment-return__card--${result.type}`}>
        <div className="payment-return__icon">{result.icon}</div>
        <h1>{result.title}</h1>
        <p>{result.message}</p>

        {loading && <p className="payment-return__muted">Đang cập nhật trạng thái...</p>}
        {error && <p className="payment-return__error">{error}</p>}

        <div className="payment-return__actions">
          {result.type === "pending" && (
            <button type="button" onClick={fetchOrder} disabled={loading}>
              <RefreshCw size={16} />
              Làm mới
            </button>
          )}

          {result.type === "failed" && (
            <Link to={`/order-self?orderId=${orderId}`}>Thanh toán lại</Link>
          )}

          <Link to={`/order-self?orderId=${orderId}`}>Xem chi tiết đơn hàng</Link>
          <Link to="/products" className="payment-return__secondary">
            Tiếp tục mua sắm
          </Link>
        </div>
      </section>

      {order && (
        <section className="payment-return__details">
          <div className="payment-return__section">
            <h2>Thông tin đơn hàng</h2>
            <dl>
              <div>
                <dt>Order ID</dt>
                <dd>{order.orderId || order.id || orderId}</dd>
              </div>
              <div>
                <dt>Payment ID</dt>
                <dd>{paymentId}</dd>
              </div>
              <div>
                <dt>Tổng tiền</dt>
                <dd>{formatCurrencyVN(getOrderAmount(order))}</dd>
              </div>
              <div>
                <dt>Trạng thái đơn hàng</dt>
                <dd>{orderStatus || "--"}</dd>
              </div>
              <div>
                <dt>Trạng thái thanh toán</dt>
                <dd>{paymentStatus || "--"}</dd>
              </div>
              <div>
                <dt>Thời gian tạo</dt>
                <dd>
                  {order.createdAtUtc || order.createdAt
                    ? new Date(order.createdAtUtc || order.createdAt).toLocaleString()
                    : "--"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="payment-return__section">
            <h2>Order Summary</h2>
            <div className="payment-return__items">
              {orderItems.length === 0 && <p>Không có sản phẩm.</p>}
              {orderItems.map((item) => {
                const quantity = item.quantity || 0;
                const unitPrice = item.unitPrice || item.price || 0;
                const lineTotal = item.subtotal || unitPrice * quantity;

                return (
                  <div className="payment-return__item" key={item.id || item.orderItemId || item.productId}>
                    <div>
                      <strong>{item.productName || item.name || "Sản phẩm"}</strong>
                      <span>Số lượng: {quantity}</span>
                    </div>
                    <div>
                      <span>Đơn giá: {formatCurrencyVN(unitPrice)}</span>
                      <strong>{formatCurrencyVN(lineTotal)}</strong>
                    </div>
                  </div>
                );
              })}
            </div>

            <dl>
              <div>
                <dt>Voucher</dt>
                <dd>{order.voucherCode || "--"}</dd>
              </div>
              <div>
                <dt>Shipping Fee</dt>
                <dd>{formatCurrencyVN(order.shippingFee || 0)}</dd>
              </div>
              <div>
                <dt>Discount</dt>
                <dd>{formatCurrencyVN(order.discountAmount || 0)}</dd>
              </div>
              <div>
                <dt>Final Total</dt>
                <dd>{formatCurrencyVN(getOrderAmount(order))}</dd>
              </div>
            </dl>
          </div>

          <div className="payment-return__section">
            <h2>Payment Info</h2>
            <dl>
              <div>
                <dt>Gateway</dt>
                <dd>{paymentInfo?.gateway || "Omise"}</dd>
              </div>
              <div>
                <dt>Gateway Transaction ID</dt>
                <dd>{gatewayTransactionId}</dd>
              </div>
              <div>
                <dt>Payment Status</dt>
                <dd>{paymentStatus || "--"}</dd>
              </div>
            </dl>
          </div>
        </section>
      )}
    </main>
  );
}
