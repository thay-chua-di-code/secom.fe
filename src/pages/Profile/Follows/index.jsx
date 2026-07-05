import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../../service/userService";
import "./style.scss";

export default function Follow() {
  const dispatch = useDispatch();
  const { shopFollowed, pagination, loading } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    dispatch(
      userService.getFollowedShop({
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="followed-shop">
      <h2>Followed Shops</h2>

      <div className="shop-list">
        {shopFollowed?.map((shop) => (
          <div className="shop-card" key={shop.sellerId}>
            <img src={shop.logoUrl} alt={shop.shopName} />

            <div className="shop-info">
              <h3>{shop.shopName}</h3>

              <p>⭐ {shop.rating}</p>

              <p>
                Followed at:{" "}
                {new Date(shop.followedAtUtc).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        Page {pagination?.pageNumber ?? 1} / {pagination?.totalPages ?? 1}
      </div>
    </div>
  );
}
