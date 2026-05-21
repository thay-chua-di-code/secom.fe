import TopHeader from "./TopHeader";
import MainHeader from "./MainHeader";
import AuthModal from "../../features/Auth/AuthModal";
import { useState } from "react";

export default function Header() {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authType, setAuthType] = useState("login");

  const handleOpenLogin = () => {
    setAuthType("login");
    setOpenAuthModal(true);
  };

  const handleOpenRegister = () => {
    setAuthType("register");
    setOpenAuthModal(true);
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <TopHeader
        onOpenLogin={handleOpenLogin}
        onOpenRegister={handleOpenRegister}
      />
      <MainHeader />
      <AuthModal
        open={openAuthModal}
        type={authType}
        onClose={() => setOpenAuthModal(false)}
        onSwitchType={setAuthType}
      />
    </header>
  );
}
