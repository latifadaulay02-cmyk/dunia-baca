import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Gamepad2, HelpCircle, Home, Palette, Sparkles, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const HELP_GUIDES = [
  {
    icon: <BookOpen className="h-6 w-6 text-sky-600" />,
    title: 'Cara Membaca di Perpustakaan',
    text: 'Buka menu Perpustakaan, pilih kategori atau cari judul buku, lalu tekan "Baca Sekarang". Tekan ikon hati untuk menyimpan buku favoritmu.',
  },
  {
    icon: <Volume2 className="h-6 w-6 text-purple-600" />,
    title: 'Menyalakan Suara Narasi Dongeng',
    text: 'Di Dunia Dongeng atau saat membaca buku, tekan tombol "Bacakan Suara" di kanan atas pembaca cerita. Kamu bisa menjeda atau menghentikannya kapan saja.',
  },
  {
    icon: <Gamepad2 className="h-6 w-6 text-emerald-600" />,
    title: 'Bermain Mini Games & Kuis',
    text: 'Setiap game dan kuis memiliki petunjuk bermain yang mudah diikuti. Selesaikan tantangan sampai selesai untuk mendapatkan poin dan membuka lencana.',
  },
  {
    icon: <Palette className="h-6 w-6 text-pink-600" />,
    title: 'Mewarnai & Menyimpan Gambar',
    text: 'Di Ruang Kreatif, pilih sketsa gambar, pilih warna dan ukuran kuas, lalu warnai memakai mouse atau sentuhan jari. Tekan "Simpan Karya" untuk mengunduh gambarmu.',
  },
  {
    icon: <Sparkles className="h-6 w-6 text-amber-500" />,
    title: 'Tentang Penyimpanan Poin & Profil',
    text: 'Semua poin, lencana, dan nama panggilan disimpan otomatis di browser perangkatmu tanpa perlu akun atau kata sandi.',
  },
];

export const HelpPage: React.FC = () => {
  const { playClick } = useApp();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-purple-100 bg-gradient-to-r from-purple-50 via-white to-sky-50 p-6 sm:p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <div>
          <h1 className="flex items-center gap-3 font-display text-3xl font-bold text-slate-900 dark:text-white">
            <HelpCircle className="h-8 w-8 text-purple-600" />
            <span>Pusat Bantuan Dunia Baca</span>
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Panduan singkat untuk Petualang Cilik dan Ayah/Bunda agar pengalaman membaca dan bermain
            semakin lancar.
          </p>
        </div>

        <Link
          to="/"
          onClick={playClick}
          className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-bold text-white hover:bg-sky-700"
        >
          <Home className="h-4 w-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {HELP_GUIDES.map((g) => (
          <div
            key={g.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800">
              {g.icon}
            </div>
            <h2 className="mt-4 font-display text-xl font-bold text-slate-900 dark:text-white">
              {g.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {g.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
