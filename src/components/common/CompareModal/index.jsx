import { X, Trash2 } from "lucide-react";
import "./style.scss";
import { formatCurrencyVN } from "../../../utils/fncUtils";

const ATTRIBUTES = [
  {
    key: "image",
    label: "Image",
  },
  {
    key: "name",
    label: "Product Name",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "categoryName",
    label: "Category",
  },
  {
    key: "condition",
    label: "Condition",
  },
  {
    key: "location",
    label: "Location",
  },
  {
    key: "viewCount",
    label: "Views",
  },
  {
    key: "createdAtUtc",
    label: "Created",
  },
];

const CompareModal = ({
  open,
  products = [],
  onClose,
  onRemove,
  onClear,
  onAddProduct,
}) => {
  console.log(products);
  if (!open) return null;
  const formatPrice = (price) => {
    if (!price) return "--";

    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
  };

  const getBestPrice = () => {
    const prices = products.map((item) => item.price).filter(Boolean);

    if (!prices.length) return null;

    return Math.min(...prices);
  };

  const bestPrice = getBestPrice();

  const renderValue = (product, key) => {
    switch (key) {
      case "image":
        return (
          <img
            className="product-image"
            src={product?.primaryImageUrl}
            alt={product?.name}
          />
        );

      case "price":
        return (
          <span
            className={product.price === bestPrice ? "best-price" : "price"}
          >
            {product.price === bestPrice && "🔥 "}

            {formatCurrencyVN(product.price)}
          </span>
        );

      case "condition":
        return (
          <span className={`condition ${product.condition}`}>
            {product.condition === "new" ? "New" : product.condition}
          </span>
        );

      case "viewCount":
        return <span className="views">👁 {product.viewCount || 0}</span>;

      case "createdAtUtc":
        return new Date(product.createdAtUtc).toLocaleDateString("en-US");

      default:
        return product[key] || "--";
    }
  };

  return (
    <div className="compare-overlay">
      <div className="compare-modal">
        {/* HEADER */}

        <div className="compare-header">
          <div>
            <h2>Compare Products</h2>

            <p>Compare your favorite products side by side</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}

        <div className="compare-wrapper">
          <div className="attribute-column">
            {ATTRIBUTES.map((item) => (
              <div key={item.key} className="attribute-item">
                {item.label}
              </div>
            ))}
          </div>

          {products.map((product) => (
            <div className="product-column" key={product.id}>
              <button
                className="remove-btn"
                onClick={() => onRemove(product.id)}
              >
                <X size={15} />
              </button>

              {ATTRIBUTES.map((item) => (
                <div key={item.key} className="product-item">
                  {renderValue(product, item.key)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
