import { useState } from "react";
import Button from "../../../components/common/Button/Button";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import "./style.scss";
import { authService } from "../../../service/authService";

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
      ``;

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
    } catch (error) {
      console.log(error);

      alert("Update password failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password">
      {/* <div className="change-password__header">
        <h2>Change Password</h2>

        <p>Keep your account secure by updating your password</p>
      </div> */}

      <div className="change-password__form">
        {/* CURRENT PASSWORD */}
        <div className="input-group">
          <label>Current Password</label>

          <div className="input-wrapper">
            <LockKeyhole size={18} />

            <input
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              placeholder="Enter current password"
              value={changePwdData.currentPassword}
              onChange={handleChange}
            />

            <button type="button" onClick={() => togglePassword("current")}>
              {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* NEW PASSWORD */}
        <div className="input-group">
          <label>New Password</label>

          <div className="input-wrapper">
            <LockKeyhole size={18} />

            <input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              placeholder="Enter new password"
              value={changePwdData.newPassword}
              onChange={handleChange}
            />

            <button type="button" onClick={() => togglePassword("new")}>
              {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="input-group">
          <label>Confirm Password</label>

          <div className="input-wrapper">
            <LockKeyhole size={18} />

            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm new password"
              value={changePwdData.confirmPassword}
              onChange={handleChange}
            />

            <button type="button" onClick={() => togglePassword("confirm")}>
              {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button
          className="change-password-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
