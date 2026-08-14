import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { authService } from "../../../../service/authService";
import Button from "../../../../components/common/Button/Button";
import AuthShell from "../../components/AuthShell";
import PasswordField from "../../components/PasswordField";
import GoogleAuthButton from "../../components/GoogleAuthButton";

import "../../shared.scss";
import "./RegisterForm.scss";

export default function RegisterForm() {
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    setFieldError("");

    if (registerData.password !== registerData.confirmPassword) {
      setFieldError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    const payload = {
      fullName: registerData.fullName,
      email: registerData.email,
      password: registerData.password,
    };

    try {
      setSubmitting(true);
      const result = await authService.register(payload);

      if (result.data.success) {
        toast.success("Register successfully, we'll send you an email to confirm.");
      }

      if (result.message === "Email already exists.") {
        toast.error("Email already exists.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong, please check your registration details.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterGoogle = () => {
    toast("Google sign-up is not configured in this flow yet.");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthShell
        eyebrow="Create Account"
        title="Join AIDR today"
        subtitle="Create your account to explore products, follow sellers and unlock the intelligent shopping experience."
      >
        <form className="auth-form" onSubmit={handleSubmitRegister}>
          <label className="auth-field" htmlFor="register-name">
            <span className="auth-field__label">Full name</span>
            <div className="auth-field__control">
              <input
                id="register-name"
                type="text"
                placeholder="Your full name"
                value={registerData.fullName}
                onChange={(event) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    fullName: event.target.value,
                  }))
                }
                autoComplete="name"
                required
              />
            </div>
          </label>

          <label className="auth-field" htmlFor="register-email">
            <span className="auth-field__label">Email address</span>
            <div className="auth-field__control">
              <input
                id="register-email"
                type="email"
                placeholder="name@example.com"
                value={registerData.email}
                onChange={(event) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                autoComplete="email"
                required
              />
            </div>
          </label>

          <PasswordField
            id="register-password"
            name="password"
            label="Password"
            value={registerData.password}
            onChange={(event) =>
              setRegisterData((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
            placeholder="Create a password"
            showPassword={showPassword.password}
            onToggle={() =>
              setShowPassword((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
            autoComplete="new-password"
          />

          <PasswordField
            id="register-confirm-password"
            name="confirmPassword"
            label="Confirm password"
            value={registerData.confirmPassword}
            onChange={(event) =>
              setRegisterData((prev) => ({
                ...prev,
                confirmPassword: event.target.value,
              }))
            }
            placeholder="Re-enter your password"
            showPassword={showPassword.confirmPassword}
            onToggle={() =>
              setShowPassword((prev) => ({
                ...prev,
                confirmPassword: !prev.confirmPassword,
              }))
            }
            error={fieldError}
            autoComplete="new-password"
          />

          <p className="auth-form__note">
            We&apos;ll send a verification email after registration so you can activate your AIDR account securely.
          </p>

          <div className="auth-form__actions">
            <Button className="auth-button" fullWidth type="submit" disabled={submitting}>
              {submitting ? "Creating account..." : "Create account"}
            </Button>

            <div className="auth-form__divider">or</div>

            <GoogleAuthButton
              onSuccess={handleRegisterGoogle}
              onError={() => toast.error("Google sign-up failed.")}
              text="signup_with"
              label="Sign up with Google"
            />
          </div>
        </form>

        <div className="auth-ui__footer">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </AuthShell>
    </GoogleOAuthProvider>
  );
}
