import { useEffect, useState } from "react";
import "./style.scss";
import StoreInformation from "./Step1/StoreInformation";
import SellerStatus from "./Step2/index";
import Button from "../../../components/common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { sellerService } from "../../../service/sellerService";
const steps = ["Store Information", "Approve by Admin"];

export default function SellerRegistration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [statusStep, setStatusStep] = useState("");
  const { status, statusText, sellerId, rejectReason } = useSelector(
    (state) => state.sellerStatus,
  );

  const dispatch = useDispatch();

  const getStatusSeller = async () => {
    const res = await sellerService.sellerShopStatus(dispatch);
  };


  useEffect(() => {
    getStatusSeller();
  }, []);

  useEffect(() => {
    if (!statusText) return;

    setCurrentStep(1);

    if (statusText.toLowerCase().includes("pending")) {
      setStatusStep("PENDING");
    } else if (statusText.toLowerCase().includes("approved")) {
      setStatusStep("APPROVED");
    } else {
      setStatusStep("REJECTED");
    }
  }, [statusText]);

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
        {statusStep ? (
          <SellerStatus status={statusStep} rejectReason={rejectReason} />
        ) : (
          <StoreInformation />
        )}
      </div>
    </div>
  );
}
