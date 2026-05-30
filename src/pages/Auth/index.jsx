import { useLocation } from "react-router-dom";

import LoginForm from "./Form/LoginForm/LoginForm";
import RegisterForm from "./Form/RegisterForm/RegisterForm";
import ForgotPasswordForm from "./Form/ForgotPassword";
import Verify from "../Auth/Verify";
import ResetPassWord from "./Form/ResetPassWord";
import authBanner from "../../assets/images/SideImage.png";
import "./style.scss";

const AuthPage = () => {
  const { pathname } = useLocation();
  const isAuthWithBanner =
    pathname.includes("login") || pathname.includes("register");

  const renderForm = () => {
    if (pathname.includes("login")) return <LoginForm />;
    if (pathname.includes("register")) return <RegisterForm />;
    if (pathname.includes("forgot-password")) return <ForgotPasswordForm />;
    if (pathname.includes("verify-email")) return <Verify />;
    if (pathname.includes("reset-password")) return <ResetPassWord />;

    return null;
  };

  if (!isAuthWithBanner) {
    return <div className="auth-page">{renderForm()}</div>;
  }

  return (
    <div className="auth-layout">
      <div className="auth-layout__image flex-row-g hidden lg:block">
        <img src={authBanner} alt="Auth Banner" className="hidden lg:block" />
        <div className="auth-layout__form">{renderForm()}</div>
      </div>
    </div>
  );
};

export default AuthPage;
