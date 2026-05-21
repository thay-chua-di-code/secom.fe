import { Outlet } from "react-router-dom";

import Header from "../components/layouts/Header/index";
import Footer from "../components/layouts/Footer/index";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
