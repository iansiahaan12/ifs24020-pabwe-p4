import { memo } from "react";
import { FiLogOut } from "react-icons/fi";

function NavbarComponent({ name, onLogout }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center gap-2 font-bold">
        <img src="/logo.svg" alt="Logo Lost & Found" width="28" height="28" className="h-7 w-7" />
        Lost &amp; Found
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="text-slate-600">{name}</span>
        <button
          onClick={onLogout}
          type="button"
          aria-label="Keluar dari akun"
          className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-100 min-h-[40px]"
        >
          <FiLogOut size={16} aria-hidden="true" />
          Keluar
        </button>
      </div>
    </header>
  );
}

export default memo(NavbarComponent);