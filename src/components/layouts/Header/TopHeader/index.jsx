import { Bell, CircleHelp, Globe } from "lucide-react";

export default function TopHeader({ onOpenLogin, onOpenRegister }) {
  return (
    <div className="border-b border-white/10 bg-sky-700 text-white m-4">
      <div className="container-custom flex h-10 items-center justify-between">
        {/* LEFT */}
        <div className="hidden items-center gap-5 text-xs md:flex">
          <a className="transition hover:text-sky-100">Seller Channel</a>

          <a className="transition hover:text-sky-100">Download App</a>
        </div>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-4 text-xs md:text-sm">
          <a className="flex items-center gap-1 transition hover:text-sky-100">
            <Bell size={15} />
            Notifications
          </a>

          <a className="flex items-center gap-1 transition hover:text-sky-100">
            <CircleHelp size={15} />
            Support
          </a>

          <a className="hidden items-center gap-1 transition hover:text-sky-100 sm:flex">
            <Globe size={15} />
            English
          </a>

          <div className="h-4 w-px bg-white/20" />

          <a
            className="font-medium transition hover:text-sky-100"
            onClick={onOpenLogin}
          >
            Login
          </a>

          <a
            className="font-medium transition hover:text-sky-100"
            onClick={onOpenRegister}
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
