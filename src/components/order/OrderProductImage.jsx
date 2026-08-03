import { useState } from "react";
import { getOrderItemImageUrl, getOrderItemName } from "./orderItemAdapter";

const PLACEHOLDER_IMAGE = "/favicon.svg";

export default function OrderProductImage({ item, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  const imageUrl = failed ? PLACEHOLDER_IMAGE : getOrderItemImageUrl(item) || PLACEHOLDER_IMAGE;

  return (
    <img
      className={className}
      src={imageUrl}
      alt={alt || getOrderItemName(item)}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ objectFit: "cover" }}
    />
  );
}
