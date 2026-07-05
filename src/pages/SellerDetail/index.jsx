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
import { useSelector } from "react-redux";
import { formatCurrencyVN } from "../../utils/fncUtils";

export default function SellerDetail() {
  const { id } = useParams();
  const productDetail = useSelector((state) => state.products.productDetail);
  const seller = productDetail?.data?.seller;

  // if (!seller) {
  //   return (
  //     <div className="seller-not-found">
  //       <h2>Seller not found.</h2>
  //     </div>
  //   );
  // }

  const sellerProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 25500000,
      image:
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500",
    },
    {
      id: 2,
      name: "MacBook Pro M4",
      price: 45990000,
      image:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=500",
    },
    {
      id: 3,
      name: "AirPods Pro",
      price: 6900000,
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?w=500",
    },
    {
      id: 4,
      name: "iPad Pro M4",
      price: 26990000,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    },
    {
      id: 5,
      name: "Apple Watch Ultra",
      price: 18990000,
      image:
        "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=500",
    },
    {
      id: 6,
      name: "Samsung S26 Ultra",
      price: 31990000,
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
    },
  ];
  return (
    <div className="seller-detail">
      {/* Banner */}

      <section
        className="seller-banner"
        style={{
          background: "linear-gradient(135deg,#0ea5e9,#2563eb)",
        }}
      >
        <div className="overlay"></div>

        <div className="seller-info">
          <img
            src={
              seller?.avatarUrl ||
              "https://i.redd.it/homelander-the-boys-show-vs-vecna-st-v0-kfm3629trbbg1.jpg?width=1200&format=pjpg&auto=webp&s=52d04d9b395f0205c5fb4cdbf7a2063db9c8d9c3"
            }
            alt={"this is my image"}
            className="avatar"
          />

          <div className="content">
            <h2>
              {/* {seller.fullName} */}
              Seller Shop
              <BadgeCheck size={22} />
            </h2>

            <p>Trusted seller on Secom Marketplace.</p>

            <div className="meta">
              <span>
                <MapPin size={16} />
                {productDetail?.data?.location}
              </span>

              <span>
                <Package size={16} />
                Product Seller
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

      {/* <section className="seller-stats">
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
      </section> */}

      {/* About */}

      {/* <section className="seller-body">
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
      </section> */}

      {/* Reviews */}

      {/* <section className="seller-review">
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
      </section> */}

      <section className="seller-products">
        <div className="title">
          <h3>Products from this shop</h3>

          <span>{sellerProducts.length} Products</span>
        </div>

        <div className="product-grid">
          {sellerProducts.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="body">
                <h4>{item.name}</h4>

                <p>{formatCurrencyVN(item.price)} ₫</p>

                <button>View Product</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
