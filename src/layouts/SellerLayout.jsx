import React from "react";
import { Outlet } from "react-router-dom";

import SidebarSeller from "../../src/pages/Seller/Sidebar/index";
import SellerHeader from "../../src/pages/Seller/Header/index";

import "./style.scss";

const SellerLayout = () => {
  return (
    <div className="seller-layout">
      <SidebarSeller />

      <main className="seller-layout__content">
        {/* <SellerHeader /> */}
        <SellerHeader />
        <div className="seller-layout__page">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SellerLayout;
