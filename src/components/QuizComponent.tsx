import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  RotateCcw,
  Trophy,
  XCircle,
} from 'lucide-react';
import { QUIZ_CATEGORIES, QUIZ_QUESTIONS } from '../data/quizzesData';
import { QuizCategory, QuizQuestion } from '../types';
import { useApp } from '../context/AppContext';
import { soundFX } from '../utils/sound';

interface QuizComponentProps {
  initialCategory?: QuizCategory | null;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({ initialCategory = null }) => {
  const { recordQuizComplete, soundEnabled, playClick } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(initialCategory);
  const [useTimer, setUseTimer] = useState(true);
  const [phase, setPhase] = useState<'select' | 'playing' | 'result'>(
    initialCategory ? 'playing' : 'select'
  );
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    initialCategory ? QUIZ_QUESTIONS.filter((q) => q.category === initialCategory) : []
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (initialCategory) {
      startQuiz(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (phase !== 'playing' || !useTimer || selectedAnswer !== null) return;
    if (timeLeft <= 0) {
      soundFX.error(soundEnabled);
      setSelectedAnswer(-1); // Timeout marked
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, useTimer, timeLeft, selectedAnswer, soundEnabled]);

  const startQuiz = (category: QuizCategory) => {
    playClick();
    const catQuestions = QUIZ_QUESTIONS.filter((q) => q.category === category);
    setSelectedCategory(category);
    setQuestions(catQuestions);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(20);
    setPhase('playing');
  };

  const handleChooseAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    const currentQ = questions[currentIdx];
    if (idx === currentQ.correctIndex) {
      soundFX.success(soundEnabled);
      setScore((s) => s + 1);
    } else {
      soundFX.error(soundEnabled);
    }
  };

  const handleNext = () => {
    playClick();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setTimeLeft(20);
    } else {
      const earned = score * 10 + 15;
      setPhase('result');
      if (selectedCategory) {
        recordQuizComplete(selectedCategory, score, questions.length, earned);
      }
    }
  };

  if (phase === 'select') {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/50 dark:bg-amber-950/30">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Pilih Kategori Kuis Pintar
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Setiap jawaban benar memberimu poin dan penjelasan seru!
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              playClick();
              setUseTimer((t) => !t);
            }}
            className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-bold transition-colors ${
              useTimer
                ? 'border-sky-300 bg-sky-600 text-white'
                : 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>Timer 20 Detik: {useTimer ? 'Aktif' : 'Santai (Tanpa Timer)'}</span>
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {QUIZ_CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => startQuiz(cat.name)}
              className="group flex flex-col items-start rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300">
                <HelpCircle className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-900 dark:text-white">
                {cat.name}
              </h3>
              <p className="mt-1.5 flex-1 text-sm text-slate-600 dark:text-slate-300">
                {cat.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 group-hover:translate-x-1 transition-transform dark:text-sky-400">
                <span>Mulai Kuis (5 Soal)</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'playing' && questions[currentIdx]) {
    const q = questions[currentIdx];
    const progress = Math.round(((currentIdx + 1) / questions.length) * 100);

    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
              Kategori: {selectedCategory}
            </span>
            <p className="font-display text-lg font-bold text-slate-900 dark:text-white tabular-nums">
              Pertanyaan {currentIdx + 1} dari {questions.length}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {useTimer && (
              <div
                className={`inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-sm font-bold tabular-nums ${
                  timeLeft <= 5
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>{timeLeft}d</span>
              </div>
            )}
            <div className="rounded-2xl bg-emerald-50 px-3.5 py-2 text-sm font-bold text-emerald-700 tabular-nums dark:bg-emerald-900/40 dark:text-emerald-300">
              Benar: {score}
            </div>
          </div>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-sky-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h3 className="mt-6 font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {q.question}
        </h3>

        <div className="mt-6 grid gap-3">
          {q.options.map((opt, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === q.correctIndex;
            let btnStyle =
              'border-slate-200 bg-slate-50/70 text-slate-800 hover:border-sky-300 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100';

            if (selectedAnswer !== null) {
              if (isCorrect) {
                btnStyle =
                  'border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200';
              } else if (isSelected) {
                btnStyle =
                  'border-rose-400 bg-rose-50 text-rose-900 dark:border-rose-600 dark:bg-rose-900/40 dark:text-rose-200';
              }
            }

            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleChooseAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-semibold transition-colors ${btnStyle}`}
              >
                <span>
                  <span className="mr-3 font-mono text-sm font-bold opacity-60">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {opt}
                </span>
                {selectedAnswer !== null && isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                )}
                {selectedAnswer !== null && isSelected && !isCorrect && (
                  <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50/80 p-5 dark:border-sky-900/50 dark:bg-sky-950/30">
            <p className="font-display text-base font-bold text-slate-900 dark:text-white">
              {selectedAnswer === q.correctIndex
                ? 'Hebat! Jawabanmu tepat!'
                : selectedAnswer === -1
                ? 'Waktu habis! Ini jawabannya:'
                : 'Belum tepat, yuk pelajari bersama:'}
            </p>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{q.explanation}</p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-6 py-3 text-sm font-bold text-white hover:bg-sky-700"
              >
                <span>{currentIdx < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const ratio = questions.length > 0 ? score / questions.length : 0;
  const motivation =
    ratio >= 0.8
      ? 'Luar Biasa! Kamu benar-benar Bintang Pengetahuan Dunia Baca!'
      : ratio >= 0.6
      ? 'Bagus sekali! Teruslah membaca agar wawasanmu semakin luas!'
      : 'Semangat, Petualang Cilik! Setiap kesalahan adalah langkah belajar yang hebat!';

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300">
        <Trophy className="h-10 w-10" />
      </div>
      <h3 className="mt-5 font-display text-3xl font-bold text-slate-900 dark:text-white">
        Skor Kuis: {score} / {questions.length}
      </h3>
      <p className="mt-2 font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">
        +{score * 10 + 15} Poin Petualangan
      </p>
      <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
        {motivation}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {selectedCategory && (
          <button
            type="button"
            onClick={() => startQuiz(selectedCategory)}
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-6 py-3 text-sm font-bold text-white hover:bg-sky-700"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Ulangi Kuis Ini</span>
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            playClick();
            setPhase('select');
            setSelectedCategory(null);
          }}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <span>Pilih Kategori Lain</span>
        </button>
      </div>
    </div>
  );
};
