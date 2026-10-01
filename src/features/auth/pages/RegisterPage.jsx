import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { asyncRegisterUser } from '../states/authSlice';
import useInput from '../../../hooks/useInput';

export default function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [passwordConfirmation, onPasswordConfirmationChange] = useInput('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert('Konfirmasi kata sandi tidak cocok!');
      return;
    }
    const result = await dispatch(
      asyncRegisterUser({ name, email, password, password_confirmation: passwordConfirmation })
    );
    if (asyncRegisterUser.fulfilled.match(result)) {
      navigate('/auth/login');
    }
  };

  return (
    <main role="main" className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Daftar Akun Baru</h2>
        <p className="text-sm text-slate-500 mb-6 text-center">Bergabunglah untuk melaporkan barang hilang</p>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={onNameChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nama Anda"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={onEmailChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="nama@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Kata Sandi</label>
            <input
              type="password"
              value={password}
              onChange={onPasswordChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Kata Sandi</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={onPasswordConfirmationChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
          <p className="text-center text-sm text-slate-600 mt-4">
            Sudah punya akun?{' '}
            <Link to="/auth/login" className="text-blue-600 font-medium hover:underline">
              Masuk di sini
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}