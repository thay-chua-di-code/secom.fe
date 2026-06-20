import { BadgeCheck, CircleX, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../../components/common/Button/Button";
import './style.scss'
export default function SellerStatus({ status, rejectReason }) {
  const renderContent = () => {
    switch (status) {
      case "PENDING":
        return {
          icon: <Clock3 size={70} />,
          title: "Application Under Review",
          description:
            "Your application has been submitted successfully. Our team is reviewing your information.",
          className: "pending",
        };

      case "APPROVED":
        return {
          icon: <BadgeCheck size={70} />,
          title: "Application Approved",
          description:
            "Congratulations! Your seller account has been approved.",
          className: "approved",
        };

      case "REJECTED":
        return {
          icon: <CircleX size={70} />,
          title: "Application Rejected",
          description:
            rejectReason || "Your application did not meet our requirements.",
          className: "rejected",
        };

      default:
        return null;
    }
  };

  const content = renderContent();

  if (!content) return null;

  return (
    <div className={`seller-status ${content.className}`}>
      <div className="icon">{content.icon}</div>

      <h2>{content.title}</h2>

      <p>{content.description}</p>

      {status === "APPROVED" && (
        <Link className="seller-btn">Go To Seller Center</Link>
      )}

      {status === "REJECTED" && (
        <Button className="seller-btn">Submit Again</Button>
      )}
    </div>
  );
}
