import React from "react";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </aside>
      <main className="flex-1 container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
