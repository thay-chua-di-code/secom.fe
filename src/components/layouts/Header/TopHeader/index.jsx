import { Bell, CircleHelp, Globe } from "lucide-react";
import { Link } from "react-router-dom";
export default function TopHeader({ onOpenLogin, onOpenRegister }) {
  return (
    <div className="border-b border-white/10 bg-sky-700 text-white m-4">
      <div className="container-custom flex h-10 items-center justify-between">
        {/* LEFT */}
        <div className="hidden items-center gap-5 text-xs md:flex">
          <Link className="transition hover:text-sky-100">Seller Channel</Link>

          <Link className="transition hover:text-sky-100">Download App</Link>
        </div>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-4 text-xs md:text-sm">
          <Link className="flex items-center gap-1 transition hover:text-sky-100">
            <Bell size={15} />
            Notifications
          </Link>

          <div className="h-4 w-px bg-white/20" />

          <Link
            to="/login"
            className="font-medium transition hover:text-sky-100"
            onClick={onOpenLogin}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="font-medium transition hover:text-sky-100"
            onClick={onOpenRegister}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
