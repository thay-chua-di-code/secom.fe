import { FaTrash } from "react-icons/fa";
import "./style.scss";
import Button from "../../../components/common/Button/Button";

export default function WishlistItem({ item }) {
  return (
    <div className="wishlist-item">
      <div className="item-left">
        <img src={item.image} alt={item.name} />

        <div className="product-info">
          <h3>{item.name}</h3>

          <div className="stock">
            {item.stock ? "Is stock" : "Out of order"}
          </div>
        </div>
      </div>

      <div className="item-right">
        <div className="price">
          <span className="old-price">{item.oldPrice.toLocaleString()}đ</span>

          <span className="new-price">{item.price.toLocaleString()}đ</span>
        </div>

        <Button className="add-cart">Add to cart</Button>

        <Button className="remove-btn">
          <FaTrash />
        </Button>
      </div>
    </div>
  );
}
