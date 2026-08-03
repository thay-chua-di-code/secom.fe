import { useEffect, useMemo, useState } from "react";
import "./style.scss";
import StoreInformation from "./Step1/StoreInformation";
import SellerStatus from "./Step2/index";
import { useDispatch, useSelector } from "react-redux";
import { sellerService } from "../../../service/sellerService";
import { resetSellerStatus } from "../../../redux/slice/sellerStatusSlice";
const steps = ["Store Information", "Approve by Admin"];

export default function SellerRegistration() {
  const [submittedStatus, setSubmittedStatus] = useState(null);
  const { statusText, rejectReason, loading } = useSelector(
    (state) => state.sellerStatus,
  );
  const token = useSelector((state) => state.auth.token);
  const userInfo = useSelector((state) => state.user.userInfo);
  const currentUserId = userInfo?.userId || userInfo?.id || "anonymous";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSellerStatus());

    if (token) {
      sellerService.sellerShopStatus(dispatch).catch((error) => {
        if (import.meta.env.DEV) {
          console.error("[SellerRegistration] Load current status failed", {
            status: error?.response?.status,
            message: error?.message,
          });
        }
      });
    }
  }, [currentUserId, dispatch, token]);

  const statusStep = useMemo(() => {
    if (submittedStatus?.userId === currentUserId) return submittedStatus.status;
    if (!statusText) return "";

    const normalizedStatus = statusText.toLowerCase();

    if (normalizedStatus.includes("pending")) return "PENDING";
    if (normalizedStatus.includes("approved")) return "APPROVED";
    return "REJECTED";
  }, [currentUserId, statusText, submittedStatus]);

  const currentStep = statusStep ? 1 : 0;

  const handleApplicationSubmitted = () => {
    setSubmittedStatus({ userId: currentUserId, status: "PENDING" });
  };

  return (
    <div className="seller-step">
      <div className="step-progress">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`step-item ${index <= currentStep ? "active" : ""}`}
          >
            <div className="circle">{index + 1}</div>

            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className="step-content">
        {loading ? (
          <p>Loading seller registration status...</p>
        ) : statusStep ? (
          <SellerStatus status={statusStep} rejectReason={rejectReason} />
        ) : (
          <StoreInformation onSubmitted={handleApplicationSubmitted} />
        )}
      </div>
    </div>
  );
}
