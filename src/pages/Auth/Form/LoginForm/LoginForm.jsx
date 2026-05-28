import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../../../assets/icons/logo.jpg";
import { Mail, Lock } from "lucide-react";
import "./LoginForm.scss";
import { authService } from "../../../../service/authService";
import Button from "../../../../components/common/Button/Button";
import { loginThunk } from "../../../../redux/slice/authSlice";
import { getMyInfoThunk } from "../../../../redux/slice/userSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        loginThunk({
          email: loginData.email,
          password: loginData.password,
        }),
      ).unwrap();

      await dispatch(getMyInfoThunk()).unwrap();

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginGoogle = async (credentialResponse) => {
    if (credentialResponse) {
      await authService.loginGoogle(credentialResponse.credential);
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="form_login_container">
        {/* FORM */}
        <form className="form_login_wrapper" onSubmit={handleSubmitLogin}>
          {/* LOGO */}

          <div className="form_header flex-col-g-center">
            <Link to="/" className="form_logo">
              <img src={logo} alt="Logo" />
            </Link>
            <h2>Welcome Back!</h2>
            <p>Login to continue shopping</p>
          </div>

          {/* EMAIL */}
          <div className="form_group flex-col-g ">
            <label>Your Email</label>
            <div className="input_wrapper">
              <Mail size={18} />
              <input
                type="email"
                placeholder="name@gmail.com"
                required
                value={loginData.email}
                onChange={(e) =>
                  setLoginData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="form_group flex-col-g">
            <label>Your Password</label>
            <div className="input_wrapper">
              <Lock size={18} />
              <input
                type="password"
                placeholder="••••••••"
                required
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <div className="forgot_password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="form_login_btn">
            <Button fullWidth={true} type="submit" onClick={handleSubmitLogin}>
              Sign In
            </Button>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="google_btn_wrapper">
              <GoogleLogin
                width="100%"
                onSuccess={handleLoginGoogle}
                onError={() => {
                  console.log("Login failure!");
                }}
                text="signin_with"
                logo_alignment="left"
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="form_footer">
            <p>
              Don’t have an account?
              <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
}
