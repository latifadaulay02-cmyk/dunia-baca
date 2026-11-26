import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Gamepad2, HelpCircle, Search, Sparkles, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BOOKS_DATA } from '../data/booksData';
import { INTERACTIVE_STORIES } from '../data/storiesData';
import { QUIZ_CATEGORIES } from '../data/quizzesData';

const GAMES_LIST = [
  { id: 'tebak-gambar', title: 'Tebak Gambar Ceria', desc: 'Tebak nama hewan, buah, benda, dan kendaraan!' },
  { id: 'puzzle-ceria', title: 'Puzzle Ceria', desc: 'Susun potongan gambar menjadi ilustrasi utuh.' },
  { id: 'susun-kata', title: 'Susun Kata Ajaib', desc: 'Rangkai huruf acak menjadi kata yang benar.' },
  { id: 'cocokkan-pasangan', title: 'Cocokkan Pasangan', desc: 'Uji daya ingatmu mencocokkan kartu gambar.' },
  { id: 'petualangan-matematika', title: 'Petualangan Matematika', desc: 'Latihan berhitung cepat dan menyenangkan!' },
];

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, playClick } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matchedBooks = BOOKS_DATA.filter(
      (b) =>
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedStories = INTERACTIVE_STORIES.filter(
      (s) =>
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.moralValue.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedGames = GAMES_LIST.filter(
      (g) => !q || g.title.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedQuizzes = QUIZ_CATEGORIES.filter(
      (c) => !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    ).slice(0, 3);

    return { matchedBooks, matchedStories, matchedGames, matchedQuizzes };
  }, [query]);

  if (!isSearchOpen) return null;

  const go = (path: string) => {
    playClick();
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 p-4 pt-16 backdrop-blur-sm"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <Search className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari buku cerita, dongeng, game, atau kuis..."
            autoFocus
            className="w-full bg-transparent text-base text-slate-800 placeholder-slate-400 focus:outline-none dark:text-white"
          />
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Tutup pencarian"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-5 space-y-6">
          {results.matchedBooks.length > 0 && (
            <div>
              <h4 className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <BookOpen className="h-4 w-4 text-sky-500" />
                <span>Buku Perpustakaan</span>
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {results.matchedBooks.map((book) => (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => go(`/perpustakaan?baca=${book.id}`)}
                    className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50/80 p-3 text-left transition-colors hover:bg-sky-50 dark:border-slate-800 dark:bg-slate-800/70 dark:hover:bg-slate-800"
                  >
                    <span className="font-display text-sm font-bold text-slate-900 dark:text-white">
                      {book.title}
                    </span>
                    <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {book.category} · {book.readingTime}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.matchedStories.length > 0 && (
            <div>
              <h4 className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span>Dunia Dongeng</span>
              </h4>
              <div className="grid gap-2">
                {results.matchedStories.map((story) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => go(`/dongeng?cerita=${story.id}`)}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-3 text-left transition-colors hover:bg-purple-50 dark:border-slate-800 dark:bg-slate-800/70 dark:hover:bg-slate-800"
                  >
                    <div>
                      <span className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        {story.title}
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Nilai moral: {story.moralValue}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.matchedGames.length > 0 && (
            <div>
              <h4 className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <Gamepad2 className="h-4 w-4 text-emerald-500" />
                <span>Mini Games Edukatif</span>
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {results.matchedGames.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => go(`/games?main=${g.id}`)}
                    className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50/80 p-3 text-left transition-colors hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-800/70 dark:hover:bg-slate-800"
                  >
                    <span className="font-display text-sm font-bold text-slate-900 dark:text-white">
                      {g.title}
                    </span>
                    <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{g.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.matchedQuizzes.length > 0 && (
            <div>
              <h4 className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <HelpCircle className="h-4 w-4 text-amber-500" />
                <span>Kuis Pintar</span>
              </h4>
              <div className="grid gap-2 sm:grid-cols-3">
                {results.matchedQuizzes.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => go(`/kuis?kategori=${encodeURIComponent(c.name)}`)}
                    className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3 text-left transition-colors hover:bg-amber-50 dark:border-slate-800 dark:bg-slate-800/70 dark:hover:bg-slate-800"
                  >
                    <span className="font-display text-sm font-bold text-slate-900 dark:text-white">
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.matchedBooks.length === 0 &&
            results.matchedStories.length === 0 &&
            results.matchedGames.length === 0 &&
            results.matchedQuizzes.length === 0 && (
              <div className="py-8 text-center">
                <p className="font-display text-lg font-bold text-slate-700 dark:text-slate-200">
                  Yah, konten tidak ditemukan!
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Coba kata kunci lain seperti "Kelinci", "Pelangi", "Matematika", atau "Roket".
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
