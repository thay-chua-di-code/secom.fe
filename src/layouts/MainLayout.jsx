import { Outlet } from "react-router-dom";

import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import ChatBox from "../components/common/Chatbox";
import Breadcrumb from "../components/common/Breadcrumb";
import "./style.scss";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Header />

      <main className="main-layout__content">
        <div className="container-custom">
          <Breadcrumb />

          <div className="main-layout__page">
            <Outlet />
          </div>
        </div>
      </main>

      <Footer />

      <ChatBox />
    </div>
  );
}
