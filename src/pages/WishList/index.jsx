import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WishlistHeader from "./Header/Header";
import Card from "../../components/common/Card";
import { getWishlistThunk } from "../../redux/slice/userSlice";
import "./style.scss";

export default function WishlistPage() {
  const dispatch = useDispatch();

  const { wishlist, loading } = useSelector((state) => state.user);

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
        <WishlistHeader total={wishlist?.length} />

        {loading ? (
          <div className="wishlist-loading">Loading...</div>
        ) : (
          <div className="wishlist-grid">
            {wishlist?.map((item) => (
              <Card
                key={item.productId ?? item.id}
                item={item.product ?? item}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
