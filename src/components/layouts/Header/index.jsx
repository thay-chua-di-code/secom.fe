import TopHeader from "./TopHeader";
import MainHeader from "./MainHeader";
import { useState } from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-md">
      <TopHeader />
      <MainHeader />
    </header>
  );
}
