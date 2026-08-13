import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Mail } from "lucide-react";
import logo from "../../../../assets/icons/logo.jpg";
import { authService } from "../../../../service/authService";
import Button from "../../../../components/common/Button/Button";
import { toast } from "react-hot-toast";
import "./style.scss";

const ResetPassWord = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [newPwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Reset token is missing or invalid.");
      return;
    }

    if (!newPwd) {
      toast.error("Please enter your password!");
      return;
    }

    if (newPwd.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    if (!/[A-Z]/.test(newPwd)) {
      toast.error("Password must contain at least 1 uppercase letter!");
      return;
    }

    if (!/[a-z]/.test(newPwd)) {
      toast.error("Password must contain at least 1 lowercase letter!");
      return;
    }

    if (!/[0-9]/.test(newPwd)) {
      toast.error("Password must contain at least 1 number!");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>[\]\\/'`~_+=;-]/.test(newPwd)) {
      toast.error("Password must contain at least 1 special character!");
      return;
    }

    try {
      setSubmitting(true);
      const result = await authService.reset_pwd({ token, newPassword: newPwd });

      if (result?.success) {
      toast.success(
        "Password reset successful! Please log in with your new password.",
      );
        navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.error(error.message || "Password reset failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="forgot_password_container">
      <form
        className="forgot_password_wrapper"
        onSubmit={handleSubmitResetPassword}
      >
        {/* LOGO */}
        <div className="form_header">
          <Link to="/" className="form_logo">
            <img src={logo} alt="Logo" />
          </Link>

          <h2>Reset Your Password?</h2>

          <p>
            Enter your new password and confirm it to reset your password. Make
            sure to choose a strong and secure password to protect your account.
          </p>
        </div>

        {/* NEW PASSWORD */}
        <div className="form_group">
          <label>New Password</label>

          <div className="input_wrapper">
            <Mail size={18} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              required
              value={newPwd}
              onChange={(e) => setPwd(e.target.value)}
            />

            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* BUTTON */}
        <div className="form_actions">
          <Button type="submit" fullWidth={true} disabled={submitting}>
            {submitting ? "Resetting Password..." : "Reset Password"}
          </Button>
        </div>

        {/* FOOTER */}
        <div className="form_footer">
          <p>
            Remember your password?
            <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassWord;
