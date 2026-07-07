import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, User, Mail, Phone, MapPin, Store } from "lucide-react";
import { fetchSellerDetail } from "../../../../redux/slice/admin/seller/thunk";
import { formatDate } from "../../../../utils/fncUtils";
import {
  approveSeller,
  rejectSeller,
} from "../../../../redux/slice/admin/seller/thunk";
import "./style.scss";

const statusMap = {
  0: {
    text: "Pending",
    className: "pending",
  },
  1: {
    text: "Approved",
    className: "approved",
  },
  2: {
    text: "Rejected",
    className: "rejected",
  },
};

const SellerDetailModal = ({ open, sellerId, onClose }) => {
  const dispatch = useDispatch();
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const { sellerDetail, loading, actionLoading } = useSelector(
    (state) => state.sellersAdmin,
  );

  useEffect(() => {
    if (open && sellerId) {
      dispatch(fetchSellerDetail(sellerId));
    }
  }, [open, sellerId, dispatch]);

  if (!open) return null;

  const handleApprove = async () => {
    try {
      await dispatch(approveSeller(seller.id)).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please enter rejection reason.");
      return;
    }

    try {
      await dispatch(
        rejectSeller({
          sellerId: seller.id,
          reason: rejectReason,
        }),
      ).unwrap();

      setShowRejectBox(false);
      setRejectReason("");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading || !sellerDetail) {
    return (
      <div className="seller-detail-overlay">
        <div className="seller-detail-modal">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  const seller = sellerDetail;
  const status = statusMap[seller.status];

  return (
    <div className="seller-detail-overlay" onClick={onClose}>
      <div className="seller-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="seller-detail-header">
          <img src={seller.verificationImageUrl} alt={seller.shopName} />

          <div>
            <h2>{seller.shopName}</h2>

            <span className={`status ${status.className}`}>{status.text}</span>
          </div>
        </div>

        <div className="seller-detail-grid">
          <div className="item">
            <User size={18} />
            <div>
              <label>Owner</label>
              <p>{seller.userFullName}</p>
            </div>
          </div>

          <div className="item">
            <Mail size={18} />
            <div>
              <label>Email</label>
              <p>{seller.userEmail}</p>
            </div>
          </div>

          <div className="item">
            <Phone size={18} />
            <div>
              <label>Phone</label>
              <p>{seller.phoneNumber}</p>
            </div>
          </div>

          <div className="item">
            <MapPin size={18} />
            <div>
              <label>Address</label>
              <p>{seller.address}</p>
            </div>
          </div>

          <div className="item full">
            <Store size={18} />
            <div>
              <label>Description</label>
              <p>{seller.description || "No description"}</p>
            </div>
          </div>

          <div className="item">
            <div>
              <label>Submitted At</label>
              <p>{formatDate(seller.submittedAtUtc)}</p>
            </div>
          </div>

          {seller.approvedAtUtc && (
            <div className="item">
              <div>
                <label>Approved At</label>
                <p>{formatDate(seller.approvedAtUtc)}</p>
              </div>
            </div>
          )}

          {seller.rejectedAtUtc && (
            <div className="item">
              <div>
                <label>Rejected At</label>
                <p>{formatDate(seller.rejectedAtUtc)}</p>
              </div>
            </div>
          )}

          {seller.rejectionReason && (
            <div className="item full">
              <div>
                <label>Rejection Reason</label>
                <p>{seller.rejectionReason}</p>
              </div>
            </div>
          )}
        </div>

        <div className="verification-image">
          <h3>Verification Image</h3>

          <img src={seller.verificationImageUrl} alt="Verification" />
        </div>

        <div className="footer">
          <button className="close" onClick={onClose}>
            Close
          </button>

          {seller.status === 0 && (
            <>
              <button className="approve" onClick={handleApprove}>
                Approve
              </button>

              <button className="reject" onClick={() => setShowRejectBox(true)}>
                Reject
              </button>
            </>
          )}
        </div>

        {showRejectBox && (
          <div className="reject-box">
            <h3>Reject Seller</h3>

            <textarea
              rows={4}
              placeholder="Enter rejection reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />

            <div className="reject-actions">
              <button
                className="cancel"
                onClick={() => {
                  setShowRejectBox(false);
                  setRejectReason("");
                }}
              >
                Cancel
              </button>

              <button className="confirm" onClick={handleReject}>
                Confirm Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDetailModal;
