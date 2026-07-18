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
      {/* =========================
        COVER
    ========================= */}

      <section className="seller-cover">
        <div className="seller-cover__shape seller-cover__shape--one" />
        <div className="seller-cover__shape seller-cover__shape--two" />
        <div className="seller-cover__shape seller-cover__shape--three" />
      </section>

      {/* =========================
        SHOP PROFILE
    ========================= */}

      <main className="seller-container">
        <section className="seller-profile">
          <div className="seller-profile__avatar">
            <img
              src={
                seller?.avatarUrl ||
                "https://i.redd.it/homelander-the-boys-show-vs-vecna-st-v0-kfm3629trbbg1.jpg?width=1200&format=pjpg&auto=webp&s=52d04d9b395f0205c5fb4cdbf7a2063db9c8d9c3"
              }
              alt="Seller avatar"
            />

            <span className="seller-profile__online">
              <span />
              Online
            </span>
          </div>

          <div className="seller-profile__content">
            <div className="seller-profile__heading">
              <div>
                <span className="seller-profile__eyebrow">OFFICIAL SELLER</span>

                <h1>
                  Seller Shop
                  <BadgeCheck size={22} />
                </h1>

                <p>Trusted seller on Secom Marketplace.</p>
              </div>

              <div className="seller-profile__actions">
                <button className="btn-follow">
                  <Users size={17} />
                  Follow
                </button>

                <button className="btn-chat">Chat</button>
              </div>
            </div>

            <div className="seller-profile__meta">
              <span>
                <MapPin size={16} />
                {productDetail?.data?.location || "Vietnam"}
              </span>

              <span>
                <Package size={16} />
                Product Seller
              </span>

              <span>
                <Calendar size={16} />
                Joined recently
              </span>
            </div>
          </div>
        </section>

        {/* =========================
          SHOP STATS
      ========================= */}

        <section className="seller-stats">
          <div className="seller-stat">
            <div className="seller-stat__icon">
              <Package size={19} />
            </div>

            <div>
              <strong>120+</strong>
              <span>Products</span>
            </div>
          </div>

          <div className="seller-stat">
            <div className="seller-stat__icon">
              <Users size={19} />
            </div>

            <div>
              <strong>2.4K</strong>
              <span>Followers</span>
            </div>
          </div>

          <div className="seller-stat">
            <div className="seller-stat__icon">
              <ShoppingBag size={19} />
            </div>

            <div>
              <strong>8.6K</strong>
              <span>Orders</span>
            </div>
          </div>

          <div className="seller-stat">
            <div className="seller-stat__icon">
              <Star size={19} />
            </div>

            <div>
              <strong>4.9</strong>
              <span>Rating</span>
            </div>
          </div>
        </section>

        {/* =========================
          PRODUCTS
      ========================= */}

        <section className="seller-products">
          <div className="seller-products__header">
            <div>
              <span className="seller-products__eyebrow">EXPLORE THE SHOP</span>

              <h2>Products from this shop</h2>
            </div>

            <span className="seller-products__count">
              {sellerProducts.length} Products
            </span>
          </div>

          <div className="product-grid">
            {sellerProducts.map((item) => (
              <div className="product-card" key={item.id}>
                <div className="product-card__image">
                  <img src={item.image} alt={item.name} />

                  <span className="product-card__badge">Official</span>
                </div>

                <div className="product-card__body">
                  <h3>{item.name}</h3>

                  <div className="product-card__bottom">
                    <strong>{formatCurrencyVN(item.price)} ₫</strong>

                    <button>View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
