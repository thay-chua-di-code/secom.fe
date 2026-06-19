import { FaTrash } from "react-icons/fa";
import Button from "../Button/Button";
import { Link, useLocation } from "react-router-dom";
import "./style.scss";

export default function Card({ item }) {
  const { pathname } = useLocation();
  return (
    <Link to={`/product-detail/${item.id}`} className="wishlist-item">
      {pathname === "/wishlist" && (
        <button
          className="remove-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <FaTrash />
        </button>
      )}

      <div className="image-box">
        <img src={item.images[0]} alt={item.name} />
      </div>

      <div className="product-info">
        <h3>{item.name}</h3>

        <div className="price">
          <span className="new-price">{item.price.toLocaleString()}đ</span>

          <span className="old-price">
            {item.oldPrice ? item.oldPrice.toLocaleString() : ""}đ
          </span>
        </div>

        <div className="stock">{item.stock ? "In Stock" : "Out Of Stock"}</div>
      </div>

      <Button className="add-cart">Add To Cart</Button>
    </Link>
  );
}
