import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MascotAvatar } from './MascotArt';

export const HeroSection: React.FC = () => {
  const { profile, playClick } = useApp();
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-6 sm:p-10 lg:p-12 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30">
      <div className="grid items-stretch gap-8 lg:grid-cols-12">
        <div className="flex flex-col justify-center lg:col-span-6">
          <div className="flex items-center gap-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            <MascotAvatar avatarId={profile.avatar} className="h-10 w-10 shrink-0" />
            <span>Selamat datang kembali, {profile.nickname}!</span>
          </div>

          <h1
            className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[42px] dark:text-white"
            style={{ textWrap: 'balance' }}
          >
            Halo, Petualang Cilik! Siap Menjelajahi Dunia Cerita?
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Temukan puluhan buku cerita bergambar, dengarkan dongeng ajaib bersuara, mainkan mini game
            seru, dan kumpulkan lencana kebanggaan di hutan pengetahuan DUNIA BACA.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/perpustakaan"
              onClick={playClick}
              className="inline-flex items-center gap-2.5 rounded-2xl bg-sky-600 px-6 py-3.5 text-base font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-sky-700 active:scale-95 whitespace-nowrap shrink-0"
            >
              <span>Mulai Petualangan</span>
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/dongeng"
              onClick={playClick}
              className="inline-flex items-center gap-2 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-3.5 text-base font-bold text-amber-900 transition-colors hover:bg-amber-100 active:scale-95 whitespace-nowrap shrink-0 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200 dark:hover:bg-amber-900/50"
            >
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span>Dengar Dongeng</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative h-64 sm:h-80 lg:h-full min-h-[280px] overflow-hidden rounded-2xl border border-sky-100 bg-sky-100 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            {!heroImgFailed ? (
              <img
                src="/src/assets/images/hero_magical_forest_1795658318764.jpg"
                alt="Ilustrasi Hutan Ajaib Dunia Baca tempat kelinci, rubah, dan beruang membaca buku"
                referrerPolicy="no-referrer"
                onError={() => setHeroImgFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-sky-200 via-emerald-100 to-amber-100 p-8 text-center">
                <BookOpen className="h-16 w-16 text-sky-700" />
                <p className="mt-3 font-display text-xl font-bold text-slate-800">
                  Perpustakaan Hutan Ajaib
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
