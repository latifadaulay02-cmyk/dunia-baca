import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import { QuizComponent } from '../components/QuizComponent';
import { QuizCategory } from '../types';
import { QUIZ_CATEGORIES } from '../data/quizzesData';

export const QuizPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('kategori') as QuizCategory | null;
  const validCategory = QUIZ_CATEGORIES.some((c) => c.name === catParam) ? catParam : null;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-50 via-white to-sky-50 p-6 sm:p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <h1 className="flex items-center gap-3 font-display text-3xl font-bold text-slate-900 dark:text-white">
          <HelpCircle className="h-8 w-8 text-amber-500" />
          <span>Kuis Pintar Dunia Baca</span>
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Uji pengetahuanmu di 6 bidang seru: Pengetahuan Umum, Dunia Hewan, Sains, Bahasa
          Indonesia, Matematika, dan Cerita Rakyat Nusantara!
        </p>
      </div>

      <QuizComponent initialCategory={validCategory} />
    </div>
  );
};
