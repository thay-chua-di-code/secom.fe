import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import logo from "../../../../assets/icons/logo.jpg";
import { authService } from "../../../../service/authService";
import Button from "../../../../components/common/Button/Button";
import toast from "react-hot-toast";
import "./style.scss";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmitForgotPassword = async (e) => {
    e.preventDefault();
    const result = await authService.forgot_pwd({ email: email });
    console.log(result)
    if (result.success) {
      toast.success(result.message || "Password reset link sent to your email.");
    } else {
      toast.error(result.message || "Failed to send password reset link.");
    }
  };

  return (
    <div className="forgot_password_container">
      <form
        className="forgot_password_wrapper"
        onSubmit={handleSubmitForgotPassword}
      >
        {/* LOGO */}
        <div className="form_header">
          <Link to="/" className="form_logo">
            <img src={logo} alt="Logo" />
          </Link>

          <h2>Forgot Password?</h2>

          <p>
            Enter your email address and we’ll send you a link to reset your
            password.
          </p>
        </div>

        {/* EMAIL */}
        <div className="form_group">
          <label>Your Email</label>

          <div className="input_wrapper">
            <Mail size={18} />

            <input
              type="email"
              placeholder="name@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* BUTTON */}
        <div className="form_actions">
          <Button type="submit" fullWidth={true}>
            Send Reset Link
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
}
