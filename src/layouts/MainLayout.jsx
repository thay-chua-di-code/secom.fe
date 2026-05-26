import { Outlet } from "react-router-dom";

import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />

      <main className="container-custom py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}