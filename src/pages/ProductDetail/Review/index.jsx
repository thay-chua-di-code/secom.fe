import { useState } from "react";
import Button from "../../../components/common/Button/Button";
import Input from "../../../components/common/Input";
import "./style.scss";
import { reviewService } from "../../../service/reviewSevice";

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

function ProductReview({ productId }) {
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });

  const handleChange = (e) => {
    setReviewData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRating = (rating) => {
    setReviewData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!reviewData.comment.trim()) return;

    const payload = {
      productId: productId,
      rating: reviewData.rating,
      comment: reviewData.comment,
    };
    const result = await reviewService.createReview(productId, payload);
    console.log(result);
  };

  return (
    <section className="product-review">
      <div className="review-header">
        <h2>Customer Reviews</h2>

        <div className="review-summary">
          <div className="average-rating">
            <span className="score">4.8</span>

            <div>
              <div className="stars">★★★★★</div>
              <p>150 Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Form */}

      <div className="review-form">
        <h3>Write your review</h3>

        <div className="rating-select">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className={star <= reviewData.rating ? "active" : ""}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          name="comment"
          placeholder="Share your experience..."
          value={reviewData.comment}
          onChange={handleChange}
        />

        <Button onClick={handleSubmit}>Submit Review</Button>
      </div>

      <div className="review-filter">
        <Button className="active">All</Button>
        <Button>5 ★</Button>
        <Button>4 ★</Button>
        <Button>3 ★</Button>
        <Button>2 ★</Button>
        <Button>1 ★</Button>
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
