import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../components/common/Button/Button";
import "./style.scss";
import { reviewService } from "../../../service/reviewSevice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetailThunk } from "../../../redux/slice/productSlice";

const formatReviewDate = (dateString) => {
  if (!dateString) return "--";

  return new Date(dateString).toLocaleString("en-US");
};

const renderStars = (rating = 0) => {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));
  return `${"★".repeat(safeRating)}${"☆".repeat(5 - safeRating)}`;
};

const getReviewerInitial = (name) => name?.trim()?.[0]?.toUpperCase() || "U";

function ProductReview({ productId }) {
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({ rating: 5, comment: "" });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.products.reviews);
  const reviewsData = useSelector((state) => state.products.reviewsData);
  const userInfo = useSelector((state) => state.user.userInfo);

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

    try {
      setIsSubmitting(true);
      await reviewService.createReview(productId, payload);
      setReviewData((prev) => ({ ...prev, comment: "" }));
      await Promise.all([
        handleGetReviews(),
        dispatch(fetchProductDetailThunk(productId)),
      ]);
      toast.success("Review submitted successfully");
    } catch (submitError) {
      toast.error(submitError.message || "Cannot submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetReviews = useCallback(async () => {
    if (!productId) return;

    try {
      setIsLoading(true);
      setError("");
      await reviewService.getReviewsPropductDetail(productId, dispatch);
    } catch (reviewsError) {
      setError(reviewsError.message || "Cannot load reviews");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, productId]);

  useEffect(() => {
    handleGetReviews();
  }, [handleGetReviews]);

  const isOwnerReview = (item) => {
    const currentUserId = userInfo?.userId || userInfo?.id;
    return currentUserId && String(item.buyerId) === String(currentUserId);
  };

  const handleOpenEdit = (item) => {
    setEditingReview(item);
    setEditForm({
      rating: Number(item.rating || 5),
      comment: item.content || item.comment || "",
    });
  };

  const handleUpdateReview = async (event) => {
    event.preventDefault();

    if (!editingReview?.id || !editForm.comment.trim()) return;

    try {
      setIsSubmitting(true);
      await reviewService.updateReview(editingReview.id, {
        rating: Number(editForm.rating),
        comment: editForm.comment.trim(),
      });
      toast.success("Review updated successfully");
      setEditingReview(null);
      await Promise.all([
        handleGetReviews(),
        dispatch(fetchProductDetailThunk(productId)),
      ]);
    } catch (updateError) {
      toast.error(updateError.message || "Cannot update review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!deleteTarget?.id) return;

    try {
      setIsSubmitting(true);
      await reviewService.deleteReview(deleteTarget.id);
      toast.success("Review deleted successfully");
      setDeleteTarget(null);
      await Promise.all([
        handleGetReviews(),
        dispatch(fetchProductDetailThunk(productId)),
      ]);
    } catch (deleteError) {
      toast.error(deleteError.message || "Cannot delete review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reviewItems = Array.isArray(reviews) ? reviews : [];
  const averageRating = Number(reviewsData?.averageRating ?? 0).toFixed(1);
  const totalReviews = reviewsData?.totalReviews ?? reviewItems.length;
  const totalPages = reviewsData?.totalPages ?? 0;

  return (
    <section className="product-review">
      <div className="review-header">
        <h2>Customer Reviews</h2>

        <div className="review-summary">
          <div className="average-rating">
            <span className="score">{averageRating}</span>

            <div>
              <div className="stars">{renderStars(Math.round(averageRating))}</div>
              <p>
                {totalReviews} Reviews • {totalPages} Pages
              </p>
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

        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
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
        {isLoading && <div className="review-empty">Loading reviews...</div>}

        {!isLoading && error && <div className="review-empty">{error}</div>}

        {!isLoading && !error && reviewItems.length === 0 && (
          <div className="review-empty">No reviews yet.</div>
        )}

        {!isLoading &&
          !error &&
          reviewItems.map((item) => (
            <div key={item.id} className="review-item">
              <div className="review-user">
                <div className="avatar">
                  {item.reviewerAvatarUrl ? (
                    <img
                      src={item.reviewerAvatarUrl}
                      alt={item.reviewerName || "Reviewer avatar"}
                    />
                  ) : (
                    getReviewerInitial(item.reviewerName)
                  )}
                </div>

                <div>
                  <h4>{item.reviewerName || "Anonymous reviewer"}</h4>

                  <div className="stars">{renderStars(item.rating)}</div>

                  <span>{formatReviewDate(item.createdAtUtc)}</span>
                  {item.isVerifiedPurchase && (
                    <span className="verified-badge">Verified purchase</span>
                  )}
                </div>
              </div>

              <p className="comment">{item.content || "No review content."}</p>

              {isOwnerReview(item) && (
                <div className="review-item__actions">
                  <button type="button" onClick={() => handleOpenEdit(item)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => setDeleteTarget(item)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>

      {editingReview && (
        <div className="review-modal-backdrop" role="presentation">
          <form className="review-modal" onSubmit={handleUpdateReview} role="dialog" aria-modal="true">
            <h3>Edit review</h3>
            <div className="rating-select">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setEditForm((prev) => ({ ...prev, rating: star }))}
                  className={star <= editForm.rating ? "active" : ""}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={editForm.comment}
              required
              onChange={(event) =>
                setEditForm((prev) => ({ ...prev, comment: event.target.value }))
              }
            />
            <div className="review-modal__actions">
              <button type="button" disabled={isSubmitting} onClick={() => setEditingReview(null)}>
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting || !editForm.comment.trim()}>
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div className="review-modal-backdrop" role="presentation">
          <div className="review-modal" role="dialog" aria-modal="true">
            <h3>Delete review?</h3>
            <p>This action cannot be undone.</p>
            <div className="review-modal__actions">
              <button type="button" disabled={isSubmitting} onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button type="button" disabled={isSubmitting} onClick={handleDeleteReview}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductReview;
