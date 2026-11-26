import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { playClick } = useApp();

  return (
    <footer className="mt-16 border-t border-sky-100 bg-white py-12 transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              to="/"
              onClick={playClick}
              className="inline-flex items-center gap-2.5 text-xl font-bold text-sky-700 dark:text-sky-300"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-slate-900">
                <BookOpen className="h-5 w-5" />
              </span>
              <span className="font-display">DUNIA BACA</span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Petualangan Seru Dimulai dari Membaca! Platform perpustakaan digital, dongeng bersuara,
              permainan edukatif, dan ruang kreatif yang aman dan ceria untuk anak usia 5–12 tahun.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              Jelajahi Fitur
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <Link to="/perpustakaan" onClick={playClick} className="hover:text-sky-600 dark:hover:text-sky-300">
                  Perpustakaan Digital
                </Link>
              </li>
              <li>
                <Link to="/dongeng" onClick={playClick} className="hover:text-sky-600 dark:hover:text-sky-300">
                  Dunia Dongeng Interaktif
                </Link>
              </li>
              <li>
                <Link to="/games" onClick={playClick} className="hover:text-sky-600 dark:hover:text-sky-300">
                  Mini Games Edukatif
                </Link>
              </li>
              <li>
                <Link to="/kuis" onClick={playClick} className="hover:text-sky-600 dark:hover:text-sky-300">
                  Kuis Pintar
                </Link>
              </li>
              <li>
                <Link to="/kreatif" onClick={playClick} className="hover:text-sky-600 dark:hover:text-sky-300">
                  Ruang Kreatif Mewarnai
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              Informasi & Panduan
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <Link to="/pencapaian" onClick={playClick} className="hover:text-sky-600 dark:hover:text-sky-300">
                  Pencapaian & Lencana
                </Link>
              </li>
              <li>
                <Link to="/profil" onClick={playClick} className="hover:text-sky-600 dark:hover:text-sky-300">
                  Profil Petualang
                </Link>
              </li>
              <li>
                <Link to="/tentang" onClick={playClick} className="hover:text-sky-600 dark:hover:text-sky-300">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/bantuan" onClick={playClick} className="hover:text-sky-600 dark:hover:text-sky-300">
                  Pusat Bantuan
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/"
                  onClick={playClick}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100 dark:bg-slate-800 dark:text-sky-300"
                >
                  <Home className="h-3.5 w-3.5" />
                  <span>Kembali ke Beranda</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <p>© {new Date().getFullYear()} DUNIA BACA. Dirancang ramah anak untuk menumbuhkan minat baca Nusantara.</p>
          <p>Aman tanpa iklan · Progres tersimpan otomatis di perangkatmu</p>
        </div>
      </div>
    </footer>
  );
};
