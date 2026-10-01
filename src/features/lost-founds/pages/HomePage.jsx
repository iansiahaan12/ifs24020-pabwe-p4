import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncGetLostFounds } from '../states/lostFoundSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lostFounds, loading } = useSelector((state) => state.lostFounds);

  useEffect(() => {
    dispatch(asyncGetLostFounds());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Daftar Laporan Barang</h2>
      </div>

      {loading ? (
        <p className="text-center text-slate-500 py-10">Memuat data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lostFounds && lostFounds.length > 0 ? (
            lostFounds.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/lost-founds/${item.id}`)}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 cursor-pointer hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg text-slate-800 mb-2">{item.title || item.name}</h3>
                <p className="text-sm text-slate-600 line-clamp-2 mb-4">{item.description}</p>
                <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                  {item.status || 'Aktif'}
                </span>
              </div>
            ))
          ) : (
            <p className="text-slate-500 col-span-3 text-center py-10">Belum ada laporan.</p>
          )}
        </div>
      )}
    </div>
  );
}