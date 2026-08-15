export const formatCurrencyVN = (value) => {
  if (value === null || value === undefined || value === "") {
    return "0 VND";
  }

  const amount = Number(String(value).replace(/,/g, ""));

  if (Number.isNaN(amount)) {
    return "0 VND";
  }

  return `${amount.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })} VND`;
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

export const formatViewedTime = (dateValue) => {
  if (!dateValue) return "Viewed recently";

  const viewedTime = new Date(dateValue).getTime();

  if (Number.isNaN(viewedTime)) {
    return "Viewed recently";
  }

  const diffMs = Math.max(Date.now() - viewedTime, 0);
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "Viewed just now";
  if (diffMinutes < 60) return `Viewed ${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `Viewed ${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `Viewed ${diffDays}d ago`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 5) return `Viewed ${diffWeeks}w ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `Viewed ${diffMonths}mo ago`;

  const diffYears = Math.floor(diffDays / 365);
  return `Viewed ${diffYears}y ago`;
};

// Func: Text length > 12 => .....
export const truncateText = (text, maxLength = 12) => {
  if (!text) return "";

  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
