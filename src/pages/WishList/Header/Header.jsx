import "./style.scss";

export default function WishlistHeader({ total }) {
  console.log(total);
  return (
    <div className="wishlist-header">
      <h2>Favorite Products</h2>

      <div className="wishlist-count">
        {total > 1 ? `${total} items` : `${total} item`}
      </div>
    </div>
  );
}
