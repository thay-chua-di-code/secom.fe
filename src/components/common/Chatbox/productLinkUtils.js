const PRODUCT_DETAIL_PREFIX = "/product-detail/";
const UUID_PATTERN = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
export const UUID_GLOBAL_PATTERN = /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g;

export const normalizeProductDetailUrl = (href) => {
  if (!href || typeof href !== "string") return null;

  try {
    const currentOrigin = window.location?.origin;
    let pathname = href;

    if (/^https?:\/\//i.test(href)) {
      const url = new URL(href);
      const isLocalhostProduct =
        url.hostname === "localhost" &&
        url.port === "5173" &&
        url.pathname.startsWith(PRODUCT_DETAIL_PREFIX);
      const isCurrentOriginProduct =
        currentOrigin &&
        url.origin === currentOrigin &&
        url.pathname.startsWith(PRODUCT_DETAIL_PREFIX);

      if (!isLocalhostProduct && !isCurrentOriginProduct) return null;
      pathname = url.pathname;
    }

    if (!pathname.startsWith(PRODUCT_DETAIL_PREFIX)) return null;

    const productId = pathname.slice(PRODUCT_DETAIL_PREFIX.length).split("/")[0];
    if (!UUID_PATTERN.test(productId)) return null;

    return `${PRODUCT_DETAIL_PREFIX}${productId}`;
  } catch {
    return null;
  }
};

export const extractProductIdsFromContent = (content) => {
  if (!content) return [];
  return [...new Set(content.match(UUID_GLOBAL_PATTERN) ?? [])];
};
