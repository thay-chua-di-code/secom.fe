import {
  BadgeCheck,
  MessageCircle,
  Store,
  Star,
  Package,
  Users,
} from "lucide-react";
import Button from "../../../components/common/Button/Button";
import "./style.scss";
import { Link } from "react-router-dom";

export default function SellerShow({ shop }) {
  console.log("Seller Shop: ", shop);
  return (
    <div className="seller-card">
      <div className="seller-top">
        <div className="seller-info">
          <img className="seller-avatar" src={shop.avatar} alt={shop.name} />

          <div>
            <h3>
              {shop.name}

              {shop.verified && (
                <BadgeCheck size={18} color="#0284c7" fill="#0284c7" />
              )}
            </h3>

            <span>🟢 Online 10 minutes ago</span>
          </div>
        </div>

        <div className="seller-actions">
          <Button className="chat-btn">
            <MessageCircle size={18} />
            Chat
          </Button>

          <Link to={`/seller/detail/${shop.id}`} className="shop-btn">
            <Store size={18} />
            View Shop
          </Link>
        </div>
      </div>

      <div className="seller-bottom">
        <div className="item">
          <Star size={18} />
          <span>Rating</span>
          <strong>{shop.rating}</strong>
        </div>

        <div className="item">
          <Package size={18} />
          <span>Products</span>
          <strong>{shop.totalProducts}</strong>
        </div>

        <div className="item">
          <Users size={18} />
          <span>Followers</span>
          <strong>{shop.followers.toLocaleString()}</strong>
        </div>

        <div className="item">
          <Store size={18} />
          <span>Joined</span>
          <strong>{shop.joined}</strong>
        </div>
      </div>
    </div>
  );
}
