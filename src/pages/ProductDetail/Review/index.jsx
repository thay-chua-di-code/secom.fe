import Button from "../../../components/common/Button/Button";
import "./style.scss";

const reviews = [
  {
    id: 1,
    userName: "Nguyễn Văn A",
    rating: 5,
    createdAt: "15/06/2026",
    comment: "Sản phẩm rất tốt, đóng gói cẩn thận, giao hàng nhanh.",
  },
  {
    id: 2,
    userName: "Trần Văn B",
    rating: 4,
    createdAt: "12/06/2026",
    comment: "Chất lượng ổn trong tầm giá.",
  },
];

function ProductReview() {
  return (
    <section className="product-review">
      <div className="review-header">
        <h2>Reviews</h2>

        <div className="review-summary">
          <div className="average-rating">
            <span className="score">4.8</span>

            <div className="stars">★★★★★</div>

            <p>150 đánh giá</p>
          </div>
        </div>
      </div>

      <div className="review-filter">
        <Button className="active">Tất cả</Button>

        <Button>5 Sao</Button>
        <Button>4 Sao</Button>
        <Button>3 Sao</Button>
        <Button>2 Sao</Button>
        <Button>1 Sao</Button>
      </div>

      <div className="review-list">
        {reviews.map((item) => (
          <div key={item.id} className="review-item">
            <div className="review-user">
              <div className="avatar">{item.userName[0]}</div>

              <div>
                <h4>{item.userName}</h4>

                <div className="stars">{"★".repeat(item.rating)}</div>

                <span>{item.createdAt}</span>
              </div>
            </div>

            <p className="comment">{item.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductReview;
