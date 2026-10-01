import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAccessToken, removeAccessToken } from '../../../helpers/apiHelper';

export default function LostFoundLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      {/* Navbar Sederhana */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">Lost & Founds App</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Beranda
          </button>
          <button
            onClick={() => navigate('/users')}
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Pengguna
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Profil
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition"
          >
            Keluar
          </button>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}