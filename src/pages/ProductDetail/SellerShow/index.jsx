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
import placeholderAvatar from "../../../assets/icons/logo.jpg";
import { chatService } from "../../../service/chatService";
import sellerFollowApi from "../../../api/sellerFollowApi";
import { getSellerStatistics } from "../../../api/sellerStatisticsApi";

export default function SellerShow({ seller, shop }) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [chatLoading, setChatLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followStatusLoading, setFollowStatusLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
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
      if (String(event.detail?.sellerId) !== String(sellerId)) return;

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
    if (!sellerId || followLoading || followStatusLoading || isOwnSeller)
      return;

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
            sellerName: thread.sellerName || sellerName,
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
    <div className="seller-showcase">
      <div className="seller-showcase__header">
        <div className="seller-showcase__profile">
          <img
            className="seller-showcase__avatar"
            src={avatarUrl}
            alt={sellerName}
          />

          <div className="seller-showcase__info">
            <h3>
              {sellerName}
              {sellerInfo.verified && (
                <BadgeCheck size={18} color="#ef4444" fill="#fee2e2" />
              )}
            </h3>

            <span>🟢 Online 10 minutes ago</span>
          </div>
        </div>

        <div className="seller-showcase__actions">
          <Button
            className="seller-showcase__chat"
            onClick={handleChatWithSeller}
            disabled={chatLoading}
          >
            <MessageCircle size={18} />
            {chatLoading ? "Opening..." : "Chat"}
          </Button>

          {!isOwnSeller && (
            <Button
              className="seller-showcase__follow"
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
            <Store size={18} />
            View Shop
          </Link>
        </div>
      </div>

      <div className="seller-showcase__stats">
        <div className="seller-showcase__stat">
          <Star size={18} />
          <span>Rating</span>
          <strong>{rating}</strong>
        </div>

        <div className="seller-showcase__stat">
          <Package size={18} />
          <span>Products</span>
          <strong>{totalProducts}</strong>
        </div>

        <div className="seller-showcase__stat">
          <Users size={18} />
          <span>Followers</span>
          <strong>{Number(followers).toLocaleString()}</strong>
        </div>

        <div className="seller-showcase__stat">
          <Store size={18} />
          <span>Joined</span>
          <strong>{joined}</strong>
        </div>
      </div>
    </div>
  );
}
