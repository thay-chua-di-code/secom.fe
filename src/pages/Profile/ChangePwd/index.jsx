import { useState } from "react";
import { Eye, EyeOff, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";

import Button from "../../../components/common/Button/Button";
import { authService } from "../../../service/authService";

import "./style.scss";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [changePwdData, setChangePwdData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setChangePwdData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async () => {
    try {
      if (
        !changePwdData.currentPassword ||
        !changePwdData.newPassword ||
        !changePwdData.confirmPassword
      ) {
        alert("Please fill all fields");
        return;
      }

      if (changePwdData.newPassword.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      if (changePwdData.newPassword !== changePwdData.confirmPassword) {
        alert("Password confirmation does not match");
        return;
      }

      setLoading(true);

      const payload = {
        currentPassword: changePwdData.currentPassword,
        newPassword: changePwdData.newPassword,
      };

      await authService.change_password(payload);

      alert("Password updated successfully");

      setChangePwdData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPassword({
        current: false,
        new: false,
        confirm: false,
      });
    } catch (error) {
      console.error(error);

      alert("Update password failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password">
      <div className="change-password__intro">
        <div className="change-password__intro-icon">
          <ShieldCheck size={20} />
        </div>

        <div>
          <span className="change-password__eyebrow">ACCOUNT SECURITY</span>

          <h3>Protect your account</h3>

          <p>Use a strong password that you do not use for other accounts.</p>
        </div>
      </div>

      <div className="change-password__form">
        {/* CURRENT */}
        <div className="change-password__group">
          <label htmlFor="currentPassword">Current Password</label>

          <div className="change-password__input">
            <LockKeyhole size={16} className="change-password__input-icon" />

            <input
              id="currentPassword"
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              placeholder="Enter current password"
              value={changePwdData.currentPassword}
              onChange={handleChange}
              autoComplete="current-password"
            />

            <button
              type="button"
              className="change-password__toggle"
              aria-label={
                showPassword.current
                  ? "Hide current password"
                  : "Show current password"
              }
              onClick={() => togglePassword("current")}
            >
              {showPassword.current ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* NEW */}
        <div className="change-password__group">
          <label htmlFor="newPassword">New Password</label>

          <div className="change-password__input">
            <KeyRound size={16} className="change-password__input-icon" />

            <input
              id="newPassword"
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              placeholder="Enter new password"
              value={changePwdData.newPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />

            <button
              type="button"
              className="change-password__toggle"
              aria-label={
                showPassword.new ? "Hide new password" : "Show new password"
              }
              onClick={() => togglePassword("new")}
            >
              {showPassword.new ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <small>Use at least 6 characters.</small>
        </div>

        {/* CONFIRM */}
        <div className="change-password__group">
          <label htmlFor="confirmPassword">Confirm Password</label>

          <div className="change-password__input">
            <KeyRound size={16} className="change-password__input-icon" />

            <input
              id="confirmPassword"
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm new password"
              value={changePwdData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />

            <button
              type="button"
              className="change-password__toggle"
              aria-label={
                showPassword.confirm
                  ? "Hide confirmed password"
                  : "Show confirmed password"
              }
              onClick={() => togglePassword("confirm")}
            >
              {showPassword.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="change-password__footer">
          <Button
            className="change-password-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
