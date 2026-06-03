import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authService } from "../../../../service/authService";
import { loginThunk } from "../../../../redux/slice/authSlice";
import { getMyInfoThunk } from "../../../../redux/slice/userSlice";
import banner from "../../../../assets/images/SideImage.png";
import toast from "react-hot-toast";
import "./LoginForm.scss";
import Button from "../../../../components/common/Button/Button";

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
      const result = await dispatch(
        loginThunk({
          email: loginData.email,
          password: loginData.password,
        }),
      ).unwrap();
      if (result) {
        toast.success("Login successful!");
        navigate("/");
        await dispatch(getMyInfoThunk()).unwrap();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed!");
    }
  };

  const handleLoginGoogle = async (credentialResponse) => {
    if (credentialResponse) {
      await authService.loginGoogle(credentialResponse.credential);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="form_login_container">
        <div className="login_layout">
          {/* Banner */}
          <div className="login_banner">
            <img src={banner} alt="Login Banner" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmitLogin} className="form_login_wrapper">
            <div className="form_header">
              <h2>Log in to Secom</h2>
              <p>Enter your details below</p>
            </div>

            <div className="form_group">
              <div className="input_wrapper">
                <input
                  type="email"
                  placeholder="Email or Phone Number"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="form_group">
              <div className="input_wrapper">
                <input
                  type="password"
                  placeholder="Password"
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

            <div className="form_login_btn flex-col-g">
              <Button type="submit">Log In</Button>

              <div className="google_btn_wrapper">
                <GoogleLogin
                  width="100%"
                  onSuccess={handleLoginGoogle}
                  onError={() => console.log("Login failure")}
                  text="signin_with"
                />
              </div>
            </div>

            <div className="form_footer">
              <p>
                Don't have an account?
                <Link to="/register">Create Account</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
