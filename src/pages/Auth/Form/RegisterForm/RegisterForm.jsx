import { Mail, Lock, User, CheckCircle2 } from "lucide-react";

import { Link } from "react-router-dom";

import logo from "../../../../assets/icons/logo.jpg";

import "./RegisterForm.scss";

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
    role: "user",
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
      <div className="form_register_container">
        <form className="form_register_wrapper" onSubmit={handleSubmitRegister}>
          <div className="form_header flex-col-g-center">
            <Link to="/" className="form_logo">
              <img src={logo} alt="Logo" />
            </Link>
            <h2>Create Account</h2>
            <p>Start your shopping journey today</p>
          </div>

          <div className="form_group">
            <label>Full Name</label>

            <div className="input_wrapper">
              <User size={18} />
              <input
                type="text"
                placeholder="John Doe"
                value={registerData.fullName}
                required
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="form_group">
            <label>Your Email</label>

            <div className="input_wrapper flex-row-g">
              <Mail size={18} />
              <input
                type="email"
                placeholder="name@gmail.com"
                required
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="form_group">
            <label>Your Password</label>

            <div className="input_wrapper">
              <Lock size={18} />

              <input
                type="password"
                placeholder="••••••••"
                required
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="form_group">
            <label>Confirm Password</label>

            <div className="input_wrapper">
              <CheckCircle2 size={18} />

              <input
                type="password"
                placeholder="••••••••"
                required
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="form_register_btn">
            <Button fullWidth={true} type="submit">
              Create Account
            </Button>

            <div className="divider">
              <span>OR</span>
            </div>

            {/* GOOGLE */}
            <div className="google_btn_wrapper">
              <GoogleLogin
                width="100%"
                onSuccess={handleRegisterGoogle}
                onError={() => {
                  console.log("Register failure!");
                }}
                text="signup_with"
                logo_alignment="left"
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="form_footer">
            <p>
              Already have an account?
              <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
}
