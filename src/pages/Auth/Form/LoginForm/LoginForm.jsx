import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { googleLoginThunk, loginThunk } from "../../../../redux/slice/authSlice";
import { getMyInfoThunk } from "../../../../redux/slice/userSlice";
import { isSeller } from "../../../../utils/auth";
import Button from "../../../../components/common/Button/Button";
import AuthShell from "../../components/AuthShell";
import PasswordField from "../../components/PasswordField";
import GoogleAuthButton from "../../components/GoogleAuthButton";

import "../../shared.scss";
import "./LoginForm.scss";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleAuthSuccess = async (result) => {
    await dispatch(getMyInfoThunk()).unwrap();
    toast.success("Login successful!");

    if (result.role.toLowerCase() === "admin") {
      navigate("/admin");
      return;
    }

    if (isSeller(result.role)) {
      navigate("/seller");
      return;
    }

    navigate("/");
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const result = await dispatch(
        loginThunk({
          email: loginData.email,
          password: loginData.password,
        }),
      ).unwrap();

      await handleAuthSuccess(result);
    } catch (error) {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error(error || "Login failed!");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginGoogle = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      toast.error("Google login failed.");
      return;
    }

    try {
      const result = await dispatch(
        googleLoginThunk(credentialResponse.credential),
      ).unwrap();

      await handleAuthSuccess(result);
    } catch (error) {
      toast.error(error || "Google login failed.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} locale="en">
      <AuthShell
        eyebrow="Welcome Back"
        title="Log in to AIDR"
        subtitle="Access your buyer, seller or admin workspace with the same modern AIDR retail experience."
      >
        <form className="auth-form" onSubmit={handleSubmitLogin}>
          <label className="auth-field" htmlFor="login-email">
            <span className="auth-field__label">Email address</span>
            <div className="auth-field__control">
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={loginData.email}
                autoComplete="email"
                onChange={(event) =>
                  setLoginData((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                required
              />
            </div>
          </label>

          <PasswordField
            id="login-password"
            name="password"
            label="Password"
            value={loginData.password}
            onChange={(event) =>
              setLoginData((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
            placeholder="Enter your password"
            showPassword={showPassword}
            onToggle={() => setShowPassword((current) => !current)}
          />

          <div className="auth-form__links">
            <span>Use the account linked to your marketplace profile.</span>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <div className="auth-form__actions">
            <Button className="auth-button" fullWidth type="submit" disabled={submitting}>
              {submitting ? "Signing in..." : "Log in"}
            </Button>

            <div className="auth-form__divider">or</div>

            <GoogleAuthButton
              onSuccess={handleLoginGoogle}
              onError={() => toast.error("Google login failed.")}
              text="continue_with"
              label="Continue with Google"
            />
          </div>
        </form>

        <div className="auth-ui__footer">
          Don&apos;t have an account? <Link to="/register">Create account</Link>
        </div>
      </AuthShell>
    </GoogleOAuthProvider>
  );
}
