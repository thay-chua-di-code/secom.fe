import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WishlistHeader from "./Header/Header";
import Card from "../../components/common/Card";
import { getWishlistThunk } from "../../redux/slice/userSlice";
import "./style.scss";

export default function WishlistPage() {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);
  const wishlist = useSelector((state) => {
    const items = state.user.wishlist?.items ?? state.user.wishlist;

    return Array.isArray(items) ? items : [];
  });

  useEffect(() => {
    dispatch(
      getWishlistThunk({
        page: 1,
        pageSize: 20,
      }),
    );
  }, [dispatch]);

  return (
    <div className="wishlist-page">
      <div className="container">
        <WishlistHeader total={wishlist.length} />

        {loading ? (
          <div className="wishlist-loading">Loading...</div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <Card
                key={item.productId ?? item.id}
                item={{ ...(item.product ?? item), ...item }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
