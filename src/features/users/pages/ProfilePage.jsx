import React, { useEffect, useState } from 'react';
import { apiHelper } from '../../../helpers/apiHelper';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const res = await apiHelper('/users/me', { method: 'GET' });
        if (res.status === 'success') {
          setProfile(res.data.user || res.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getProfile();
  }, []);

  if (!profile) return <p className="text-center py-10">Memuat profil...</p>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Profil Saya</h2>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase">Nama</label>
          <p className="text-slate-800 font-medium">{profile.name}</p>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase">Email</label>
          <p className="text-slate-800 font-medium">{profile.email}</p>
        </div>
      </div>
    </div>
  );
}