import { Outlet } from "react-router-dom";

import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import ChatBox from "../components/common/Chatbox";
import Breadcrumb from "../components/common/Breadcrumb";

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen bg-[#f5f5f5]">
      <Header />

      <main className="container-custom py-6 my-6 ">
        <Breadcrumb />
        <Outlet />
      </main>

      <Footer />

      <ChatBox />
    </div>
  );
}
