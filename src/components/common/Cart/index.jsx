import { ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import "./style.scss";

const cartItems = [
  {
    id: 1,
    name: "Đèn Mayin Super Colour 3 Plus",
    price: 966000,
    image:
      "https://product.hstatic.net/1000379792/product/1_6b7e0e1ef7a04c0b9f6f0f13f5d98d5e.jpg",
  },
  {
    id: 2,
    name: "Đèn Led Mayin Super Color",
    price: 833000,
    image:
      "https://product.hstatic.net/1000379792/product/1_6b7e0e1ef7a04c0b9f6f0f13f5d98d5e.jpg",
  },
  {
    id: 3,
    name: "Lọc Trần Trên Bể Cá",
    price: 245000,
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/421/124/products/loc-tran.jpg",
  },
];

export default function Cart({ open }) {
  if (!open) return null;

  const totalItems = cartItems.length;

  return (
    <div className="cart-dropdown">
      {/* HEADER */}
      <div className="cart-dropdown__header">
        <h3>Recently Added Products</h3>
      </div>

      {/* BODY */}
      <div className="cart-dropdown__body">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img
              src={item.image}
              alt={item.name}
              className="cart-item__image"
            />

            <div className="cart-item__content">
              <h4>{item.name}</h4>

              <div className="cart-item__bottom">
                <span className="price ">
                  {item.price.toLocaleString("vi-VN")}đ
                </span>

                <button className="remove-btn">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="cart-dropdown__footer">
        <span>{totalItems} products in cart</span>

        <Link to="/cart" className="view-cart-btn bg-sky-600">
          <ShoppingBag size={18} />
          View Cart
        </Link>
      </div>
    </div>
  );
}
