import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "./endPoint";

const getField = (source, keys, fallback) => {
  if (!source || typeof source !== "object") return fallback;

  for (const key of keys) {
    if (source[key] !== undefined && source[key] !== null) return source[key];
  }

  return fallback;
};

const unwrapResponseData = (response) => {
  const payload = response?.data ?? response;

  return payload?.data ?? payload?.Data ?? payload?.result ?? payload?.Result ?? payload;
};

const normalizeArray = (value) => (Array.isArray(value) ? value : []);

const normalizeStringArray = (value) =>
  normalizeArray(value)
    .map((item) => (typeof item === "string" ? item : item?.text || item?.Text || item?.value || item?.Value || ""))
    .filter(Boolean);

const normalizeNumber = (value, fallback = null) => {
  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
};

const mapDifferentAttributeValue = (value) => ({
  productId: String(getField(value, ["productId", "ProductId", "id", "Id"], "")),
  value: getField(value, ["value", "Value"], null),
});

const mapSameAttribute = (attribute) => ({
  attribute: getField(attribute, ["attribute", "Attribute", "name", "Name"], ""),
  value: getField(attribute, ["value", "Value"], null),
  productIds: normalizeStringArray(getField(attribute, ["productIds", "ProductIds"], [])),
});

const mapDifferentAttribute = (attribute) => ({
  attribute: getField(attribute, ["attribute", "Attribute", "name", "Name"], ""),
  values: normalizeArray(getField(attribute, ["values", "Values"], [])).map(
    mapDifferentAttributeValue,
  ),
});

const mapMissingAttribute = (attribute) => ({
  attribute: getField(attribute, ["attribute", "Attribute", "name", "Name"], ""),
  availableInProductIds: normalizeStringArray(
    getField(attribute, ["availableInProductIds", "AvailableInProductIds"], []),
  ),
  missingInProductIds: normalizeStringArray(
    getField(attribute, ["missingInProductIds", "MissingInProductIds"], []),
  ),
});

const mapUniqueContent = (item) => ({
  productId: String(getField(item, ["productId", "ProductId", "id", "Id"], "")),
  contents: normalizeStringArray(getField(item, ["contents", "Contents", "items", "Items"], [])),
});

const mapComparisonProduct = (product) => ({
  productId: String(getField(product, ["productId", "ProductId", "id", "Id"], "")),
  name: getField(product, ["name", "Name", "productName", "ProductName"], "Unknown product"),
  description: getField(product, ["description", "Description"], null),
  normalizedDescription: getField(
    product,
    ["normalizedDescription", "NormalizedDescription"],
    null,
  ),
  imageUrl: getField(product, ["imageUrl", "ImageUrl", "primaryImageUrl", "PrimaryImageUrl"], null),
  price: normalizeNumber(getField(product, ["price", "Price"], null)),
  categoryName: getField(product, ["categoryName", "CategoryName", "category", "Category"], null),
  condition: getField(product, ["condition", "Condition"], null),
  extractedAttributes: getField(
    product,
    ["extractedAttributes", "ExtractedAttributes"],
    {},
  ) || {},
  warnings: normalizeStringArray(getField(product, ["warnings", "Warnings"], [])),
});

const mapCriterionValue = (value) => ({
  productId: String(getField(value, ["productId", "ProductId", "id", "Id"], "")),
  value: getField(value, ["value", "Value", "text", "Text"], "No information"),
});

const mapCriterion = (criterion) => ({
  name: getField(criterion, ["name", "Name", "criterion", "Criterion", "attribute", "Attribute"], "Criterion"),
  status: getField(criterion, ["status", "Status"], ""),
  insight: getField(criterion, ["insight", "Insight"], ""),
  betterProductIds: normalizeStringArray(
    getField(criterion, ["betterProductIds", "BetterProductIds"], []),
  ),
  values: normalizeArray(getField(criterion, ["values", "Values"], [])).map(mapCriterionValue),
});

const mapRecommendation = (recommendation) => ({
  useCase: getField(recommendation, ["useCase", "UseCase", "title", "Title"], "Recommendation"),
  productId: String(getField(recommendation, ["productId", "ProductId", "id", "Id"], "")),
  reason: getField(recommendation, ["reason", "Reason", "description", "Description"], ""),
});

const mapInsightGroup = (group) => ({
  productId: String(getField(group, ["productId", "ProductId", "id", "Id"], "")),
  items: normalizeStringArray(getField(group, ["items", "Items", "contents", "Contents"], [])),
});

export const mapCompareProductDescriptionsResponse = (response) => {
  const data = unwrapResponseData(response) || {};
  const comparison = getField(data, ["comparison", "Comparison", "comparisonResult", "ComparisonResult"], {}) || {};

  return {
    products: normalizeArray(getField(data, ["products", "Products"], [])).map(
      mapComparisonProduct,
    ),
    comparison: {
      summary: getField(comparison, ["summary", "Summary"], ""),
      criteria: normalizeArray(getField(comparison, ["criteria", "Criteria"], [])).map(
        mapCriterion,
      ),
      similarities: normalizeStringArray(
        getField(comparison, ["similarities", "Similarities"], []),
      ),
      differences: normalizeStringArray(
        getField(comparison, ["differences", "Differences"], []),
      ),
      recommendations: normalizeArray(
        getField(comparison, ["recommendations", "Recommendations"], []),
      ).map(mapRecommendation),
      advantagesByProduct: normalizeArray(
        getField(comparison, ["advantagesByProduct", "AdvantagesByProduct"], []),
      ).map(mapInsightGroup),
      disadvantagesByProduct: normalizeArray(
        getField(comparison, ["disadvantagesByProduct", "DisadvantagesByProduct"], []),
      ).map(mapInsightGroup),
      bestForByProduct: normalizeArray(
        getField(comparison, ["bestForByProduct", "BestForByProduct"], []),
      ).map(mapInsightGroup),
      disclaimer: getField(comparison, ["disclaimer", "Disclaimer"], ""),
      similarityScore: getField(
        comparison,
        ["similarityScore", "SimilarityScore"],
        null,
      ),
      sameAttributes: normalizeArray(
        getField(comparison, ["sameAttributes", "SameAttributes"], []),
      ).map(mapSameAttribute),
      differentAttributes: normalizeArray(
        getField(comparison, ["differentAttributes", "DifferentAttributes"], []),
      ).map(mapDifferentAttribute),
      missingAttributes: normalizeArray(
        getField(comparison, ["missingAttributes", "MissingAttributes"], []),
      ).map(mapMissingAttribute),
      commonContent: normalizeStringArray(
        getField(comparison, ["commonContent", "CommonContent"], []),
      ),
      uniqueContentByProduct: normalizeArray(
        getField(
          comparison,
          ["uniqueContentByProduct", "UniqueContentByProduct"],
          [],
        ),
      ).map(mapUniqueContent),
    },
  };
};

export const productComparisonApi = {
  compareProductDescriptions: async ({ productIds }) => {
    const uniqueProductIds = Array.from(new Set((productIds || []).filter(Boolean)));
    const response = await axiosClient.post(
      API_ENDPOINTS.PRODUCT.COMPARE_DESCRIPTIONS,
      { productIds: uniqueProductIds },
    );

    return mapCompareProductDescriptionsResponse(response);
  },
};
