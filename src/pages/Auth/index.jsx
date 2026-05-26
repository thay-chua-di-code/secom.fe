import { useLocation } from "react-router-dom";

import LoginForm from "./Form/LoginForm/LoginForm";
import RegisterForm from "./Form/RegisterForm/RegisterForm";
import ForgotPasswordForm from "./Form/ForgotPassword/index";
import Verify from "../Auth/Verify";
import "./style.scss";

const AuthPage = () => {
  const location = useLocation();

  const pathname = location.pathname;

  if (pathname.includes("login")) {
    return <LoginForm />;
  }

  if (pathname.includes("register")) {
    return <RegisterForm />;
  }

  if (pathname.includes("forgot-password")) {
    return <ForgotPasswordForm />;
  }

  if (pathname.includes("verify-email")) {
    return <Verify />;
  }

  return null;
};

export default AuthPage;
