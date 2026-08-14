import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../../components/common/Button/Button";
import AuthShell from "../components/AuthShell";
import { authService } from "../../../service/authService";

import "../shared.scss";
import "./style.scss";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState(null);

  const handleVerify = async () => {
    try {
      setVerifying(true);
      const result = await authService.verify_account({ email, token });

      if (result?.data?.success) {
        setStatus({
          tone: "success",
          message: "Your email has been verified successfully. You can log in now.",
        });
        toast.success("Email verification successful.");
        navigate("/login");
        return;
      }

      setStatus({
        tone: "error",
        message: result?.data?.message || "Verification could not be completed.",
      });
    } catch (error) {
      const message = error?.message || "Verification could not be completed.";
      setStatus({ tone: "error", message });
      toast.error(message);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Email Verification"
      title="Verify your account"
      subtitle="Check your inbox and complete the final verification step to activate your AIDR account."
      visualTitle="Activate your retail workspace"
      visualDescription="Verification protects buyer and seller access, keeps account recovery secure and ensures your AIDR experience starts smoothly."
    >
      <div className="auth-form">
        <div className="auth-status auth-status--success">
          We sent a verification link to <strong>{email || "your email address"}</strong>.
        </div>

        {status ? <div className={`auth-status auth-status--${status.tone}`}>{status.message}</div> : null}

        <div className="auth-form__actions">
          <Button className="auth-button" fullWidth onClick={handleVerify} disabled={verifying}>
            {verifying ? "Verifying..." : "Verify email"}
          </Button>

          <Button className="auth-button--secondary" fullWidth onClick={() => navigate("/login")}>
            Back to login
          </Button>
        </div>

        <p className="auth-form__note">
          Didn&apos;t receive a message? Check your spam folder or use the original verification email again.
        </p>
      </div>

      <div className="auth-ui__footer">
        Need to start over? <Link to="/register">Create a new account</Link>
      </div>
    </AuthShell>
  );
}
