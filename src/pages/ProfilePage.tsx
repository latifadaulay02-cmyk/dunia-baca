import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User } from 'lucide-react';
import { UserProfile } from '../components/UserProfile';
import { useApp } from '../context/AppContext';

export const ProfilePage: React.FC = () => {
  const { playClick } = useApp();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-amber-50 p-6 sm:p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <div>
          <h1 className="flex items-center gap-3 font-display text-3xl font-bold text-slate-900 dark:text-white">
            <User className="h-8 w-8 text-sky-600" />
            <span>Profil Petualang Cilik</span>
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Ubah nama panggilan, pilih teman maskotmu, dan lihat seluruh pencapaian serta riwayat
            membacamu yang tersimpan aman di perangkat ini.
          </p>
        </div>

        <Link
          to="/"
          onClick={playClick}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <Home className="h-4 w-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <UserProfile />
    </div>
  );
};
