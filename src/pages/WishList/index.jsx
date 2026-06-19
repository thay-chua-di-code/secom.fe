import WishlistHeader from "./Header/Header";
import Card from "../../components/common/Card/index";
import { mockWishList } from "../../utils/temporary";
import "./style.scss";

export default function WishlistPage() {
  return (
    <div className="wishlist-page">
      <div className="container">
        <WishlistHeader total={wishlistData.length} />

        <div className="wishlist-grid">
          {mockWishList.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
