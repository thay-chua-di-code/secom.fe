import { useState } from "react";
import "./style.scss";
import StoreInformation from "./Step1/StoreInformation";
import SellerStatus from "./Step2/index";
import Button from "../../../components/common/Button/Button";
const steps = ["Store Information", "Approve by Admin"];

export default function SellerRegistration() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
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
        {currentStep === 0 && <StoreInformation />}
        {currentStep === 1 && <SellerStatus status={"APPROVED"} />}
      </div>

      {currentStep <= 0 && (
        <div className="step-actions">
          <Button className="btn-primary" onClick={nextStep}>
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      )}
    </div>
  );
}
