import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Award, X } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';
import { StoriesPage } from './pages/StoriesPage';
import { GamesPage } from './pages/GamesPage';
import { QuizPage } from './pages/QuizPage';
import { CreativePage } from './pages/CreativePage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { HelpPage } from './pages/HelpPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
};

const AppShell: React.FC = () => {
  const location = useLocation();
  const { toast, dismissToast } = useApp();

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FCFF] text-slate-800 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      <ScrollToTop />
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/perpustakaan" element={<LibraryPage />} />
              <Route path="/dongeng" element={<StoriesPage />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/kuis" element={<QuizPage />} />
              <Route path="/kreatif" element={<CreativePage />} />
              <Route path="/pencapaian" element={<AchievementsPage />} />
              <Route path="/profil" element={<ProfilePage />} />
              <Route path="/tentang" element={<AboutPage />} />
              <Route path="/bantuan" element={<HelpPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <SearchModal />

      {/* Celebratory Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="fixed bottom-5 right-5 z-50 flex max-w-sm items-start gap-3 rounded-2xl border border-amber-300 bg-white p-4 shadow-lg dark:border-amber-700 dark:bg-slate-900"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300">
              <Award className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-bold text-slate-900 dark:text-white">
                {toast.title}
              </p>
              {toast.subtitle && (
                <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">{toast.subtitle}</p>
              )}
            </div>
            <button
              type="button"
              onClick={dismissToast}
              aria-label="Tutup notifikasi"
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AppProvider>
  );
}
