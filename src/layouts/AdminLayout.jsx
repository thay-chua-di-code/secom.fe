import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Admin/Sidebar";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-layout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
