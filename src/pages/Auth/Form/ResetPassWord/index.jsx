import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Mail } from "lucide-react";
import logo from "../../../../assets/icons/logo.jpg";
import { authService } from "../../../../service/authService";
import Button from "../../../../components/common/Button/Button";

import "./style.scss";

const ResetPassWord = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPwd, setPwd] = useState("");

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault();
    const result = await authService.reset_pwd({ token, newPwd });
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
              type="password"
              placeholder="Enter your new password"
              required
              value={newPwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
        </div>

        {/* BUTTON */}
        <div className="form_actions">
          <Button type="submit" fullWidth={true}>
            Reset Password
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
