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
import placeholderAvatar from "../../../assets/icons/logo.jpg";

export default function SellerShow({ seller, shop }) {
  const sellerInfo = seller || shop || {};
  const sellerId = sellerInfo.sellerId || sellerInfo.id;
  const sellerName = sellerInfo.fullName || sellerInfo.name || "Unknown seller";
  const avatarUrl = sellerInfo.avatarUrl || sellerInfo.avatar || placeholderAvatar;
  const rating = sellerInfo.rating ?? "N/A";
  const totalProducts = sellerInfo.totalProducts ?? "N/A";
  const followers = sellerInfo.followers ?? 0;
  const joined = sellerInfo.joined ?? "N/A";

  return (
    <div className="seller-card">
      <div className="seller-top">
        <div className="seller-info">
          <img className="seller-avatar" src={avatarUrl} alt={sellerName} />

          <div>
            <h3>
              {sellerName}

              {sellerInfo.verified && (
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

          <Link to={sellerId ? `/seller/detail/${sellerId}` : "#"} className="shop-btn">
            <Store size={18} />
            View Shop
          </Link>
        </div>
      </div>

      <div className="seller-bottom">
        <div className="item">
          <Star size={18} />
          <span>Rating</span>
          <strong>{rating}</strong>
        </div>

        <div className="item">
          <Package size={18} />
          <span>Products</span>
          <strong>{totalProducts}</strong>
        </div>

        <div className="item">
          <Users size={18} />
          <span>Followers</span>
          <strong>{Number(followers || 0).toLocaleString()}</strong>
        </div>

        <div className="item">
          <Store size={18} />
          <span>Joined</span>
          <strong>{joined}</strong>
        </div>
      </div>
    </div>
  );
}
