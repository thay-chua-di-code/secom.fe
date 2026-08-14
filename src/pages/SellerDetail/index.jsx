import {
  BadgeCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Package,
  ShoppingBag,
  Star,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getSellerStatistics } from "../../api/sellerStatisticsApi";
import sellerFollowApi from "../../api/sellerFollowApi";
import sellerRatingApi, {
  normalizeSellerRatings,
  normalizeSellerRatingSummary,
} from "../../api/sellerRatingApi";
import { chatService } from "../../service/chatService";
import { dicoveryService } from "../../service/dicoveryService";
import { sellerService } from "../../service/sellerService";
import { formatCurrencyVN } from "../../utils/fncUtils";

import "./style.scss";

const PRODUCTS_PAGE_SIZE = 12;

function formatCompactNumber(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) return "0";
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
  if (!Number.isFinite(numericValue)) return "0.0";
  return numericValue.toFixed(1);
}

function formatJoinedDate(value) {
  if (!value) return "Joined recently";

  try {
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Joined recently";
  }
}

function getApiErrorMessage(error, fallback) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}

function getProductId(product) {
  return product?.id || product?.productId;
}

function getProductName(product) {
  return product?.name || product?.productName || "Unnamed product";
}

function getProductImageUrl(product) {
  return (
    product?.imageUrl ||
    product?.thumbnailUrl ||
    product?.primaryImageUrl ||
    product?.image ||
    product?.images?.find?.((image) => image?.isPrimary)?.imageUrl ||
    product?.images?.[0]?.imageUrl ||
    "/favicon.svg"
  );
}

export default function SellerDetail() {
  const { id: sellerId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialOrderId = searchParams.get("orderId")?.trim() || "";
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userInfo = useSelector((state) => state.user.userInfo);

  const [shopProfile, setShopProfile] = useState(null);
  const [shopLoading, setShopLoading] = useState(false);
  const [shopError, setShopError] = useState("");

  const [statistics, setStatistics] = useState(null);
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(false);
  const [statisticsError, setStatisticsError] = useState("");

  const [chatLoading, setChatLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followStatusLoading, setFollowStatusLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const [ratingSummary, setRatingSummary] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [ratingsLoading, setRatingsLoading] = useState(false);
  const [ratingForm, setRatingForm] = useState({
    orderId: initialOrderId,
    rating: 5,
    comment: "",
  });
  const [ratingSubmitting, setRatingSubmitting] = useState(false);

  const [sellerProductsState, setSellerProductsState] = useState({
    items: [],
    totalCount: 0,
    totalPages: 0,
    pageNumber: 1,
    pageSize: PRODUCTS_PAGE_SIZE,
  });
  const [sellerProductsLoading, setSellerProductsLoading] = useState(false);
  const [sellerProductsError, setSellerProductsError] = useState("");
  const [sellerProductsPage, setSellerProductsPage] = useState(1);

  const isOwnSeller =
    sellerId &&
    (String(userInfo?.sellerId) === String(sellerId) ||
      String(userInfo?.userId) === String(sellerId) ||
      String(userInfo?.id) === String(sellerId));

  const sellerDisplayName =
    shopProfile?.shopName || shopProfile?.sellerName || "Seller Shop";
  const sellerSubtitle =
    shopProfile?.description?.trim() || "Trusted seller on AIDR Marketplace.";
  const sellerAvatar =
    shopProfile?.avatarUrl ||
    "https://static.vecteezy.com/system/resources/thumbnails/050/907/528/small_2x/3d-rendered-cartoon-boy-wearing-a-blue-hoodie-png.png";
  const sellerAddress = shopProfile?.address?.trim() || "Vietnam";
  const joinedAt = shopProfile?.approvedAtUtc || shopProfile?.submittedAtUtc;

  useEffect(() => {
    if (!sellerId) return;

    let isMounted = true;

    const loadShopProfile = async () => {
      try {
        setShopLoading(true);
        setShopError("");

        const result = await sellerService.getPublicSellerShopProfile(sellerId);

        if (isMounted) {
          setShopProfile(result || null);
        }
      } catch (error) {
        if (!isMounted) return;

        setShopProfile(null);
        setShopError(getApiErrorMessage(error, "Shop not found."));
      } finally {
        if (isMounted) {
          setShopLoading(false);
        }
      }
    };

    loadShopProfile();

    return () => {
      isMounted = false;
    };
  }, [sellerId]);

  useEffect(() => {
    if (!sellerId) return undefined;

    const controller = new AbortController();
    let isMounted = true;

    const loadStatistics = async () => {
      try {
        setIsLoadingStatistics(true);
        setStatisticsError("");

        const result = await getSellerStatistics(sellerId, controller.signal);

        if (isMounted) {
          setStatistics(result);
        }
      } catch (error) {
        if (isMounted && error.name !== "CanceledError") {
          setStatisticsError(
            getApiErrorMessage(error, "Unable to load seller statistics."),
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
  }, [sellerId]);

  useEffect(() => {
    if (!shopProfile?.id) return;

    let isMounted = true;

    const loadSellerProducts = async () => {
      try {
        setSellerProductsLoading(true);
        setSellerProductsError("");

        const response = await dicoveryService.getSellerShopProducts(shopProfile.id, {
          page: sellerProductsPage,
          pageSize: PRODUCTS_PAGE_SIZE,
          sort: "newest",
        });

        if (!isMounted) return;

        setSellerProductsState({
          items: Array.isArray(response.items) ? response.items : [],
          totalCount: Number(response.totalCount || 0),
          totalPages: Number(response.totalPages || 0),
          pageNumber: Number(response.pageNumber || sellerProductsPage),
          pageSize: Number(response.pageSize || PRODUCTS_PAGE_SIZE),
        });
      } catch (error) {
        if (!isMounted) return;

        setSellerProductsState({
          items: [],
          totalCount: 0,
          totalPages: 0,
          pageNumber: sellerProductsPage,
          pageSize: PRODUCTS_PAGE_SIZE,
        });
        setSellerProductsError(
          error?.response?.status === 404
            ? "Unable to load products from this shop."
            : getApiErrorMessage(error, "Unable to load products from this shop."),
        );
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
  }, [shopProfile?.id, sellerProductsPage]);

  const loadSellerRatings = useCallback(async () => {
    if (!sellerId) return;

    try {
      setRatingsLoading(true);
      const [summaryResponse, ratingsResponse] = await Promise.all([
        sellerRatingApi.getSummary(sellerId),
        sellerRatingApi.getRatings(sellerId),
      ]);

      setRatingSummary(normalizeSellerRatingSummary(summaryResponse));
      setRatings(normalizeSellerRatings(ratingsResponse).items);
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Cannot load seller ratings"),
      );
    } finally {
      setRatingsLoading(false);
    }
  }, [sellerId]);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadSellerRatings, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadSellerRatings]);

  useEffect(() => {
    if (!sellerId || !isAuthenticated) return undefined;

    let isMounted = true;

    const loadFollowStatus = async () => {
      try {
        setFollowStatusLoading(true);
        const status = await sellerFollowApi.getSellerFollowStatus(sellerId);

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
      if (String(event.detail?.sellerId) !== String(sellerId)) return;

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
      window.removeEventListener("secom:seller-follow-changed", handleFollowChanged);
    };
  }, [sellerId, isAuthenticated]);

  const handleChatWithSeller = async () => {
    if (!sellerId) {
      toast.error("Seller not found");
      return;
    }

    if (!isAuthenticated) {
      navigate(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    try {
      setChatLoading(true);
      const thread = await chatService.createChatThread({ sellerId });
      const chatId = thread?.chatId || thread?.id;

      if (!chatId) {
        throw new Error("Chat thread response does not contain chatId");
      }

      window.dispatchEvent(
        new CustomEvent("secom:open-chat", {
          detail: {
            chatId,
            sellerId: thread.sellerId || sellerId,
            shopName: thread.shopName || shopProfile?.shopName,
            sellerName:
              thread.shopName ||
              thread.sellerName ||
              shopProfile?.shopName ||
              shopProfile?.sellerName ||
              "Seller",
            sellerAvatarUrl: thread.sellerAvatarUrl || shopProfile?.avatarUrl,
          },
        }),
      );
    } catch (error) {
      toast.error(error.message || "Cannot open chat");
    } finally {
      setChatLoading(false);
    }
  };

  const handleToggleFollow = async () => {
    if (!sellerId || followLoading || followStatusLoading || isOwnSeller) return;

    if (!isAuthenticated) {
      navigate(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    const nextFollowing = !isFollowing;

    try {
      setFollowLoading(true);

      const result = nextFollowing
        ? await sellerFollowApi.followSeller(sellerId)
        : await sellerFollowApi.unfollowSeller(sellerId);

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
            sellerId,
            isFollowing: confirmedFollowing,
            totalFollowers: nextFollowerCount,
          },
        }),
      );

      toast.success(confirmedFollowing ? "Followed shop" : "Unfollowed shop");
    } catch (error) {
      toast.error(error.message || "Cannot update follow status");
    } finally {
      setFollowLoading(false);
    }
  };

  const handleSubmitSellerRating = async (event) => {
    event.preventDefault();

    if (!sellerId) {
      toast.error("Seller not found");
      return;
    }

    if (isOwnSeller) {
      toast.error("You cannot rate your own shop.");
      return;
    }

    if (!isAuthenticated) {
      navigate(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (!ratingForm.orderId.trim()) {
      toast.error("Completed order ID is required.");
      return;
    }

    try {
      setRatingSubmitting(true);
      await sellerRatingApi.createRating(sellerId, {
        orderId: ratingForm.orderId.trim(),
        rating: Number(ratingForm.rating),
        comment: ratingForm.comment.trim() || null,
      });

      toast.success("Seller rating submitted");
      setRatingForm({ orderId: initialOrderId, rating: 5, comment: "" });
      await loadSellerRatings();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Cannot rate seller"));
    } finally {
      setRatingSubmitting(false);
    }
  };

  const handleSellerProductsPageChange = (nextPage) => {
    if (
      nextPage < 1 ||
      nextPage > Math.max(sellerProductsState.totalPages, 1) ||
      nextPage === sellerProductsPage ||
      sellerProductsLoading
    ) {
      return;
    }

    setSellerProductsPage(nextPage);
  };

  const shopStateMessage = useMemo(() => {
    if (shopLoading) return "Loading seller shop...";
    if (shopError) return shopError;
    return "";
  }, [shopError, shopLoading]);

  const productsValue =
    isLoadingStatistics || statisticsError
      ? "--"
      : formatCompactNumber(statistics?.totalProducts ?? sellerProductsState.totalCount ?? 0);
  const followersValue =
    isLoadingStatistics || statisticsError
      ? "--"
      : formatCompactNumber(statistics?.totalFollowers ?? 0);
  const ordersValue =
    isLoadingStatistics || statisticsError
      ? "--"
      : formatCompactNumber(statistics?.totalOrders ?? 0);
  const ratingValue =
    isLoadingStatistics || statisticsError
      ? "--"
      : formatRating(ratingSummary?.averageRating ?? statistics?.averageRating ?? 0);

  return (
    <div className="seller-detail">
      <section className="seller-cover">
        <div className="seller-cover__shape seller-cover__shape--one" />
        <div className="seller-cover__shape seller-cover__shape--two" />
        <div className="seller-cover__shape seller-cover__shape--three" />
      </section>

      <main className="seller-container">
        {shopStateMessage ? (
          <section className={`seller-page-state${shopError ? " seller-page-state--error" : ""}`}>
            <h1>{shopError ? "Shop not found" : "Loading shop"}</h1>
            <p>
              {shopError
                ? "Unable to load this seller shop. Please try again later."
                : shopStateMessage}
            </p>
          </section>
        ) : (
          <>
            <section className="seller-profile">
              <div className="seller-profile__avatar">
                <img src={sellerAvatar} alt={sellerDisplayName} />
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
                      {sellerDisplayName}
                      <BadgeCheck size={22} />
                    </h1>
                    <p>{sellerSubtitle}</p>
                  </div>

                  <div className="seller-profile__actions">
                    <button
                      className="btn-follow"
                      onClick={handleToggleFollow}
                      disabled={followLoading || followStatusLoading || isOwnSeller}
                      type="button"
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
                      type="button"
                    >
                      {chatLoading ? "Opening..." : "Chat"}
                    </button>
                  </div>
                </div>

                <div className="seller-profile__meta">
                  <span>
                    <MapPin size={16} />
                    {sellerAddress}
                  </span>
                  <span>
                    <Package size={16} />
                    Seller Shop
                  </span>
                  <span>
                    <Calendar size={16} />
                    {formatJoinedDate(joinedAt)}
                  </span>
                </div>
              </div>
            </section>

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
                  <h2>Customer feedback</h2>
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
                    onChange={(event) =>
                      setRatingForm((prev) => ({ ...prev, orderId: event.target.value }))
                    }
                  />
                  <div className="seller-rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={star <= ratingForm.rating ? "active" : ""}
                        onClick={() =>
                          setRatingForm((prev) => ({ ...prev, rating: star }))
                        }
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={ratingForm.comment}
                    placeholder="Share your seller experience"
                    onChange={(event) =>
                      setRatingForm((prev) => ({ ...prev, comment: event.target.value }))
                    }
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
                        <small>
                          {item.createdAtUtc
                            ? new Date(item.createdAtUtc).toLocaleString("en-US")
                            : "--"}
                        </small>
                      </article>
                    ))
                  )}
                </div>
              </div>
            </section>

            <section className="seller-products">
              <div className="seller-products__header">
                <div>
                  <span className="seller-products__eyebrow">EXPLORE THE SHOP</span>
                  <h2>Products from this shop</h2>
                </div>

                <span className="seller-products__count">
                  {sellerProductsState.totalCount} Products
                </span>
              </div>

              {sellerProductsLoading ? (
                <div className="seller-products__state">Loading products from this shop...</div>
              ) : sellerProductsError ? (
                <div className="seller-products__state seller-products__state--error">
                  {sellerProductsError}
                </div>
              ) : sellerProductsState.items.length === 0 ? (
                <div className="seller-products__state">
                  No products available from this shop yet.
                </div>
              ) : (
                <>
                  <div className="product-grid">
                    {sellerProductsState.items.map((item) => {
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

                  {sellerProductsState.totalPages > 1 ? (
                    <div className="seller-products__pagination">
                      <button
                        type="button"
                        onClick={() => handleSellerProductsPageChange(sellerProductsPage - 1)}
                        disabled={sellerProductsPage <= 1}
                      >
                        <ChevronLeft size={16} />
                        Previous
                      </button>

                      <span>
                        Page {sellerProductsState.pageNumber} of {sellerProductsState.totalPages}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleSellerProductsPageChange(sellerProductsPage + 1)}
                        disabled={sellerProductsPage >= sellerProductsState.totalPages}
                      >
                        Next
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  ) : null}
                </>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
