const COMPARE_STORAGE_KEY = "secom_compare_products";

const MAX_COMPARE_PRODUCTS = 2;

export const getCompareProductIds = () => {
  try {
    const rawValue = window.localStorage.getItem(COMPARE_STORAGE_KEY);

    const parsed = JSON.parse(rawValue || "[]");

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveCompareProductIds = (ids) => {
  const normalized = Array.from(new Set(ids.map(String).filter(Boolean))).slice(
    0,
    MAX_COMPARE_PRODUCTS,
  );

  localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(normalized));

  window.dispatchEvent(new Event("compare-products-change"));

  return normalized;
};

export const addCompareProductId = (id) => {
  const current = getCompareProductIds();

  if (current.includes(String(id))) {
    return current;
  }

  if (current.length >= MAX_COMPARE_PRODUCTS) {
    throw new Error("You can compare up to 2 products at a time. Remove one before adding another.");
  }

  return saveCompareProductIds([...current, String(id)]);
};

export const removeCompareProductId = (id) => {
  return saveCompareProductIds(
    getCompareProductIds().filter((item) => String(item) !== String(id)),
  );
};

export const clearCompareProducts = () => {
  saveCompareProductIds([]);
};

export const isCompareProduct = (id) => {
  return getCompareProductIds().includes(String(id));
};

export { MAX_COMPARE_PRODUCTS };
