import React, { useState } from 'react';
import { Award, BookOpen, Check, Gamepad2, History, Palette, RotateCcw, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AVATARS, BADGES, getLevelInfo } from '../data/achievementsData';
import { AvatarId } from '../types';
import { MascotAvatar } from './MascotArt';
import { AchievementCard } from './AchievementCard';

export const UserProfile: React.FC = () => {
  const { profile, updateProfileInfo, resetAllProgress, playClick } = useApp();
  const [nicknameInput, setNicknameInput] = useState(profile.nickname);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarId>(profile.avatar);
  const [confirmReset, setConfirmReset] = useState(false);

  const levelInfo = getLevelInfo(profile.points);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileInfo(nicknameInput, selectedAvatar);
  };

  return (
    <div className="space-y-8">
      {/* Top Profile Overview & Editor */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-slate-100 pb-6 dark:border-slate-800">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-sky-50 p-2 dark:bg-slate-800">
              <MascotAvatar avatarId={selectedAvatar} className="h-20 w-20" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-sky-600 dark:text-sky-400">
                Level {levelInfo.level} · {levelInfo.name}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {profile.nickname}
              </h2>
              <div className="mt-3">
                <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                  <span>{profile.points} Poin</span>
                  {levelInfo.nextLevel ? (
                    <span>Menuju Level {levelInfo.nextLevel.level} ({levelInfo.nextLevel.minPoints} poin)</span>
                  ) : (
                    <span>Level Tertinggi Tercapai!</span>
                  )}
                </div>
                <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-sky-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-300"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="nickname-input"
                className="block text-sm font-bold text-slate-800 dark:text-slate-200"
              >
                Nama Panggilan Petualang
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gunakan nama panggilan yang seru saja (tidak perlu nama lengkap atau alamat).
              </p>
              <input
                id="nickname-input"
                type="text"
                maxLength={24}
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                placeholder="Contoh: Petualang Cilik"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <span className="block text-sm font-bold text-slate-800 dark:text-slate-200">
                Pilih Karakter Maskotmu
              </span>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {AVATARS.map((av) => {
                  const active = selectedAvatar === av.id;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => {
                        playClick();
                        setSelectedAvatar(av.id);
                      }}
                      className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                        active
                          ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-200 dark:border-sky-400 dark:bg-sky-900/30 dark:ring-sky-900'
                          : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
                      }`}
                    >
                      <MascotAvatar avatarId={av.id} className="h-11 w-11 shrink-0" />
                      <div className="min-w-0">
                        <p className="truncate font-display text-sm font-bold text-slate-900 dark:text-white">
                          {av.name}
                        </p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {av.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-sky-700 active:scale-95"
              >
                <Check className="h-4 w-4" />
                <span>Simpan Profil</span>
              </button>

              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Mulai Ulang Progres</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetAllProgress();
                      setNicknameInput('Petualang Cilik');
                      setSelectedAvatar('kelinci');
                      setConfirmReset(false);
                    }}
                    className="rounded-xl bg-rose-600 px-3 py-2 text-xs font-bold text-white"
                  >
                    Ya, Reset Data
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="rounded-xl bg-slate-200 px-3 py-2 text-xs font-bold text-slate-700"
                  >
                    Batal
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Stats Summary & Activity History */}
        <div className="lg:col-span-5 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
              <Star className="h-6 w-6 text-amber-500" />
              <p className="mt-2 font-mono text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
                {profile.points}
              </p>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Total Poin</p>
            </div>

            <div className="rounded-3xl border border-sky-200 bg-sky-50/70 p-5 dark:border-sky-900/40 dark:bg-sky-950/20">
              <BookOpen className="h-6 w-6 text-sky-600" />
              <p className="mt-2 font-mono text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
                {profile.readBookIds.length + profile.completedStoryIds.length}
              </p>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Buku & Dongeng Dibaca
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
              <Gamepad2 className="h-6 w-6 text-emerald-600" />
              <p className="mt-2 font-mono text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
                {profile.gamesCompletedCount}
              </p>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Permainan Selesai
              </p>
            </div>

            <div className="rounded-3xl border border-pink-200 bg-pink-50/70 p-5 dark:border-pink-900/40 dark:bg-pink-950/20">
              <Palette className="h-6 w-6 text-pink-600" />
              <p className="mt-2 font-mono text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
                {profile.unlockedBadgeIds.length}/{BADGES.length}
              </p>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Lencana Terkumpul
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-slate-900 dark:text-white">
              <History className="h-5 w-5 text-sky-600" />
              <span>Riwayat Aktivitas Terbaru</span>
            </h3>
            <div className="mt-4 max-h-64 space-y-2.5 overflow-y-auto pr-1">
              {profile.activities.map((act) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/70"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-800 dark:text-slate-100">
                      {act.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{act.timestamp}</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
                    +{act.pointsEarned} Poin
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Earned Badges Section */}
      <div>
        <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
          <Award className="h-6 w-6 text-amber-500" />
          <span>Koleksi Lencana Penghargaan</span>
        </h3>
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
