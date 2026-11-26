import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Home, ShieldCheck, Sparkles } from 'lucide-react';
import { AVATARS } from '../data/achievementsData';
import { MascotAvatar } from '../components/MascotArt';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { playClick } = useApp();

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-emerald-50 p-6 sm:p-10 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Tentang DUNIA BACA
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            DUNIA BACA adalah perpustakaan digital interaktif dan taman bermain edukasi untuk anak
            usia 5–12 tahun. Kami percaya bahwa kebiasaan membaca tumbuh paling baik melalui cerita
            yang hangat, ilustrasi ceria, dan permainan yang menyenangkan.
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

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <BookOpen className="h-8 w-8 text-sky-600" />
          <h2 className="mt-4 font-display text-xl font-bold text-slate-900 dark:text-white">
            Membaca Jadi Menyenangkan
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Setiap buku dan dongeng dilengkapi gambar berwarna, pilihan huruf besar, serta fitur
            pembacaan suara agar anak pemula maupun pembaca mahir merasa nyaman.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <Sparkles className="h-8 w-8 text-purple-600" />
          <h2 className="mt-4 font-display text-xl font-bold text-slate-900 dark:text-white">
            Belajar Sambil Bermain
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Mini game edukatif, kuis pintar, dan ruang mewarnai melatih logika, kosakata Bahasa
            Indonesia, berhitung, serta kreativitas seni anak.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <ShieldCheck className="h-8 w-8 text-emerald-600" />
          <h2 className="mt-4 font-display text-xl font-bold text-slate-900 dark:text-white">
            Aman & Ramah Privasi Anak
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Tidak memerlukan login rumit, tanpa iklan, dan tidak mengumpulkan data pribadi sensitif.
            Semua progres membaca tersimpan langsung di perangkat pengguna.
          </p>
        </div>
      </div>

      {/* Mascot Friends */}
      <div className="rounded-3xl border border-amber-100 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
          <Heart className="h-6 w-6 text-pink-500" />
          <span>Kenali Sahabat Maskot Dunia Baca</span>
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AVATARS.map((av) => (
            <div
              key={av.id}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/60"
            >
              <MascotAvatar avatarId={av.id} className="h-14 w-14 shrink-0" />
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {av.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{av.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
