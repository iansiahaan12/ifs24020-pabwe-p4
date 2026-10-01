import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiHelper } from '../../../helpers/apiHelper';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await apiHelper(`/lost-founds/${id}`, { method: 'GET' });
        if (res.status === 'success') {
          setItem(res.data.lostFound || res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  if (loading) return <p className="text-center py-10">Memuat rincian...</p>;
  if (!item) return <p className="text-center py-10 text-red-500">Data tidak ditemukan.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm font-medium text-blue-600 hover:underline"
      >
        &larr; Kembali
      </button>
      <h2 className="text-3xl font-bold text-slate-800 mb-4">{item.title || item.name}</h2>
      <p className="text-slate-600 mb-6 leading-relaxed">{item.description}</p>
      <div className="border-t border-slate-100 pt-4 text-sm text-slate-500">
        <p>Lokasi: {item.location || '-'}</p>
        <p>Status: {item.status || '-'}</p>
      </div>
    </div>
  );
}