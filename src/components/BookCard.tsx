import React from 'react';
import { Heart, BookOpen, CheckCircle2 } from 'lucide-react';
import { Book } from '../types';
import { useApp } from '../context/AppContext';
import { SceneIllustration } from './MascotArt';

interface BookCardProps {
  book: Book;
  onRead: (book: Book) => void;
}

const THEME_ACCENTS: Record<Book['coverTheme'], string> = {
  sky: 'bg-sky-50 border-sky-100 dark:bg-sky-950/30 dark:border-sky-900/50',
  mint: 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900/50',
  amber: 'bg-amber-50 border-amber-100 dark:bg-amber-950/30 dark:border-amber-900/50',
  pink: 'bg-pink-50 border-pink-100 dark:bg-pink-950/30 dark:border-pink-900/50',
  purple: 'bg-purple-50 border-purple-100 dark:bg-purple-950/30 dark:border-purple-900/50',
  teal: 'bg-teal-50 border-teal-100 dark:bg-teal-950/30 dark:border-teal-900/50',
};

export const BookCard: React.FC<BookCardProps> = ({ book, onRead }) => {
  const { profile, toggleFavoriteBook, playClick } = useApp();
  const isFavorite = profile.favoriteBookIds.includes(book.id);
  const isRead = profile.readBookIds.includes(book.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
      <div className={`relative aspect-[4/3] w-full overflow-hidden border-b ${THEME_ACCENTS[book.coverTheme]}`}>
        <SceneIllustration
          sceneType={book.coverIllustration}
          imageUrl={book.imageUrl}
          alt={`Sampul buku ${book.title}`}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteBook(book.id);
          }}
          aria-label={isFavorite ? `Hapus ${book.title} dari favorit` : `Tambahkan ${book.title} ke favorit`}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-2xl border shadow-sm transition-transform active:scale-90 ${
            isFavorite
              ? 'border-pink-300 bg-pink-500 text-white'
              : 'border-white/80 bg-white/90 text-slate-600 hover:text-pink-500 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-300'
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-sky-700 dark:text-sky-300">{book.category}</span>
          <span aria-hidden="true">·</span>
          <span>{book.readingTime}</span>
          <span aria-hidden="true">·</span>
          <span>{book.ageRange}</span>
          {isRead && (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Sudah Dibaca
              </span>
            </>
          )}
        </div>

        <h3 className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">
          {book.title}
        </h3>
        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          Karya {book.author}
        </p>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {book.description}
        </p>

        <button
          type="button"
          onClick={() => {
            playClick();
            onRead(book);
          }}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-sky-700 active:scale-[0.98]"
        >
          <BookOpen className="h-4 w-4" />
          <span>Baca Sekarang</span>
        </button>
      </div>
    </article>
  );
};
