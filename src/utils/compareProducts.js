const COMPARE_STORAGE_KEY = "secom_compare_products";
const MAX_COMPARE_PRODUCTS = 4;

export const getCompareProductIds = () => {
  try {
    const rawValue = window.localStorage.getItem(COMPARE_STORAGE_KEY);
    const parsedValue = JSON.parse(rawValue || "[]");
    return Array.isArray(parsedValue) ? parsedValue.filter(Boolean) : [];
  } catch {
    return [];
  }
};

export const saveCompareProductIds = (productIds) => {
  const normalizedIds = Array.from(new Set(productIds.filter(Boolean))).slice(
    0,
    MAX_COMPARE_PRODUCTS,
  );
  window.localStorage.setItem(
    COMPARE_STORAGE_KEY,
    JSON.stringify(normalizedIds),
  );
  window.dispatchEvent(new Event("compare-products-change"));
  return normalizedIds;
};

export const addCompareProductId = (productId) => {
  const currentIds = getCompareProductIds();

  if (currentIds.includes(productId)) {
    return currentIds;
  }

  if (currentIds.length >= MAX_COMPARE_PRODUCTS) {
    throw new Error(`You can compare up to ${MAX_COMPARE_PRODUCTS} products`);
  }

  return saveCompareProductIds([...currentIds, productId]);
};

export const removeCompareProductId = (productId) => {
  return saveCompareProductIds(
    getCompareProductIds().filter((item) => String(item) !== String(productId)),
  );
};

export { MAX_COMPARE_PRODUCTS };
