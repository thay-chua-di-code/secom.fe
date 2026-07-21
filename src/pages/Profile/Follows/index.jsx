import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../../service/userService";
import placeholderAvatar from "../../../assets/icons/logo.jpg";
import "./style.scss";

export default function Follow() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const { shopFollowed, pagination, loading, error } = useSelector(
    (state) => state.user,
  );

  const loadFollowedShops = useCallback(
    ({ nextPage = page } = {}) => {
      dispatch(
        userService.getFollowedShop({
          page: nextPage,
          pageSize: 10,
        }),
      );
    },
    [dispatch, page],
  );

  useEffect(() => {
    loadFollowedShops({ nextPage: page });
  }, [loadFollowedShops, page]);

  const handleUnfollow = async (sellerId) => {
    if (!sellerId || actionLoadingId) return;

    try {
      setActionLoadingId(sellerId);
      await userService.unfollowShop(sellerId);

      window.dispatchEvent(
        new CustomEvent("secom:seller-follow-changed", {
          detail: { sellerId, isFollowing: false },
        }),
      );

      toast.success("Đã bỏ theo dõi cửa hàng");

      const shouldGoPreviousPage =
        shopFollowed.length === 1 && page > 1 && pagination.totalCount > 1;

      if (shouldGoPreviousPage) {
        setPage((currentPage) => Math.max(1, currentPage - 1));
      } else {
        loadFollowedShops({ nextPage: page });
      }
    } catch (unfollowError) {
      toast.error(unfollowError.message || "Cannot unfollow seller");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="followed-shop">
      <div className="shop-list">
        {!error && shopFollowed?.length === 0 && <p>No followed shops yet.</p>}

        {shopFollowed?.map((shop) => (
          <div className="shop-card" key={shop.sellerId}>
            <img src={shop.logoUrl || placeholderAvatar} alt={shop.shopName} />

            <div className="shop-info">
              <h3>{shop.shopName || "Seller Shop"}</h3>

              <p>⭐ {shop.rating ?? "N/A"}</p>

              <p>
                Followed at:{" "}
                {shop.followedAtUtc
                  ? new Date(shop.followedAtUtc).toLocaleDateString("vi-VN")
                  : "--"}
              </p>

              <Link to={`/seller/detail/${shop.sellerId}`}>View shop</Link>

              <button
                type="button"
                onClick={() => handleUnfollow(shop.sellerId)}
                disabled={actionLoadingId === shop.sellerId}
              >
                {actionLoadingId === shop.sellerId
                  ? "Executing..."
                  : "Unfollow"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
        >
          Previous
        </button>
        Page {pagination?.pageNumber ?? 1} / {pagination?.totalPages ?? 1}
        <button
          type="button"
          disabled={page >= (pagination?.totalPages ?? 1)}
          onClick={() => setPage((currentPage) => currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
