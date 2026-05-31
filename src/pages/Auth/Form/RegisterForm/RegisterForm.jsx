import { Mail, Lock, User, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/icons/logo.jpg";
import "./RegisterForm.scss";
import banner from "../../../../assets/images/SideImage.png";
import Button from "../../../../components/common/Button/Button";
import { authService } from "../../../../service/authService";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

export default function RegisterForm() {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
    role: "Customer",
  });
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    // if (password.trim() !== confirmPassword.trim()) {
    //   alert("Password must same confirmPassWord");
    // }

    const payload = {
      email: registerData.email,
      password: registerData.password,
      fullName: registerData.fullName,
      role: registerData.role,
    };

    await authService.register(payload);
  };

  const handleRegisterGoogle = (credentialResponse) => {
    console.log(credentialResponse);

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
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>

          <div className="form_group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={(e) =>
                setRegisterData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
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
