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
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import placeholderAvatar from "../../../assets/icons/favicon-aidr.svg";
import { chatService } from "../../../service/chatService";
import sellerFollowApi from "../../../api/sellerFollowApi";
import { getSellerStatistics } from "../../../api/sellerStatisticsApi";
import useReveal from "../../../hooks/useReveal";

export default function SellerShow({ seller, shop }) {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const userInfo = useSelector((state) => state.user.userInfo);

  const [chatLoading, setChatLoading] = useState(false);

  const [followLoading, setFollowLoading] = useState(false);

  const [followStatusLoading, setFollowStatusLoading] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);

  const [followerCount, setFollowerCount] = useState(0);

  const reveal = useReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -60px 0px",
    once: false,
  });

  const sellerInfo = seller || shop || {};

  const sellerId = sellerInfo.sellerId || sellerInfo.id;

  const sellerName = sellerInfo.fullName || sellerInfo.name || "Unknown seller";

  const avatarUrl =
    sellerInfo.avatarUrl || sellerInfo.avatar || placeholderAvatar;

  const rating = sellerInfo.rating ?? "N/A";

  const totalProducts = sellerInfo.totalProducts ?? "N/A";

  const followers = followerCount || sellerInfo.followers || 0;

  const joined = sellerInfo.joined ?? "N/A";

  const isOwnSeller =
    sellerId &&
    (String(userInfo?.sellerId) === String(sellerId) ||
      String(userInfo?.userId) === String(sellerId) ||
      String(userInfo?.id) === String(sellerId));

  useEffect(() => {
    if (!sellerId) return;

    let isMounted = true;

    const loadSellerFollowData = async () => {
      try {
        const statistics = await getSellerStatistics(sellerId);

        if (isMounted) {
          setFollowerCount(statistics?.totalFollowers ?? 0);
        }
      } catch (error) {
        console.error("Seller statistics error:", error);
      }

      if (!isAuthenticated) return;

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

    loadSellerFollowData();

    const handleFollowChanged = (event) => {
      if (String(event.detail?.sellerId) !== String(sellerId)) {
        return;
      }

      setIsFollowing(Boolean(event.detail?.isFollowing));

      setFollowerCount((currentCount) =>
        Number.isFinite(event.detail?.totalFollowers)
          ? event.detail.totalFollowers
          : event.detail?.isFollowing
            ? currentCount + 1
            : Math.max(0, currentCount - 1),
      );
    };

    window.addEventListener("secom:seller-follow-changed", handleFollowChanged);

    return () => {
      isMounted = false;

      window.removeEventListener(
        "secom:seller-follow-changed",
        handleFollowChanged,
      );
    };
  }, [isAuthenticated, sellerId]);

  const handleToggleFollow = async () => {
    if (!sellerId || followLoading || followStatusLoading || isOwnSeller) {
      return;
    }

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
        ? await sellerFollowApi.followSeller(sellerId)
        : await sellerFollowApi.unfollowSeller(sellerId);

      const confirmedFollowing = result?.isFollowing ?? nextFollowing;

      let nextFollowerCount = followerCount;

      setFollowerCount((currentCount) => {
        nextFollowerCount = confirmedFollowing
          ? currentCount + 1
          : Math.max(0, currentCount - 1);

        return nextFollowerCount;
      });

      setIsFollowing(confirmedFollowing);

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

  const handleChatWithSeller = async () => {
    if (!sellerId) {
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

      const thread = await chatService.createChatThread({
        sellerId,
      });

      const chatId = thread?.chatId || thread?.id;

      if (!chatId) {
        throw new Error("Chat thread response does not contain chatId");
      }

      window.dispatchEvent(
        new CustomEvent("secom:open-chat", {
          detail: {
            chatId,
            sellerId: thread.sellerId || sellerId,
            shopName: thread.shopName,
            sellerName:
              thread.shopName || thread.sellerName || sellerName || "Seller",
            sellerAvatarUrl: thread.sellerAvatarUrl || avatarUrl,
          },
        }),
      );
    } catch (error) {
      toast.error(error.message || "Cannot open chat");
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <section
      ref={reveal.ref}
      className={`seller-showcase reveal-section ${
        reveal.visible ? "is-visible" : ""
      }`}
    >
      <div className="seller-showcase__header">
        <div className="seller-showcase__profile">
          <div className="seller-showcase__avatar-wrap">
            <img
              className="seller-showcase__avatar"
              src={avatarUrl}
              alt={sellerName}
            />

            <span className="seller-showcase__online-dot" />
          </div>

          <div className="seller-showcase__info">
            <span className="seller-showcase__eyebrow">SELLER PROFILE</span>

            <h3>
              {sellerName}

              {sellerInfo.verified && (
                <BadgeCheck size={17} className="seller-showcase__verified" />
              )}
            </h3>

            <p>Online 10 minutes ago</p>
          </div>
        </div>

        <div className="seller-showcase__actions">
          <Button
            className="seller-showcase__chat"
            onClick={handleChatWithSeller}
            disabled={chatLoading}
          >
            <MessageCircle size={16} />

            {chatLoading ? "Opening..." : "Chat"}
          </Button>

          {!isOwnSeller && (
            <Button
              className={`seller-showcase__follow ${
                isFollowing ? "is-following" : ""
              }`}
              onClick={handleToggleFollow}
              disabled={followLoading || followStatusLoading}
            >
              {followLoading
                ? "Processing..."
                : followStatusLoading
                  ? "Loading..."
                  : isFollowing
                    ? "Following"
                    : "Follow"}
            </Button>
          )}

          <Link
            to={sellerId ? `/seller/detail/${sellerId}` : "#"}
            className="seller-showcase__shop"
          >
            <Store size={16} />
            View Shop
          </Link>
        </div>
      </div>

      <div className="seller-showcase__stats">
        <div className="seller-showcase__stat">
          <div className="seller-showcase__stat-icon">
            <Star size={17} />
          </div>

          <div>
            <span>Rating</span>
            <strong>{rating}</strong>
          </div>
        </div>

        <div className="seller-showcase__stat">
          <div className="seller-showcase__stat-icon">
            <Package size={17} />
          </div>

          <div>
            <span>Products</span>
            <strong>{totalProducts}</strong>
          </div>
        </div>

        <div className="seller-showcase__stat">
          <div className="seller-showcase__stat-icon">
            <Users size={17} />
          </div>

          <div>
            <span>Followers</span>

            <strong>{Number(followers).toLocaleString()}</strong>
          </div>
        </div>

        <div className="seller-showcase__stat">
          <div className="seller-showcase__stat-icon">
            <Store size={17} />
          </div>

          <div>
            <span>Joined</span>
            <strong>{joined}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
