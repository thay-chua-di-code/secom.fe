export const formatCurrencyVN = (value) => {
  if (value === null || value === undefined || value === "") {
    return "0 ₫";
  }

  // Remove commas if present and cast to number
  const amount = Number(String(value).replace(/,/g, ""));

  if (Number.isNaN(amount)) {
    return "0 ₫";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return "--";

  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


// Func: Text length > 12 => .....
export const truncateText = (text, maxLength = 12) => {
  if (!text) return "";

  return text.length > maxLength
    ? `${text.slice(0, maxLength)}...`
    : text;
};