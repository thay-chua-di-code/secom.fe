import {
  BadgeCheck,
  MapPin,
  Calendar,
  Users,
  Star,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";
import { getSellerStatistics } from "../../api/sellerStatisticsApi";
import { formatCurrencyVN } from "../../utils/fncUtils";
import { chatService } from "../../service/chatService";
import sellerFollowApi from "../../api/sellerFollowApi";
import sellerRatingApi, {
  normalizeSellerRatings,
  normalizeSellerRatingSummary,
} from "../../api/sellerRatingApi";
import productApi from "../../api/productApi";

function formatCompactNumber(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0";
  }

  if (numericValue >= 1000000) {
    const formatted = numericValue / 1000000;

    return `${formatted % 1 === 0 ? formatted.toFixed(0) : formatted.toFixed(1)}M`;
  }

  if (numericValue >= 1000) {
    const formatted = numericValue / 1000;

    return `${formatted % 1 === 0 ? formatted.toFixed(0) : formatted.toFixed(1)}K`;
  }

  return numericValue.toString();
}

function formatRating(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0.0";
  }

  return numericValue.toFixed(1);
}

const unwrapProductItems = (payload) => {
  const data = payload?.data ?? payload ?? {};
  const items = Array.isArray(data)
    ? data
    : Array.isArray(data.items)
      ? data.items
      : Array.isArray(data.data)
        ? data.data
        : [];

  return items;
};

const getProductId = (product) => product?.id || product?.productId;

const getProductName = (product) =>
  product?.name || product?.productName || "Unnamed product";

const getProductImageUrl = (product) =>
  product?.imageUrl ||
  product?.thumbnailUrl ||
  product?.primaryImageUrl ||
  product?.image ||
  product?.images?.find?.((image) => image?.isPrimary)?.imageUrl ||
  product?.images?.[0]?.imageUrl ||
  "/favicon.svg";

const getProductSellerId = (product) =>
  product?.sellerId || product?.shopId || product?.seller?.id || product?.seller?.sellerId;

export default function SellerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [statistics, setStatistics] = useState(null);
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(false);
  const [statisticsError, setStatisticsError] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followStatusLoading, setFollowStatusLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [ratingSummary, setRatingSummary] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [ratingsLoading, setRatingsLoading] = useState(false);
  const [ratingForm, setRatingForm] = useState({
    orderId: "",
    rating: 5,
    comment: "",
  });
  const [ratingSubmitting, setRatingSubmitting] = useState(false);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [sellerProductsLoading, setSellerProductsLoading] = useState(false);
  const [sellerProductsError, setSellerProductsError] = useState("");
  const productDetail = useSelector((state) => state.products.productDetail);
  const seller = productDetail?.seller;

  useEffect(() => {
    if (!id) {
      return undefined;
    }

    const controller = new AbortController();
    let isMounted = true;

    const loadStatistics = async () => {
      try {
        setIsLoadingStatistics(true);
        setStatisticsError(null);

        const result = await getSellerStatistics(id, controller.signal);

        if (isMounted) {
          setStatistics(result);
        }
      } catch (error) {
        if (isMounted && error.name !== "CanceledError") {
          console.error("Seller statistics error:", error);
          setStatisticsError(
            error?.response?.data?.message ||
              error?.message ||
              "Unable to load seller statistics.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingStatistics(false);
        }
      }
    };

    loadStatistics();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const loadSellerProducts = async () => {
      try {
        setSellerProductsLoading(true);
        setSellerProductsError("");

        const response = await productApi.searchProducts({
          SellerId: id,
          Page: 1,
          PageSize: 12,
        });
        const items = unwrapProductItems(response);
        const filteredItems = items.filter((product) => {
          const productSellerId = getProductSellerId(product);
          return !productSellerId || String(productSellerId) === String(id);
        });

        if (isMounted) {
          setSellerProducts(filteredItems);
        }
      } catch (error) {
        if (isMounted) {
          setSellerProducts([]);
          setSellerProductsError(
            error?.response?.data?.message ||
              error?.message ||
              "Unable to load shop products.",
          );
        }
      } finally {
        if (isMounted) {
          setSellerProductsLoading(false);
        }
      }
    };

    loadSellerProducts();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const hasStatisticsError = Boolean(statisticsError || !id);
  const isOwnSeller =
    id &&
    (String(userInfo?.sellerId) === String(id) ||
      String(userInfo?.userId) === String(id) ||
      String(userInfo?.id) === String(id));
  const productsValue =
    isLoadingStatistics || hasStatisticsError
      ? "--"
      : formatCompactNumber(statistics?.totalProducts ?? 0);
  const followersValue =
    isLoadingStatistics || hasStatisticsError
      ? "--"
      : formatCompactNumber(statistics?.totalFollowers ?? 0);
  const ordersValue =
    isLoadingStatistics || hasStatisticsError
      ? "--"
      : formatCompactNumber(statistics?.totalOrders ?? 0);
  const ratingValue =
    isLoadingStatistics || hasStatisticsError
      ? "--"
      : formatRating(ratingSummary?.averageRating ?? statistics?.averageRating ?? 0);

  const loadSellerRatings = useCallback(async () => {
    if (!id) return;

    try {
      setRatingsLoading(true);
      const [summaryResponse, ratingsResponse] = await Promise.all([
        sellerRatingApi.getSummary(id),
        sellerRatingApi.getRatings(id),
      ]);

      setRatingSummary(normalizeSellerRatingSummary(summaryResponse));
      setRatings(normalizeSellerRatings(ratingsResponse).items);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Cannot load seller ratings");
    } finally {
      setRatingsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadSellerRatings, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadSellerRatings]);

  const handleChatWithSeller = async () => {
    if (!id) {
      toast.error("Seller not found");
      return;
    }

    if (!isAuthenticated) {
      navigate(
        `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`,
      );
      return;
    }

    try {
      setChatLoading(true);
      const thread = await chatService.createChatThread({ sellerId: id });
      const chatId = thread?.chatId || thread?.id;

      if (!chatId) {
        throw new Error("Chat thread response does not contain chatId");
      }

      window.dispatchEvent(
        new CustomEvent("secom:open-chat", {
          detail: {
            chatId,
            sellerId: thread.sellerId || id,
            sellerName: thread.sellerName || "Seller Shop",
            sellerAvatarUrl: thread.sellerAvatarUrl,
          },
        }),
      );
    } catch (error) {
      toast.error(error.message || "Cannot open chat");
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    if (!id || !isAuthenticated) return undefined;

    let isMounted = true;

    const loadFollowStatus = async () => {
      try {
        setFollowStatusLoading(true);
        const status = await sellerFollowApi.getSellerFollowStatus(id);

        if (isMounted) {
          setIsFollowing(Boolean(status?.isFollowing));
        }
      } catch (error) {
        console.error("Seller follow status error:", error);
      } finally {
        if (isMounted) {
          setFollowStatusLoading(false);
        }
      }
    };

    loadFollowStatus();

    const handleFollowChanged = (event) => {
      if (String(event.detail?.sellerId) !== String(id)) return;

      setIsFollowing(Boolean(event.detail?.isFollowing));
      setStatistics((currentStatistics) => {
        if (!currentStatistics) return currentStatistics;

        return {
          ...currentStatistics,
          totalFollowers: Number.isFinite(event.detail?.totalFollowers)
            ? event.detail.totalFollowers
            : event.detail?.isFollowing
              ? (currentStatistics.totalFollowers ?? 0) + 1
              : Math.max(0, (currentStatistics.totalFollowers ?? 0) - 1),
        };
      });
    };

    window.addEventListener("secom:seller-follow-changed", handleFollowChanged);

    return () => {
      isMounted = false;
      window.removeEventListener(
        "secom:seller-follow-changed",
        handleFollowChanged,
      );
    };
  }, [id, isAuthenticated]);

  const handleToggleFollow = async () => {
    if (!id || followLoading || followStatusLoading || isOwnSeller) return;

    if (!isAuthenticated) {
      navigate(
        `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`,
      );
      return;
    }

    const nextFollowing = !isFollowing;

    try {
      setFollowLoading(true);

      const result = nextFollowing
        ? await sellerFollowApi.followSeller(id)
        : await sellerFollowApi.unfollowSeller(id);

      const confirmedFollowing = result?.isFollowing ?? nextFollowing;
      let nextFollowerCount = statistics?.totalFollowers ?? 0;

      setIsFollowing(confirmedFollowing);
      setStatistics((currentStatistics) => {
        if (!currentStatistics) return currentStatistics;

        nextFollowerCount = confirmedFollowing
          ? (currentStatistics.totalFollowers ?? 0) + 1
          : Math.max(0, (currentStatistics.totalFollowers ?? 0) - 1);

        return {
          ...currentStatistics,
          totalFollowers: nextFollowerCount,
        };
      });

      window.dispatchEvent(
        new CustomEvent("secom:seller-follow-changed", {
          detail: {
            sellerId: id,
            isFollowing: confirmedFollowing,
            totalFollowers: nextFollowerCount,
          },
        }),
      );

      toast.success(
        confirmedFollowing ? "Followed shop" : "Unfollowed shop",
      );
    } catch (error) {
      toast.error(error.message || "Cannot update follow status");
    } finally {
      setFollowLoading(false);
    }
  };

  const handleSubmitSellerRating = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      navigate(
        `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`,
      );
      return;
    }

    if (isOwnSeller) {
      toast.error("You cannot rate your own shop");
      return;
    }

    if (!ratingForm.orderId.trim()) {
      toast.error("Order ID is required to rate seller");
      return;
    }

    try {
      setRatingSubmitting(true);
      await sellerRatingApi.createRating(id, {
        orderId: ratingForm.orderId.trim(),
        rating: Number(ratingForm.rating),
        comment: ratingForm.comment.trim() || null,
      });
      toast.success("Seller rating submitted");
      setRatingForm({ orderId: "", rating: 5, comment: "" });
      await loadSellerRatings();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Cannot rate seller");
    } finally {
      setRatingSubmitting(false);
    }
  };

  // if (!seller) {
  //   return (
  //     <div className="seller-not-found">
  //       <h2>Seller not found.</h2>
  //     </div>
  //   );
  // }

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
                "https://static.vecteezy.com/system/resources/thumbnails/050/907/528/small_2x/3d-rendered-cartoon-boy-wearing-a-blue-hoodie-png.png"
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
                  {seller.fullName}
                  <BadgeCheck size={22} />
                </h1>

                <p>Trusted seller on Secom Marketplace.</p>
              </div>

              <div className="seller-profile__actions">
                <button
                  className="btn-follow"
                  onClick={handleToggleFollow}
                  disabled={followLoading || followStatusLoading || isOwnSeller}
                >
                  <Users size={17} />
                  {followLoading
                    ? "Processing..."
                    : followStatusLoading
                      ? "Loading..."
                      : isFollowing
                        ? "Following"
                        : "Follow"}
                </button>

                <button
                  className="btn-chat"
                  onClick={handleChatWithSeller}
                  disabled={chatLoading}
                >
                  {chatLoading ? "Opening..." : "Chat"}
                </button>
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
              <strong>{productsValue}</strong>
              <span>Products</span>
            </div>
          </div>

          <div className="seller-stat">
            <div className="seller-stat__icon">
              <Users size={19} />
            </div>

            <div>
              <strong>{followersValue}</strong>
              <span>Followers</span>
            </div>
          </div>

          <div className="seller-stat">
            <div className="seller-stat__icon">
              <ShoppingBag size={19} />
            </div>

            <div>
              <strong>{ordersValue}</strong>
              <span>Orders</span>
            </div>
          </div>

          <div className="seller-stat">
            <div className="seller-stat__icon">
              <Star size={19} />
            </div>

            <div>
              <strong>{ratingValue}</strong>
              <span>Rating</span>
            </div>
          </div>
        </section>

        <section className="seller-ratings">
          <div className="seller-ratings__header">
            <div>
              <span className="seller-products__eyebrow">SHOP RATING</span>
              <h2>Seller Ratings</h2>
              <p>
                Average {formatRating(ratingSummary?.averageRating ?? 0)} from {ratingSummary?.totalRatings ?? ratings.length} ratings
              </p>
            </div>
            <button type="button" onClick={loadSellerRatings} disabled={ratingsLoading}>
              {ratingsLoading ? "Loading..." : "Refresh"}
            </button>
          </div>

          <div className="seller-ratings__grid">
            <form className="seller-rating-form" onSubmit={handleSubmitSellerRating}>
              <h3>Rate this seller</h3>
              <input
                value={ratingForm.orderId}
                placeholder="Completed order ID"
                onChange={(event) => setRatingForm((prev) => ({ ...prev, orderId: event.target.value }))}
              />
              <div className="seller-rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={star <= ratingForm.rating ? "active" : ""}
                    onClick={() => setRatingForm((prev) => ({ ...prev, rating: star }))}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                value={ratingForm.comment}
                placeholder="Share your seller experience"
                onChange={(event) => setRatingForm((prev) => ({ ...prev, comment: event.target.value }))}
              />
              <button type="submit" disabled={ratingSubmitting || isOwnSeller}>
                {ratingSubmitting ? "Submitting..." : "Submit rating"}
              </button>
            </form>

            <div className="seller-rating-list">
              {ratingsLoading ? (
                <p>Loading ratings...</p>
              ) : ratings.length === 0 ? (
                <p>No seller ratings yet.</p>
              ) : (
                ratings.map((item) => (
                  <article key={item.id}>
                    <div>
                      <strong>{item.buyerName || "Anonymous buyer"}</strong>
                      <span>{"★".repeat(Number(item.rating || 0))}</span>
                    </div>
                    <p>{item.comment || "No comment."}</p>
                    <small>{item.createdAtUtc ? new Date(item.createdAtUtc).toLocaleString("en-US") : "--"}</small>
                  </article>
                ))
              )}
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

          {sellerProductsLoading ? (
            <div className="seller-products__state">Loading shop products...</div>
          ) : sellerProductsError ? (
            <div className="seller-products__state seller-products__state--error">
              {sellerProductsError}
            </div>
          ) : sellerProducts.length === 0 ? (
            <div className="seller-products__state">No products from this shop yet.</div>
          ) : (
            <div className="product-grid">
              {sellerProducts.map((item) => {
                const productId = getProductId(item);
                const productName = getProductName(item);

                return (
                  <div className="product-card" key={productId || productName}>
                    <button
                      type="button"
                      className="product-card__image"
                      onClick={() => productId && navigate(`/product-detail/${productId}`)}
                      disabled={!productId}
                      aria-label={`View product ${productName}`}
                    >
                      <img src={getProductImageUrl(item)} alt={productName} />

                      <span className="product-card__badge">Official</span>
                    </button>

                    <div className="product-card__body">
                      <h3>{productName}</h3>

                      <div className="product-card__bottom">
                        <strong>{formatCurrencyVN(item.price || item.unitPrice || 0)} ₫</strong>

                        <button
                          type="button"
                          onClick={() => productId && navigate(`/product-detail/${productId}`)}
                          disabled={!productId}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
