import "./style.scss";
import { formatCurrencyVN } from "../../../utils/fncUtils";
export default function CartList({
  items,
  selectedItemIds,
  onSelectItem,
  onSelectAll,
  allSelected,
  headerCheckboxRef,
}) {
  return (
    <div className="cart-list">
      <div className="cart-list__header">
        <label>
          {" "}
          <input
            ref={headerCheckboxRef}
            type="checkbox"
            checked={allSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
          />{" "}
          Select All{" "}
        </label>{" "}
      </div>
      <div className="cart-list__body">
        {" "}
        {items.map((item) => (
          <div className="cart-item" key={item.cartItemId}>
            {" "}
            <input
              type="checkbox"
              checked={selectedItemIds.includes(item.cartItemId)}
              onChange={(e) => onSelectItem(item.cartItemId, e.target.checked)}
            />{" "}
            <div className="cart-item__content">
              {" "}
              <h3>{item.productName}</h3> <span> Qty: {item.quantity} </span>{" "}
              <div className="cart-item__price">
                {" "}
                {formatCurrencyVN(item.subtotal || 0)}{" "}
              </div>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
}
