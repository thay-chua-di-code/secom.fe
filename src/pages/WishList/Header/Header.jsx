import "./style.scss";

export default function WishlistHeader({ total }) {
  console.log(total);
  return (
    <div className="wishlist-header">
      <p>
        Wishlist <span>{total}</span>
      </p>
    </div>
  );
}
