import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Menu,
  X,
  Palette,
  Search,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getLevelInfo } from '../data/achievementsData';
import { MascotAvatar } from './MascotArt';

const NAV_ITEMS = [
  { to: '/', label: 'Beranda' },
  { to: '/perpustakaan', label: 'Perpustakaan' },
  { to: '/dongeng', label: 'Dunia Dongeng' },
  { to: '/games', label: 'Games' },
  { to: '/kuis', label: 'Kuis' },
  { to: '/profil', label: 'Profil' },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    profile,
    darkMode,
    soundEnabled,
    toggleDarkMode,
    toggleSound,
    setIsSearchOpen,
    playClick,
  } = useApp();
  const location = useLocation();
  const levelInfo = getLevelInfo(profile.points);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sky-100 bg-white/95 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Brand Title */}
          <Link
            to="/"
            onClick={() => {
              playClick();
              closeMobile();
            }}
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-sky-700 whitespace-nowrap shrink-0 dark:text-sky-300"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-slate-900 shadow-sm">
              <BookOpen className="h-5 w-5" />
            </span>
            <span className="font-display">DUNIA BACA</span>
          </Link>

          {/* Zone 2: 6 Single-line Navigation Links */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={playClick}
                className={({ isActive }) =>
                  `relative py-1.5 whitespace-nowrap shrink-0 transition-colors hover:text-sky-600 dark:hover:text-sky-300 ${
                    isActive
                      ? 'text-sky-700 dark:text-sky-300 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-sky-500'
                      : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/kreatif"
              onClick={playClick}
              className={`hidden sm:inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-transform active:scale-95 ${
                location.pathname === '/kreatif'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'bg-pink-500 text-white hover:bg-pink-600 shadow-sm'
              }`}
            >
              <Palette className="h-4 w-4" />
              <span>Ruang Kreatif</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                playClick();
                setMobileOpen((prev) => !prev);
              }}
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              className="inline-flex lg:hidden h-11 w-11 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-700 transition-colors hover:bg-sky-100 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-300"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-sky-100 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
            <nav className="grid grid-cols-2 gap-2.5">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => {
                    playClick();
                    closeMobile();
                  }}
                  className={({ isActive }) =>
                    `flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-50 text-slate-700 hover:bg-sky-50 dark:bg-slate-800 dark:text-slate-200'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/kreatif"
                onClick={() => {
                  playClick();
                  closeMobile();
                }}
                className="flex items-center justify-center gap-2 rounded-2xl bg-pink-500 px-4 py-3 text-sm font-semibold text-white"
              >
                <Palette className="h-4 w-4" />
                <span>Ruang Kreatif</span>
              </Link>
              <Link
                to="/pencapaian"
                onClick={() => {
                  playClick();
                  closeMobile();
                }}
                className="flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-900"
              >
                <Award className="h-4 w-4" />
                <span>Pencapaian</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Slim Companion Sub-Bar for Quick Controls & Child Progress */}
      <div className="border-b border-sky-100/80 bg-sky-50/60 dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
          <Link
            to="/profil"
            onClick={playClick}
            className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-sky-700 dark:text-slate-200 dark:hover:text-sky-300"
          >
            <MascotAvatar avatarId={profile.avatar} className="h-7 w-7 shrink-0" />
            <span className="font-semibold">{profile.nickname}</span>
            <span className="text-slate-400" aria-hidden="true">·</span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Level {levelInfo.level}: {levelInfo.name}
            </span>
            <span className="text-slate-400" aria-hidden="true">·</span>
            <span className="font-mono text-xs font-bold tabular-nums text-amber-600 dark:text-amber-400">
              {profile.points} Poin
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playClick();
                setIsSearchOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 whitespace-nowrap shrink-0 transition-colors hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <Search className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
              <span>Cari Konten</span>
            </button>

            <Link
              to="/pencapaian"
              onClick={playClick}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 whitespace-nowrap shrink-0 transition-colors hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <Award className="h-3.5 w-3.5 text-amber-500" />
              <span>Pencapaian</span>
            </Link>

            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundEnabled ? 'Matikan efek suara' : 'Nyalakan efek suara'}
              title={soundEnabled ? 'Efek Suara Aktif' : 'Efek Suara Mati'}
              className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 whitespace-nowrap shrink-0 transition-colors hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <VolumeX className="h-3.5 w-3.5 text-slate-400" />
              )}
              <span className="hidden md:inline">{soundEnabled ? 'Suara Aktif' : 'Suara Mati'}</span>
            </button>

            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Ganti ke Mode Cerah' : 'Ganti ke Mode Malam'}
              title={darkMode ? 'Mode Cerah' : 'Mode Malam'}
              className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 whitespace-nowrap shrink-0 transition-colors hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {darkMode ? (
                <Sun className="h-3.5 w-3.5 text-amber-400" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-purple-600" />
              )}
              <span className="hidden md:inline">{darkMode ? 'Mode Cerah' : 'Mode Malam'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
