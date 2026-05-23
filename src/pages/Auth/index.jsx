import React from "react";
import LoginForm from "./Form/LoginForm/LoginForm";
import RegisterForm from "./Form/RegisterForm/RegisterForm";
import { useLocation } from "react-router-dom";
import "./style.scss";
const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname.includes("login");
  return <h1>{isLogin ? <LoginForm /> : <RegisterForm />}</h1>;
};

export default AuthPage;
