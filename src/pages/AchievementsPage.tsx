import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Home, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ADVENTURE_LEVELS, BADGES, getLevelInfo } from '../data/achievementsData';
import { AchievementCard } from '../components/AchievementCard';

export const AchievementsPage: React.FC = () => {
  const { profile, playClick } = useApp();
  const levelInfo = getLevelInfo(profile.points);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-50 via-white to-purple-50 p-6 sm:p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <div>
          <h1 className="flex items-center gap-3 font-display text-3xl font-bold text-slate-900 dark:text-white">
            <Award className="h-8 w-8 text-amber-500" />
            <span>Pencapaian & Lencana Petualangan</span>
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Kumpulkan poin dari membaca buku, mendengarkan dongeng, bermain game, kuis, dan
            mewarnai untuk naik level dan membuka semua lencana!
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

      {/* Level Ladder */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
              Peringkat Saat Ini
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
              Level {levelInfo.level}: {levelInfo.name}
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-amber-100 px-4 py-2.5 font-mono text-lg font-bold text-amber-900 tabular-nums dark:bg-amber-900/40 dark:text-amber-200">
            <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
            <span>{profile.points} Poin</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          {ADVENTURE_LEVELS.map((lvl) => {
            const reached = profile.points >= lvl.minPoints;
            const current = lvl.level === levelInfo.level;
            return (
              <div
                key={lvl.level}
                className={`rounded-2xl border p-4 transition-colors ${
                  current
                    ? 'border-amber-400 bg-amber-50 dark:border-amber-600 dark:bg-amber-950/30'
                    : reached
                    ? 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/20'
                    : 'border-slate-200 bg-slate-50/70 opacity-65 dark:border-slate-800 dark:bg-slate-800/50'
                }`}
              >
                <p className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                  Level {lvl.level}
                </p>
                <p className="mt-1 font-display text-sm font-bold text-slate-900 dark:text-white">
                  {lvl.name}
                </p>
                <p className="mt-1 font-mono text-xs text-slate-500 tabular-nums dark:text-slate-400">
                  Mulai {lvl.minPoints} poin
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Badges */}
      <div>
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          Semua Lencana ({profile.unlockedBadgeIds.length} / {BADGES.length} Terbuka)
        </h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BADGES.map((badge) => (
            <AchievementCard
              key={badge.id}
              badge={badge}
              unlocked={profile.unlockedBadgeIds.includes(badge.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
