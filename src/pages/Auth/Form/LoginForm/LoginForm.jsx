import { Link } from "react-router-dom";
import logo from "../../../../assets/icons/logo.jpg";
import { Mail, Lock } from "lucide-react";
import "./LoginForm.scss";

import Button from "../../../../components/common/Button/Button";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

export default function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmitLogin = (e) => {
    e.preventDefault();

    alert("Login successfully!");
  };

  const handleLoginGoogle = (credentialResponse) => {
    console.log(credentialResponse);

    alert("Handle login with Google successfully!");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="form_login_container">
        {/* LOGO */}
        <Link to="/" className="form_logo">
          <img src={logo} alt="Logo" />
        </Link>

        {/* FORM */}
        <form className="form_login_wrapper" onSubmit={handleSubmitLogin}>
          <div className="form_header">
            <h2>Welcome Back!</h2>
            <p>Login to continue shopping</p>
          </div>

          {/* EMAIL */}
          <div className="form_group flex-col-g ">
            <label>Your Email</label>
            <div className="input_wrapper">
              <Mail size={18} />
              <input type="email" placeholder="name@gmail.com" />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="form_group flex-col-g">
            <label>Your Password</label>
            <div className="input_wrapper">
              <Lock size={18} />
              <input type="password" placeholder="••••••••" />
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
