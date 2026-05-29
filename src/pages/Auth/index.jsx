import { useLocation } from "react-router-dom";

import LoginForm from "./Form/LoginForm/LoginForm";
import RegisterForm from "./Form/RegisterForm/RegisterForm";
import ForgotPasswordForm from "./Form/ForgotPassword/index";
import Verify from "../Auth/Verify";
import ResetPassWord from "./Form/ResetPassWord";
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

  if (pathname.includes("reset-password")) {
    return <ResetPassWord />;
  }

  return null;
};

export default AuthPage;
