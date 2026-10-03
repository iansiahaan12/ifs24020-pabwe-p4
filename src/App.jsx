import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetAuthUser } from './features/auth/states/authSlice';

// Auth pages imported directly for instant, synchronous rendering in audit tests
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';

// Heavy application pages lazy-loaded to keep initial bundle tiny and Lighthouse perf at 99-100
const HomePage = lazy(() => import('./features/lost-founds/pages/HomePage'));
const DetailPage = lazy(() => import('./features/lost-founds/pages/DetailPage'));
const UsersPage = lazy(() => import('./features/users/pages/UsersPage'));
const ProfilePage = lazy(() => import('./features/users/pages/ProfilePage'));
const LostFoundLayout = lazy(() => import('./features/lost-founds/layouts/LostFoundLayout'));

const ProtectedRoute = () => {
  const { isAuthLogin } = useSelector((state) => state.auth);
  const token = localStorage.getItem('ACCESS_TOKEN');

  if (!token && !isAuthLogin) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
};

const PageLoader = () => (
  <main className="min-h-screen flex flex-col items-center justify-center p-6 text-slate-500 bg-slate-50">
    <h1 className="text-xl font-bold text-slate-800 mb-2">Lost &amp; Founds App</h1>
    <p className="text-sm font-medium text-slate-600">Memuat halaman...</p>
  </main>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      dispatch(asyncGetAuthUser());
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Auth Routes - Rendered immediately */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      {/* Protected Routes - Loaded on demand */}
      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <Suspense fallback={<PageLoader />}>
              <LostFoundLayout />
            </Suspense>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/lost-founds" element={<HomePage />} />
          <Route path="/lost-founds/:id" element={<DetailPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;