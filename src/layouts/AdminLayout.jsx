import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Admin/Sidebar";

const AdminLayout = () => {
  return (
    <div className="admin-layout flex-g">
      <Sidebar />

      <main className="admin-layout__content" style={{ width: "100%" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
