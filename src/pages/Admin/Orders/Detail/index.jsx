import { X } from "lucide-react";
import { Link } from "react-router-dom";
import "./style.scss";
import OrderProductImage from "../../../../components/order/OrderProductImage";
import {
  getOrderItemId,
  getOrderItemName,
  getOrderItemProductId,
  getOrderItemProductPath,
  getOrderItemQuantity,
  getOrderItems,
  getOrderItemTotalPrice,
} from "../../../../components/order/orderItemAdapter";

export default function OrderDetailModal({ open, onClose, order }) {
  if (!open || !order) return null;

  const formatMoney = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  const items = getOrderItems(order);

  return (
    <div className="order-detail-overlay" onClick={onClose}>
      <div className="order-detail-modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2>Order Details</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
       
          <div className="info-grid">
            <div className="info-card">
              <label>Order ID</label>
              <p className="highlight-blue">{order.id}</p>
            </div>

            <div className="info-card">
              <label>Date</label>
              <p>{new Date(order.createdAtUtc).toLocaleDateString("en-CA")}</p>
             
            </div>

            <div className="info-card">
              <label>Customer</label>
              <p>{order.buyerFullName}</p>
            </div>

            <div className="info-card">
              <label>Payment Method</label>
              <p>{order.paymentMethod || "Credit Card"}</p>
            </div>
          </div>

         
          <div className="info-card full-width">
            <label>Products</label>
            {items.length ? (
              <div className="order-detail-products">
                {items.map((item) => {
                  const itemId = getOrderItemId(item);
                  const productPath = getOrderItemProductPath(item);
                  const productName = getOrderItemName(item);
                  const productImage = (
                    <OrderProductImage item={item} className="order-detail-product__image" alt={productName} />
                  );
                  return (
                    <div className="order-detail-product" key={itemId}>
                      {productPath ? (
                        <Link to={productPath} aria-label={`View product ${productName}`}>
                          {productImage}
                        </Link>
                      ) : (
                        productImage
                      )}
                      <div>
                        {productPath ? (
                          <Link to={productPath} className="order-detail-product__link">
                            <p>{productName}</p>
                          </Link>
                        ) : (
                          <p>{productName}</p>
                        )}
                        <span>Product ID: {getOrderItemProductId(item)}</span>
                        <span>Quantity: {getOrderItemQuantity(item)}</span>
                        <span>Seller: {item.sellerName || item.shopName || "--"}</span>
                      </div>
                      <strong>{formatMoney(getOrderItemTotalPrice(item))}</strong>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>{order.productName || "Missing product data from API"}</p>
            )}
          </div>

         
          <div className="info-card full-width total-row">
            <div>
              <label>Total Amount</label>
              <p className="price-amount">{formatMoney(order.finalTotal)}</p>
            </div>
            <span
              className={`status-badge ${order.status?.toLowerCase() || ""}`}
            >
              {order.status || "Delivered"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
