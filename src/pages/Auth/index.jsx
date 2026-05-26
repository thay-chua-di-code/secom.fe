import { useLocation } from "react-router-dom";

import LoginForm from "./Form/LoginForm/LoginForm";
import RegisterForm from "./Form/RegisterForm/RegisterForm";
import ForgotPasswordForm from "./Form/ForgotPassword/index";

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

  return null;
};

export default AuthPage;
