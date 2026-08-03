export const getOrderItemImageUrl = (item = {}) =>
  item.productImageUrl ||
  item.productThumbnailUrl ||
  item.productImage ||
  item.imageUrl ||
  item.thumbnailUrl ||
  item.image ||
  item.product?.productImageUrl ||
  item.product?.imageUrl ||
  item.product?.thumbnailUrl ||
  item.product?.primaryImageUrl ||
  item.product?.images?.find?.((image) => image?.isPrimary)?.imageUrl ||
  item.product?.images?.[0]?.imageUrl ||
  "";

export const getOrderItems = (order = {}) => {
  const items =
    order.orderItems ||
    order.items ||
    order.orderDetails ||
    order.products ||
    order.order?.items ||
    order.order?.orderItems ||
    [];
  return Array.isArray(items) ? items : [];
};

export const getOrderItemName = (item = {}) =>
  item.productName ||
  item.name ||
  item.product?.productName ||
  item.product?.name ||
  item.productTitle ||
  item.title ||
  item.productId ||
  "Unknown product";

export const getOrderItemId = (item = {}) =>
  item.orderItemId || item.id || item.productId || item.product?.id || getOrderItemName(item);

export const getOrderItemProductId = (item = {}) =>
  item.productId || item.product?.productId || item.product?.id || "--";

export const getOrderItemProductSlug = (item = {}) =>
  item.productSlug || item.slug || item.product?.slug || "";

export const getOrderItemProductPath = (item = {}) => {
  const productId = getOrderItemProductId(item);
  const productSlug = getOrderItemProductSlug(item);
  const productKey = productSlug || (productId !== "--" ? productId : "");

  return productKey ? `/product-detail/${productKey}` : "";
};

export const getOrderItemQuantity = (item = {}) =>
  Number(item.quantity ?? item.purchasedQuantity ?? item.qty ?? 0);

export const getOrderItemUnitPrice = (item = {}) =>
  Number(item.unitPrice ?? item.price ?? item.product?.price ?? 0);

export const getOrderItemTotalPrice = (item = {}) => {
  const total = item.totalPrice ?? item.subtotal ?? item.totalAmount;
  return Number(total ?? getOrderItemUnitPrice(item) * getOrderItemQuantity(item));
};
