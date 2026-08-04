import { Link } from "react-router-dom";
import "./RegisterForm.scss";
import banner from "../../../../assets/images/SideImage.png";
import Button from "../../../../components/common/Button/Button";
import { authService } from "../../../../service/authService";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
    role: "Customer",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    const { email, password, fullName, confirmPassword } = registerData;

    // =========================
    // VALIDATE REQUIRED FIELDS
    // =========================

    if (!fullName.trim()) {
      toast.error("Please enter your name!");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email!");
      return;
    }

    if (!password) {
      toast.error("Please enter your password!");
      return;
    }

    if (!confirmPassword) {
      toast.error("Please confirm your password!");
      return;
    }

    // =========================
    // PASSWORD VALIDATION
    // =========================

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least 1 uppercase letter!");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least 1 lowercase letter!");
      return;
    }

    if (!/[0-9]/.test(password)) {
      toast.error("Password must contain at least 1 number!");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>[\]\\/'`~_+=;-]/.test(password)) {
      toast.error("Password must contain at least 1 special character!");
      return;
    }

    // =========================
    // CONFIRM PASSWORD
    // =========================

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must match!");
      return;
    }

    // =========================
    // REGISTER
    // =========================

    const payload = {
      email,
      password,
      fullName,
      role: registerData.role,
    };

    try {
      const result = await authService.register(payload);
      console.log("Cmp Call: ", result);

      if (result.data.success) {
        toast.success(
          "Register successfully, we'll send you an email to confirm.",
        );
      }

      if (result.message === "Email already exists.") {
        toast.error("Email already exists.");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong, please check your email register, it may be used.",
      );
    }
  };

  const handleRegisterGoogle = () => {
    alert("Handle register with Google successfully!");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="register-page">
        <div className="register-page__banner">
          <img src={banner} alt="Register Banner" />
        </div>

        <form className="register-page__form" onSubmit={handleSubmitRegister}>
          <div className="form_header">
            <h2>Create an account</h2>
            <p>Enter your details below</p>
          </div>

          <div className="form_group">
            <input
              type="text"
              placeholder="Name"
              value={registerData.fullName}
              onChange={(e) =>
                setRegisterData((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
            />
          </div>

          <div className="form_group">
            <input
              type="email"
              placeholder="Email or Phone Number"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>

          <div className="form_group">
            <div className="password-input-wrapper">
              <input
                type={showPassword.password ? "text" : "password"}
                placeholder="Password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />

              <button
                type="button"
                className="password-toggle-btn"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    password: !prev.password,
                  }))
                }
                aria-label={showPassword.password ? "Hide password" : "Show password"}
                title={showPassword.password ? "Hide password" : "Show password"}
              >
                {showPassword.password ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form_group">
            <div className="password-input-wrapper">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />

              <button
                type="button"
                className="password-toggle-btn"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
                aria-label={
                  showPassword.confirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                title={
                  showPassword.confirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showPassword.confirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form_actions">
            <Button fullWidth type="submit">
              Create Account
            </Button>

            <div className="google_btn_wrapper">
              <GoogleLogin
                width="100%"
                onSuccess={handleRegisterGoogle}
                onError={() => console.log("Register failure")}
                text="signup_with"
              />
            </div>
          </div>

          <div className="form_footer">
            <span>Already have account?</span>
            <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
}
