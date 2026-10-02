import { useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { getAccessToken, removeAccessToken } from '../../../helpers/apiHelper';

export default function LostFoundLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      navigate('/auth/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    removeAccessToken();
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header & Navigasi */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center gap-3 shadow-sm">
        <Link
          to="/"
          className="text-xl font-bold text-blue-700 hover:text-blue-800 transition min-h-[48px] inline-flex items-center"
          aria-label="Lost &amp; Founds App Beranda"
        >
          Lost &amp; Founds App
        </Link>
        <nav aria-label="Menu Utama" className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="text-sm font-semibold text-slate-700 hover:text-blue-700 transition px-3.5 py-3 rounded-lg min-h-[48px] inline-flex items-center justify-center"
            aria-label="Halaman Beranda Laporan"
          >
            Beranda
          </Link>
          <Link
            to="/users"
            className="text-sm font-semibold text-slate-700 hover:text-blue-700 transition px-3.5 py-3 rounded-lg min-h-[48px] inline-flex items-center justify-center"
            aria-label="Halaman Daftar Pengguna"
          >
            Pengguna
          </Link>
          <Link
            to="/profile"
            className="text-sm font-semibold text-slate-700 hover:text-blue-700 transition px-3.5 py-3 rounded-lg min-h-[48px] inline-flex items-center justify-center"
            aria-label="Halaman Profil Pengguna"
          >
            Profil
          </Link>
          <button
            onClick={handleLogout}
            type="button"
            className="px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg text-sm font-semibold transition min-h-[48px] inline-flex items-center justify-center shadow-sm"
            aria-label="Keluar dari akun"
          >
            Keluar
          </button>
        </nav>
      </header>

      {/* Konten Utama Wrapper */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        <Outlet />
      </div>
    </div>
  );
}