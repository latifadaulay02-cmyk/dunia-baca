import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calculator,
  CheckCircle2,
  Gamepad2,
  Gift,
  Grid,
  HelpCircle,
  Palette,
  Puzzle,
  Sparkles,
  Target,
  Type,
} from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { BookCard } from '../components/BookCard';
import { AchievementCard } from '../components/AchievementCard';
import { useApp } from '../context/AppContext';
import { BOOKS_DATA } from '../data/booksData';
import { INTERACTIVE_STORIES } from '../data/storiesData';
import { BADGES, DAILY_MISSIONS, getLevelInfo } from '../data/achievementsData';

export const HomePage: React.FC = () => {
  const { profile, claimMissionReward, playClick } = useApp();
  const navigate = useNavigate();
  const levelInfo = getLevelInfo(profile.points);
  const today = new Date().toISOString().slice(0, 10);

  // Recommend unread books first, or books matching favorite categories
  const recommendedBooks = [...BOOKS_DATA]
    .sort((a, b) => {
      const aRead = profile.readBookIds.includes(a.id) ? 1 : 0;
      const bRead = profile.readBookIds.includes(b.id) ? 1 : 0;
      return aRead - bRead;
    })
    .slice(0, 3);

  const popularStories = INTERACTIVE_STORIES.slice(0, 3);

  const favoriteGames = [
    {
      id: 'tebak-gambar',
      title: 'Tebak Gambar',
      desc: 'Tebak nama hewan, buah, dan kendaraan lucu!',
      icon: <HelpCircle className="h-6 w-6 text-sky-600" />,
      bg: 'bg-sky-50 dark:bg-sky-900/30',
    },
    {
      id: 'puzzle-ceria',
      title: 'Puzzle Ceria',
      desc: 'Susun potongan gambar dongeng menjadi utuh.',
      icon: <Puzzle className="h-6 w-6 text-purple-600" />,
      bg: 'bg-purple-50 dark:bg-purple-900/30',
    },
    {
      id: 'susun-kata',
      title: 'Susun Kata',
      desc: 'Rangkai huruf acak menjadi kata bermakna.',
      icon: <Type className="h-6 w-6 text-amber-600" />,
      bg: 'bg-amber-50 dark:bg-amber-900/30',
    },
    {
      id: 'petualangan-matematika',
      title: 'Petualangan Matematika',
      desc: 'Asah berhitung cepat dan menangkan poin!',
      icon: <Calculator className="h-6 w-6 text-pink-600" />,
      bg: 'bg-pink-50 dark:bg-pink-900/30',
    },
  ];

  return (
    <div className="space-y-14">
      <HeroSection />

      {/* Misi Membaca Hari Ini & Progres */}
      <section className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 rounded-3xl border border-emerald-100 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
                <Target className="h-6 w-6 text-emerald-600" />
                <span>Misi Membaca Hari Ini</span>
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Selesaikan misi harian untuk mendapatkan poin bonus petualangan!
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3.5">
            {DAILY_MISSIONS.map((mission) => {
              const currentCount = profile.dailyProgress[mission.type] || 0;
              const isCompleted = currentCount >= mission.target;
              const isClaimed = profile.claimedMissionDates[mission.id] === today;
              const pct = Math.min(100, Math.round((currentCount / mission.target) * 100));

              return (
                <div
                  key={mission.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/60"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                        {mission.title}
                      </h3>
                      <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                        +{mission.rewardPoints} Poin
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {mission.description}
                    </p>
                    <div className="mt-2.5 flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs font-semibold text-slate-600 tabular-nums dark:text-slate-300">
                        {Math.min(currentCount, mission.target)}/{mission.target}
                      </span>
                    </div>
                  </div>

                  {isClaimed ? (
                    <span className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-700 shrink-0 dark:bg-emerald-900/40 dark:text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Hadiah Diklaim</span>
                    </span>
                  ) : isCompleted ? (
                    <button
                      type="button"
                      onClick={() => claimMissionReward(mission)}
                      className="inline-flex items-center gap-1.5 rounded-2xl bg-amber-400 px-4 py-2.5 text-xs font-bold text-slate-900 shadow-sm hover:bg-amber-300 active:scale-95 shrink-0"
                    >
                      <Gift className="h-4 w-4" />
                      <span>Klaim Hadiah</span>
                    </button>
                  ) : (
                    <Link
                      to={
                        mission.type === 'read_book'
                          ? '/perpustakaan'
                          : mission.type === 'finish_story'
                          ? '/dongeng'
                          : '/games'
                      }
                      onClick={playClick}
                      className="inline-flex items-center gap-1.5 rounded-2xl border border-sky-200 bg-white px-4 py-2 text-xs font-bold text-sky-700 hover:bg-sky-50 shrink-0 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-300"
                    >
                      <span>Kerjakan</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pencapaian & Progres Membaca */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-amber-100 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
                <Award className="h-6 w-6 text-amber-500" />
                <span>Progres Membaca</span>
              </h2>
              <Link
                to="/pencapaian"
                onClick={playClick}
                className="text-xs font-bold text-sky-600 hover:underline dark:text-sky-400"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="mt-5 rounded-2xl bg-amber-50/80 p-5 dark:bg-slate-800/80">
              <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                Level Petualangan {levelInfo.level}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {levelInfo.name}
              </p>
              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-amber-200/70 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-600 tabular-nums dark:text-slate-300">
                Total {profile.points} Poin · {profile.unlockedBadgeIds.length} dari {BADGES.length} Lencana terbuka
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-sky-50 p-3 dark:bg-slate-800">
                <p className="font-mono text-xl font-bold text-sky-700 tabular-nums dark:text-sky-300">
                  {profile.readBookIds.length}
                </p>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Buku</p>
              </div>
              <div className="rounded-2xl bg-purple-50 p-3 dark:bg-slate-800">
                <p className="font-mono text-xl font-bold text-purple-700 tabular-nums dark:text-purple-300">
                  {profile.completedStoryIds.length}
                </p>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Dongeng</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-3 dark:bg-slate-800">
                <p className="font-mono text-xl font-bold text-emerald-700 tabular-nums dark:text-emerald-300">
                  {profile.gamesCompletedCount}
                </p>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Game</p>
              </div>
            </div>
          </div>

          <Link
            to="/kreatif"
            onClick={playClick}
            className="mt-6 flex items-center justify-between rounded-2xl border border-pink-200 bg-pink-50 px-5 py-4 text-sm font-bold text-pink-800 transition-colors hover:bg-pink-100 dark:border-pink-900/40 dark:bg-pink-950/30 dark:text-pink-200"
          >
            <span className="flex items-center gap-2.5">
              <Palette className="h-5 w-5 text-pink-600" />
              <span>Coba Buku Mewarnai di Ruang Kreatif!</span>
            </span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Cerita Populer (Dunia Dongeng) */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              <Sparkles className="h-7 w-7 text-purple-500" />
              <span>Cerita Populer di Dunia Dongeng</span>
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Dengarkan narasi suara sambil menikmati ilustrasi penuh warna dan pesan moral baik.
            </p>
          </div>
          <Link
            to="/dongeng"
            onClick={playClick}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-600 hover:underline dark:text-purple-400"
          >
            <span>Lihat Semua Dongeng</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {popularStories.map((story) => (
            <div
              key={story.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="aspect-[4/3] overflow-hidden bg-purple-50">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                  {story.moralValue} · {story.duration}
                </p>
                <h3 className="mt-1.5 font-display text-xl font-bold text-slate-900 dark:text-white">
                  {story.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300">
                  {story.summary}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    navigate(`/dongeng?cerita=${story.id}`);
                  }}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 px-4 py-3 text-sm font-bold text-white hover:bg-purple-700"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Buka Dongeng</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Permainan Favorit */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              <Gamepad2 className="h-7 w-7 text-emerald-600" />
              <span>Permainan Favorit</span>
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Belajar kosakata, logika, ingatan, dan berhitung lewat mini game interaktif!
            </p>
          </div>
          <Link
            to="/games"
            onClick={playClick}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:underline dark:text-emerald-400"
          >
            <span>Lihat 5 Mini Games</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {favoriteGames.map((game) => (
            <button
              key={game.id}
              type="button"
              onClick={() => {
                playClick();
                navigate(`/games?main=${game.id}`);
              }}
              className="flex flex-col items-start rounded-3xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${game.bg}`}>
                {game.icon}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">
                {game.title}
              </h3>
              <p className="mt-1 flex-1 text-sm text-slate-600 dark:text-slate-300">{game.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Main Sekarang</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Rekomendasi Buku Pilihan */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              <BookOpen className="h-7 w-7 text-sky-600" />
              <span>Rekomendasi Buku Untukmu</span>
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Pilihan buku cerita bergambar dan pengetahuan seru dari Perpustakaan Digital.
            </p>
          </div>
          <Link
            to="/perpustakaan"
            onClick={playClick}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:underline dark:text-sky-400"
          >
            <span>Jelajahi 12 Buku</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {recommendedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onRead={(b) => navigate(`/perpustakaan?baca=${b.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Lencana Preview Banner */}
      <section className="rounded-3xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-amber-50 p-6 sm:p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Kumpulkan Semua Lencana Petualangan!
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Baca buku, mainkan game, jawab kuis, dan berkarya untuk membuka lencana spesialmu.
            </p>
          </div>
          <Link
            to="/pencapaian"
            onClick={playClick}
            className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-900 hover:bg-amber-300"
          >
            <Grid className="h-4 w-4" />
            <span>Lihat Galeri Lencana</span>
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BADGES.slice(0, 4).map((b) => (
            <AchievementCard
              key={b.id}
              badge={b}
              unlocked={profile.unlockedBadgeIds.includes(b.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
