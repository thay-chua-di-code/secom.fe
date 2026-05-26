import { Outlet } from "react-router-dom";

import Header from "../components/layouts/Header";
import CategoriesSideBar from "../components/common/CategoriesSideBar";
import Footer from "../components/layouts/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />

      <main className="container-custom py-6">
        <div className="flex gap-6">
          {/* LEFT SIDEBAR */}
          <aside className="hidden w-[260px] shrink-0 lg:block">
            <CategorySidebar />
          </aside>

          {/* MAIN CONTENT */}
          <section className="min-w-0 flex-1">
            <Outlet />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
