import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiHelper } from '../../../helpers/apiHelper';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useDocumentTitle(
    item ? `${item.title || item.name} - Detail - Lost & Founds App` : 'Detail Laporan Barang - Lost & Founds App',
    item ? item.description : 'Rincian informasi barang hilang atau temuan.'
  );

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await apiHelper(`/lost-founds/${id}`, { method: 'GET' });
        if (res.status === 'success') {
          setItem(res.data.lostFound || res.data);
        }
      } catch (err) {
        console.error('Failed to fetch detail:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  if (loading) return <main className="text-center py-10"><p className="text-slate-500">Memuat rincian...</p></main>;
  if (!item) return <main className="text-center py-10"><p className="text-red-600 font-medium">Data tidak ditemukan.</p></main>;

  return (
    <main className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <button
        onClick={() => navigate(-1)}
        type="button"
        className="mb-4 text-sm font-semibold text-blue-700 hover:underline inline-flex items-center gap-1 min-h-[44px]"
        aria-label="Kembali ke halaman sebelumnya"
      >
        &larr; Kembali
      </button>
      <h1 className="text-3xl font-bold text-slate-800 mb-4">{item.title || item.name}</h1>
      <p className="text-slate-600 mb-6 leading-relaxed">{item.description}</p>
      <div className="border-t border-slate-100 pt-4 text-sm text-slate-600 space-y-1">
        <p><span className="font-semibold text-slate-700">Lokasi:</span> {item.location || '-'}</p>
        <p><span className="font-semibold text-slate-700">Status:</span> {item.status || '-'}</p>
      </div>
    </main>
  );
}