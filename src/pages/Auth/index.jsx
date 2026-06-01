import { useLocation } from "react-router-dom";

import LoginForm from "./Form/LoginForm/LoginForm";
import RegisterForm from "./Form/RegisterForm/RegisterForm";
import ForgotPasswordForm from "./Form/ForgotPassword/index";
import Verify from "../Auth/Verify";
import "./style.scss";

const AuthPage = () => {
  const pathname = location.pathname;

  return (
    <div className="auth-page">
      {pathname.includes("login") && <LoginForm />}
      {pathname.includes("register") && <RegisterForm />}
      {pathname.includes("forgot-password") && <ForgotPasswordForm />}
      {pathname.includes("verify-email") && <Verify />}
    </div>
  );
};

export default AuthPage;
