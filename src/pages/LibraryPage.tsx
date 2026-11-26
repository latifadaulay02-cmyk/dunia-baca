import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Heart, Search } from 'lucide-react';
import { BOOKS_DATA } from '../data/booksData';
import { Book, BookCategory } from '../types';
import { BookCard } from '../components/BookCard';
import { StoryReader } from '../components/StoryReader';
import { useApp } from '../context/AppContext';

const CATEGORIES: ('Semua' | 'Favoritku' | BookCategory)[] = [
  'Semua',
  'Dongeng',
  'Fabel',
  'Cerita Rakyat',
  'Pengetahuan',
  'Petualangan',
  'Edukasi',
  'Favoritku',
];

export const LibraryPage: React.FC = () => {
  const { profile, recordBookRead, playClick } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'Semua' | 'Favoritku' | BookCategory>('Semua');
  const [readingBook, setReadingBook] = useState<Book | null>(null);

  useEffect(() => {
    const bookId = searchParams.get('baca');
    if (bookId) {
      const found = BOOKS_DATA.find((b) => b.id === bookId);
      if (found) setReadingBook(found);
    }
  }, [searchParams]);

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return BOOKS_DATA.filter((book) => {
      const matchesQuery =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.description.toLowerCase().includes(q);

      if (!matchesQuery) return false;
      if (activeCategory === 'Semua') return true;
      if (activeCategory === 'Favoritku') return profile.favoriteBookIds.includes(book.id);
      return book.category === activeCategory;
    });
  }, [searchQuery, activeCategory, profile.favoriteBookIds]);

  const recommendations = useMemo(() => {
    if (!readingBook) return [];
    return BOOKS_DATA.filter(
      (b) => b.id !== readingBook.id && b.category === readingBook.category
    ).concat(
      BOOKS_DATA.filter((b) => b.id !== readingBook.id && b.category !== readingBook.category)
    ).slice(0, 3);
  }, [readingBook]);

  const handleOpenBook = (book: Book) => {
    setReadingBook(book);
    setSearchParams({ baca: book.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseBook = () => {
    setReadingBook(null);
    setSearchParams({});
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-emerald-50 p-6 sm:p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <h1 className="flex items-center gap-3 font-display text-3xl font-bold text-slate-900 dark:text-white">
          <BookOpen className="h-8 w-8 text-sky-600" />
          <span>Perpustakaan Digital Dunia Baca</span>
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Pilih dari 12 koleksi buku cerita bergambar, fabel, cerita rakyat Nusantara, hingga sains seru.
          Tandai buku kesukaanmu dengan ikon hati!
        </p>
      </div>

      {readingBook ? (
        <StoryReader
          title={readingBook.title}
          subtitle={`${readingBook.category} · Karya ${readingBook.author} · ${readingBook.readingTime}`}
          pages={readingBook.pages}
          alreadyCompleted={profile.readBookIds.includes(readingBook.id)}
          onComplete={() => recordBookRead(readingBook.id, readingBook.title)}
          onClose={handleCloseBook}
          recommendations={recommendations}
          onSelectRecommendation={handleOpenBook}
        />
      ) : (
        <>
          {/* Search & Category Filters */}
          <div className="space-y-4">
            <div className="relative max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul buku cerita..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      playClick();
                      setActiveCategory(cat);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-2xl px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${
                      active
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
                    }`}
                  >
                    {cat === 'Favoritku' && <Heart className="h-3.5 w-3.5 text-pink-500 fill-current" />}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Book Grid */}
          {filteredBooks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} onRead={handleOpenBook} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
              <p className="font-display text-xl font-bold text-slate-800 dark:text-white">
                {activeCategory === 'Favoritku'
                  ? 'Belum ada buku favorit yang disimpan'
                  : 'Buku yang dicari belum ditemukan'}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {activeCategory === 'Favoritku'
                  ? 'Ketuk tombol hati pada kartu buku mana saja untuk menyimpannya di sini.'
                  : 'Coba ubah kata kunci pencarian atau pilih kategori Semua.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Semua');
                }}
                className="mt-5 rounded-2xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-sky-700"
              >
                Tampilkan Semua Buku
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
