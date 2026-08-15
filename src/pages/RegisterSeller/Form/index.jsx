import { useEffect, useMemo, useState } from "react";
import "./style.scss";

import StoreInformation from "./Step1/StoreInformation";
import SellerStatus from "./Step2/index";

import { useDispatch, useSelector } from "react-redux";

import { sellerService } from "../../../service/sellerService";
import { resetSellerStatus } from "../../../redux/slice/sellerStatusSlice";

const steps = ["Store Information", "Approve by Admin"];

export default function SellerRegistration() {
  const dispatch = useDispatch();

  const [submittedStatus, setSubmittedStatus] = useState(null);

  const { statusText, rejectReason, loading } = useSelector(
    (state) => state.sellerStatus,
  );

  const token = useSelector((state) => state.auth.token);

  const userInfo = useSelector((state) => state.user.userInfo);

  const currentUserId = userInfo?.userId || userInfo?.id || "anonymous";

  // ============================================================
  // LOAD CURRENT SELLER STATUS
  // ============================================================

  useEffect(() => {
    let mounted = true;

    dispatch(resetSellerStatus());

    if (!token) {
      return () => {
        mounted = false;
      };
    }

    const loadSellerStatus = async () => {
      try {
        await sellerService.sellerShopStatus(dispatch);
      } catch (error) {
        if (!mounted) return;

        const statusCode = error?.response?.status;

        if (statusCode === 404) {
          return;
        }

        if (import.meta.env.DEV) {
          console.error("[SellerRegistration] Load seller status failed", {
            status: statusCode,
            message: error?.message,
            data: error?.response?.data,
          });
        }
      }
    };

    loadSellerStatus();

    return () => {
      mounted = false;
    };
  }, [currentUserId, dispatch, token]);

  // ============================================================
  // NORMALIZE STATUS
  // ============================================================

  const statusStep = useMemo(() => {

    if (submittedStatus?.userId === currentUserId) {
      return submittedStatus.status;
    }
    if (statusText === null || statusText === undefined || statusText === "") {
      return "";
    }

    const normalizedStatus = String(statusText).trim().toLowerCase();

    // ========================================================
    // NOT REGISTERED
    // ========================================================

    const notRegisteredStatuses = [
      "",
      "none",
      "null",

      "not_registered",
      "not registered",
      "notregistered",

      "no_shop",
      "no shop",

      "not_found",
      "not found",

      "seller shop not found",
      "seller not found",

      "no seller application",
      "no application",

      "not applied",
      "not_applied",

      "unregistered",
    ];

    if (notRegisteredStatuses.includes(normalizedStatus)) {
      return "";
    }

    if (
      normalizedStatus.includes("not registered") ||
      normalizedStatus.includes("not found") ||
      normalizedStatus.includes("no application") ||
      normalizedStatus.includes("no shop") ||
      normalizedStatus.includes("not applied")
    ) {
      return "";
    }

    // ========================================================
    // PENDING
    // ========================================================

    if (
      normalizedStatus === "pending" ||
      normalizedStatus.includes("pending") ||
      normalizedStatus.includes("waiting") ||
      normalizedStatus.includes("processing")
    ) {
      return "PENDING";
    }

    // ========================================================
    // APPROVED
    // ========================================================

    if (
      normalizedStatus === "approved" ||
      normalizedStatus.includes("approved") ||
      normalizedStatus.includes("approve")
    ) {
      return "APPROVED";
    }

    // ========================================================
    // REJECTED
    // ========================================================

    if (
      normalizedStatus === "rejected" ||
      normalizedStatus.includes("rejected") ||
      normalizedStatus.includes("reject") ||
      normalizedStatus.includes("denied")
    ) {
      return "REJECTED";
    }

    /*
     * QUAN TRỌNG:
     *
     * Status không xác định
     * KHÔNG được tự biến thành rejected.
     *
     * Mặc định cho hiển thị form.
     */
    if (import.meta.env.DEV) {
      console.warn("[SellerRegistration] Unknown seller status:", {
        originalStatus: statusText,
        normalizedStatus,
      });
    }

    return "";
  }, [currentUserId, statusText, submittedStatus]);

  // ============================================================
  // CURRENT STEP
  // ============================================================

  const hasApplication =
    statusStep === "PENDING" ||
    statusStep === "APPROVED" ||
    statusStep === "REJECTED";

  const currentStep = hasApplication ? 1 : 0;

  // ============================================================
  // AFTER SUBMIT
  // ============================================================

  const handleApplicationSubmitted = () => {
    setSubmittedStatus({
      userId: currentUserId,
      status: "PENDING",
    });
  };

  // ============================================================
  // DEBUG
  // ============================================================

  if (import.meta.env.DEV) {
    console.log("[SellerRegistration] Current render state", {
      loading,
      statusText,
      statusStep,
      hasApplication,
      rejectReason,
      currentUserId,
    });
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="seller-step">
      {/* =====================================================
          STEP PROGRESS
      ===================================================== */}
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

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div className="step-content">
        {/* ===================================================
            USER ĐÃ SUBMIT
        =================================================== */}

        {statusStep === "PENDING" && (
          <SellerStatus status="PENDING" rejectReason={rejectReason} />
        )}

        {statusStep === "APPROVED" && (
          <SellerStatus status="APPROVED" rejectReason={rejectReason} />
        )}

        {statusStep === "REJECTED" && (
          <SellerStatus status="REJECTED" rejectReason={rejectReason} />
        )}

        {!hasApplication && (
          <>
            {loading && (
              <div className="seller-status-checking">
                <span className="seller-status-checking__spinner" />

                <span>Checking current seller status...</span>
              </div>
            )}

            <StoreInformation onSubmitted={handleApplicationSubmitted} />
          </>
        )}
      </div>
    </div>
  );
}
