import {
  BadgeCheck,
  MapPin,
  Calendar,
  Users,
  Star,
  Package,
  Clock3,
  ShoppingBag,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { mockSellerReviews } from "../../utils/temporary";
import "./style.scss";

export default function SellerDetail() {
  const { id } = useParams();

  const sellerDetail = mockSellerReviews.find(
    (item) => item.sellerId === Number(id),
  );

  if (!sellerDetail) {
    return (
      <div className="seller-not-found">
        <h2>Seller not found.</h2>
      </div>
    );
  }

  return (
    <div className="seller-detail">
      {/* Banner */}

      <section
        className="seller-banner"
        style={{
          backgroundImage: `url(${sellerDetail.banner})`,
        }}
      >
        <div className="overlay"></div>

        <div className="seller-info">
          <img
            src={sellerDetail.avatar}
            alt={sellerDetail.name}
            className="avatar"
          />

          <div className="content">
            <h2>
              {sellerDetail.name}
              <BadgeCheck size={22} />
            </h2>

            <p>{sellerDetail.description}</p>

            <div className="meta">
              <span>
                <Calendar size={16} />
                Joined {sellerDetail.joinDate}
              </span>

              <span>
                <MapPin size={16} />
                {sellerDetail.location}
              </span>
            </div>

            <div className="actions">
              <button>Follow</button>
              <button className="outline">Chat</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}

      <section className="seller-stats">
        <div className="item">
          <Package />
          <strong>{sellerDetail.totalProducts}</strong>
          <span>Products</span>
        </div>

        <div className="item">
          <Users />
          <strong>{sellerDetail.followers}</strong>
          <span>Followers</span>
        </div>

        <div className="item">
          <ShoppingBag />
          <strong>{sellerDetail.totalOrders}</strong>
          <span>Orders</span>
        </div>

        <div className="item">
          <Star />
          <strong>{sellerDetail.rating}</strong>
          <span>Rating</span>
        </div>
      </section>

      {/* About */}

      <section className="seller-body">
        <div className="seller-about card">
          <h3>About Shop</h3>

          <p>{sellerDetail.about}</p>
        </div>

        <div className="seller-performance card">
          <h3>Shop Performance</h3>

          <div className="performance-item">
            <Clock3 size={18} />
            <span>Response Time</span>
            <strong>{sellerDetail.responseTime}</strong>
          </div>

          <div className="performance-item">
            <Users size={18} />
            <span>Response Rate</span>
            <strong>{sellerDetail.responseRate}</strong>
          </div>

          <div className="performance-item">
            <Package size={18} />
            <span>Following</span>
            <strong>{sellerDetail.following}</strong>
          </div>
        </div>
      </section>

      {/* Reviews */}

      <section className="seller-review">
        <div className="review-header">
          <h3>Customer Reviews</h3>

          <div className="overall">⭐ {sellerDetail.rating}/5</div>
        </div>

        {sellerDetail.reviews.map((review) => (
          <div className="review-item" key={review.id}>
            <img src={review.avatar} alt="" />

            <div className="review-content">
              <div className="top">
                <strong>{review.user}</strong>

                <span>{review.date}</span>
              </div>

              <div className="rating">{"⭐".repeat(review.rating)}</div>

              <ul>
                {review.comments.map((c, index) => (
                  <li key={index}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
