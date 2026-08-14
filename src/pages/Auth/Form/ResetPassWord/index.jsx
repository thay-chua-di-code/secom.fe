import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { authService } from "../../../../service/authService";
import Button from "../../../../components/common/Button/Button";
import AuthShell from "../../components/AuthShell";
import PasswordField from "../../components/PasswordField";

import "../../shared.scss";
import "./style.scss";

const PASSWORD_RULES = [
  "At least 8 characters",
  "Contains uppercase and lowercase letters",
  "Contains at least one number",
  "Contains at least one special character",
];

export default function ResetPassWord() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [newPwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmitResetPassword = async (event) => {
    event.preventDefault();

    if (!token) {
      const message = "Reset token is missing or invalid.";
      setStatus({ tone: "error", message });
      toast.error(message);
      return;
    }

    if (!newPwd) {
      const message = "Please enter your password!";
      setStatus({ tone: "error", message });
      toast.error(message);
      return;
    }

    if (newPwd.length < 8 || !/[A-Z]/.test(newPwd) || !/[a-z]/.test(newPwd) || !/[0-9]/.test(newPwd) || !/[!@#$%^&*(),.?":{}|<>[\]\\/'`~_+=;-]/.test(newPwd)) {
      const message = "Your new password does not meet the required security rules.";
      setStatus({ tone: "error", message });
      toast.error(message);
      return;
    }

    try {
      setSubmitting(true);
      const result = await authService.reset_pwd({ token, newPassword: newPwd });

      if (result?.success) {
        const message = "Password reset successful! Please log in with your new password.";
        setStatus({ tone: "success", message });
        toast.success(message);
        navigate("/login", { replace: true });
      }
    } catch (error) {
      const message = error.message || "Password reset failed.";
      setStatus({ tone: "error", message });
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Set New Password"
      title="Create a new password"
      subtitle="Choose a strong password for your AIDR account. Once updated, use it the next time you sign in."
    >
      <form className="auth-form" onSubmit={handleSubmitResetPassword}>
        <PasswordField
          id="reset-password"
          name="newPassword"
          label="New password"
          value={newPwd}
          onChange={(event) => setPwd(event.target.value)}
          placeholder="Enter your new password"
          showPassword={showPassword}
          onToggle={() => setShowPassword((current) => !current)}
          autoComplete="new-password"
        />

        <ul className="auth-password-rules">
          {PASSWORD_RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>

        {status ? <div className={`auth-status auth-status--${status.tone}`}>{status.message}</div> : null}

        <div className="auth-form__actions">
          <Button className="auth-button" type="submit" fullWidth disabled={submitting}>
            {submitting ? "Resetting password..." : "Reset password"}
          </Button>
        </div>
      </form>

      <div className="auth-ui__footer">
        Remember your password? <Link to="/login">Back to login</Link>
      </div>
    </AuthShell>
  );
}
