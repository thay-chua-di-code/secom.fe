import { Outlet, useLocation } from "react-router-dom";

import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import ChatBox from "../components/common/Chatbox";
import Breadcrumb from "../components/common/Breadcrumb";

import "./style.scss";

export default function MainLayout() {
  const { pathname } = useLocation();

  const isHomePage = pathname === "/";

  return (
    <div className="main-layout">
      {/* Header nếu đang render trong Banner thì để comment */}
      {/* <Header /> */}

      <main
        className={`main-layout__content ${
          isHomePage ? "main-layout__content--home" : ""
        }`}
      >
        {isHomePage ? (
          <div className="main-layout__page main-layout__page--home">
            <Outlet />
          </div>
        ) : (
          <div className="container-custom">
            <Breadcrumb />

            <div className="main-layout__page">
              <Outlet />
            </div>
          </div>
        )}
      </main>

      <Footer />

      <ChatBox />
    </div>
  );
}
