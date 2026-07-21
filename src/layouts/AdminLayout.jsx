import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Admin/Sidebar";
import AdminHeader from "../components/common/Admin/AdminHeader";

import "./style.scss";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-layout__content">
        <AdminHeader />

        <div className="admin-layout__page">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
