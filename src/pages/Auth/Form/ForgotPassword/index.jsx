import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { authService } from "../../../../service/authService";
import Button from "../../../../components/common/Button/Button";
import AuthShell from "../../components/AuthShell";

import "../../shared.scss";
import "./style.scss";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmitForgotPassword = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const result = await authService.forgot_pwd({ email });
      const success = Boolean(result?.success);
      setStatus({
        tone: success ? "success" : "error",
        message:
          result?.message ||
          (success
            ? "Password reset link sent to your email."
            : "Failed to send password reset link."),
      });

      if (success) {
        toast.success(result.message || "Password reset link sent to your email.");
      } else {
        toast.error(result?.message || "Failed to send password reset link.");
      }
    } catch (error) {
      const message = error?.message || "Failed to send password reset link.";
      setStatus({ tone: "error", message });
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Password Recovery"
      title="Forgot your password?"
      subtitle="Enter the email associated with your account and we’ll send you instructions to reset it securely."
    >
      <form className="auth-form" onSubmit={handleSubmitForgotPassword}>
        <label className="auth-field" htmlFor="forgot-email">
          <span className="auth-field__label">Email address</span>
          <div className="auth-field__control">
            <input
              id="forgot-email"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
          </div>
        </label>

        {status ? <div className={`auth-status auth-status--${status.tone}`}>{status.message}</div> : null}

        <div className="auth-form__actions">
          <Button className="auth-button" type="submit" fullWidth disabled={submitting}>
            {submitting ? "Sending reset link..." : "Send reset link"}
          </Button>
        </div>
      </form>

      <div className="auth-ui__footer">
        Remember your password? <Link to="/login">Back to login</Link>
      </div>
    </AuthShell>
  );
}
