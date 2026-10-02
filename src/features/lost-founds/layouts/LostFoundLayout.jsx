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
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition" aria-label="Lost & Founds App Beranda">
          Lost &amp; Founds App
        </Link>
        <nav aria-label="Menu Utama" className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            Beranda
          </Link>
          <Link
            to="/users"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            Pengguna
          </Link>
          <Link
            to="/profile"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            Profil
          </Link>
          <button
            onClick={handleLogout}
            type="button"
            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition"
          >
            Keluar
          </button>
        </nav>
      </header>

      {/* Konten Utama */}
      <main role="main" className="flex-1 max-w-7xl w-full mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}