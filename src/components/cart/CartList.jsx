import CartItem from "./CartItem";

export default function CartList({ items, disabled, onQuantityChange }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.cartItemId}
          item={item}
          disabled={disabled}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
}
