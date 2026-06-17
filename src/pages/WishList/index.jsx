import WishlistHeader from "./Header/Header";
import WishlistItem from "./Item/index";
import "./style.scss";

const wishlistData = [
  {
    id: 1,
    name: "Apple Watch Series 9 GPS",
    image:
      "https://cdn1.viettelstore.vn/Images/Product/ProductImage/540735783.jpeg",
    price: 10990000,
    oldPrice: 12990000,
    discount: 15,
    stock: true,
  },
  {
    id: 2,
    name: "Seiko Presage Automatic",
    image:
      "https://sudospaces.com/sudo-donghoquanglam/uploads/2024/12/sarj001-large.png.webp",
    price: 8500000,
    oldPrice: 9800000,
    discount: 10,
    stock: true,
  },
];

export default function WishlistPage() {
  return (
    <div className="wishlist-page">
      <div className="container">
        <WishlistHeader total={wishlistData.length} />

        <div className="wishlist-list">
          {wishlistData.map((item) => (
            <WishlistItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
