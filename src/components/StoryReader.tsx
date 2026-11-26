import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Pause,
  Play,
  RotateCcw,
  Square,
  Type,
  Volume2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Book, ComprehensionQuestion, StoryPage } from '../types';
import { useApp } from '../context/AppContext';
import { soundFX } from '../utils/sound';
import { SceneIllustration } from './MascotArt';

interface StoryReaderProps {
  title: string;
  subtitle: string;
  pages: StoryPage[];
  moralValue?: string;
  moralDescription?: string;
  comprehensionQuiz?: ComprehensionQuestion[];
  alreadyCompleted?: boolean;
  onComplete: (quizBonusPoints: number) => void;
  onClose: () => void;
  recommendations?: Book[];
  onSelectRecommendation?: (book: Book) => void;
}

export const StoryReader: React.FC<StoryReaderProps> = ({
  title,
  subtitle,
  pages,
  moralValue,
  moralDescription,
  comprehensionQuiz,
  alreadyCompleted = false,
  onComplete,
  onClose,
  recommendations = [],
  onSelectRecommendation,
}) => {
  const { soundEnabled, playClick } = useApp();
  const [pageIdx, setPageIdx] = useState(0);
  const [largeText, setLargeText] = useState(false);
  const [phase, setPhase] = useState<'reading' | 'quiz' | 'finished'>('reading');

  // Web Speech API state
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [speechState, setSpeechState] = useState<'idle' | 'playing' | 'paused'>('idle');

  // Comprehension quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const currentPage = pages[pageIdx];
  const progressPercent = Math.round(((pageIdx + 1) / pages.length) * 100);

  const stopSpeech = () => {
    if (speechSupported) {
      window.speechSynthesis.cancel();
    }
    setSpeechState('idle');
  };

  useEffect(() => {
    setPageIdx(0);
    setPhase('reading');
    setQuizIdx(0);
    setSelectedOption(null);
    setCorrectCount(0);
    stopSpeech();
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [title]);

  useEffect(() => {
    stopSpeech();
  }, [pageIdx, phase]);

  const handlePlayPauseSpeech = () => {
    if (!speechSupported) return;
    playClick();

    if (speechState === 'playing') {
      window.speechSynthesis.pause();
      setSpeechState('paused');
      return;
    }

    if (speechState === 'paused') {
      window.speechSynthesis.resume();
      setSpeechState('playing');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentPage.text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.92;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find((v) => v.lang.toLowerCase().includes('id'));
    if (idVoice) {
      utterance.voice = idVoice;
    }

    utterance.onend = () => setSpeechState('idle');
    utterance.onerror = () => setSpeechState('idle');

    setSpeechState('playing');
    window.speechSynthesis.speak(utterance);
  };

  const handleNextPage = () => {
    soundFX.pageTurn(soundEnabled);
    if (pageIdx < pages.length - 1) {
      setPageIdx((p) => p + 1);
    } else if (comprehensionQuiz && comprehensionQuiz.length > 0) {
      setPhase('quiz');
    } else {
      setPhase('finished');
      onComplete(0);
    }
  };

  const handlePrevPage = () => {
    soundFX.pageTurn(soundEnabled);
    if (pageIdx > 0) {
      setPageIdx((p) => p - 1);
    }
  };

  const handleSelectQuizOption = (idx: number) => {
    if (selectedOption !== null || !comprehensionQuiz) return;
    setSelectedOption(idx);
    const currentQ = comprehensionQuiz[quizIdx];
    if (idx === currentQ.correctIndex) {
      soundFX.success(soundEnabled);
      setCorrectCount((c) => c + 1);
    } else {
      soundFX.error(soundEnabled);
    }
  };

  const handleNextQuiz = () => {
    if (!comprehensionQuiz) return;
    playClick();
    if (quizIdx < comprehensionQuiz.length - 1) {
      setQuizIdx((i) => i + 1);
      setSelectedOption(null);
    } else {
      const bonus = correctCount * 15;
      setPhase('finished');
      onComplete(bonus);
    }
  };

  return (
    <div className="rounded-3xl border border-sky-200 bg-white p-5 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Top Reader Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <p className="text-xs font-semibold text-sky-600 dark:text-sky-400">{subtitle}</p>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {phase === 'reading' && (
            <>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setLargeText((l) => !l);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <Type className="h-4 w-4" />
                <span>{largeText ? 'Teks Normal' : 'Teks Besar'}</span>
              </button>

              {speechSupported ? (
                <div className="inline-flex items-center gap-1 rounded-xl border border-purple-200 bg-purple-50 p-1 dark:border-purple-800 dark:bg-purple-950/40">
                  <button
                    type="button"
                    onClick={handlePlayPauseSpeech}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-purple-700"
                  >
                    {speechState === 'playing' ? (
                      <>
                        <Pause className="h-3.5 w-3.5" />
                        <span>Jeda Suara</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        <span>{speechState === 'paused' ? 'Lanjut Baca' : 'Bacakan Suara'}</span>
                      </>
                    )}
                  </button>
                  {speechState !== 'idle' && (
                    <button
                      type="button"
                      onClick={stopSpeech}
                      aria-label="Hentikan narasi suara"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-purple-700 hover:bg-purple-100 dark:text-purple-300"
                    >
                      <Square className="h-3.5 w-3.5 fill-current" />
                    </button>
                  )}
                </div>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                  <Volume2 className="h-4 w-4" />
                  Narasi suara tidak didukung browser ini
                </span>
              )}
            </>
          )}

          <button
            type="button"
            onClick={() => {
              stopSpeech();
              playClick();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <X className="h-4 w-4" />
            <span>Tutup</span>
          </button>
        </div>
      </div>

      {/* Reading Phase */}
      {phase === 'reading' && currentPage && (
        <div className="mt-6">
          {/* Progress Indicator */}
          <div className="mb-5 flex items-center justify-between gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="tabular-nums">
              Halaman {pageIdx + 1} dari {pages.length}
            </span>
            <span className="tabular-nums">{progressPercent}% selesai</span>
          </div>
          <div className="mb-6 h-2.5 w-full overflow-hidden rounded-full bg-sky-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-sky-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={pageIdx}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.2 }}
              className="grid items-center gap-6 lg:grid-cols-12"
            >
              <div className="lg:col-span-6">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-sky-100 bg-sky-50 dark:border-slate-800 dark:bg-slate-800">
                  <SceneIllustration
                    sceneType={currentPage.sceneType}
                    imageUrl={currentPage.imageUrl}
                    alt={`${title} halaman ${currentPage.pageNumber}`}
                    className="h-full w-full"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center rounded-2xl bg-amber-50/60 p-6 sm:p-8 dark:bg-slate-800/60">
                <p
                  className={`leading-relaxed text-slate-800 dark:text-slate-100 ${
                    largeText ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                  }`}
                >
                  {currentPage.text}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Page Navigation */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={pageIdx === 0}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Sebelumnya</span>
            </button>

            <button
              type="button"
              onClick={handleNextPage}
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:bg-sky-700 active:scale-95"
            >
              <span>
                {pageIdx < pages.length - 1
                  ? 'Halaman Berikutnya'
                  : comprehensionQuiz && comprehensionQuiz.length > 0
                  ? 'Jawab Pertanyaan Cerita'
                  : 'Selesai Membaca'}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Comprehension Quiz Phase */}
      {phase === 'quiz' && comprehensionQuiz && (
        <div className="mt-6 mx-auto max-w-2xl">
          <div className="rounded-2xl border border-purple-100 bg-purple-50/70 p-6 sm:p-8 dark:border-purple-900/50 dark:bg-purple-950/30">
            <p className="text-xs font-bold text-purple-600 dark:text-purple-300 tabular-nums">
              Pertanyaan Pemahaman {quizIdx + 1} dari {comprehensionQuiz.length}
            </p>
            <h3 className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">
              {comprehensionQuiz[quizIdx].question}
            </h3>

            <div className="mt-5 grid gap-3">
              {comprehensionQuiz[quizIdx].options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === comprehensionQuiz[quizIdx].correctIndex;
                let styleClass =
                  'border-slate-200 bg-white text-slate-800 hover:border-purple-300 hover:bg-purple-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100';

                if (selectedOption !== null) {
                  if (isCorrect) {
                    styleClass =
                      'border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200';
                  } else if (isSelected) {
                    styleClass =
                      'border-rose-400 bg-rose-50 text-rose-900 dark:border-rose-600 dark:bg-rose-900/40 dark:text-rose-200';
                  }
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectQuizOption(idx)}
                    disabled={selectedOption !== null}
                    className={`flex items-center justify-between rounded-2xl border px-5 py-3.5 text-left text-sm font-semibold transition-colors ${styleClass}`}
                  >
                    <span>{opt}</span>
                    {selectedOption !== null && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="mt-5 rounded-2xl border border-sky-200 bg-white p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                <p className="font-bold text-sky-700 dark:text-sky-300">
                  {selectedOption === comprehensionQuiz[quizIdx].correctIndex
                    ? 'Benar sekali! +15 Poin Bonus'
                    : 'Hampir tepat! Yuk ingat kembali:'}
                </p>
                <p className="mt-1">{comprehensionQuiz[quizIdx].explanation}</p>
                <button
                  type="button"
                  onClick={handleNextQuiz}
                  className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700"
                >
                  <span>
                    {quizIdx < comprehensionQuiz.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Cerita'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Finished Phase */}
      {phase === 'finished' && (
        <div className="mt-6 text-center py-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300">
            <Award className="h-9 w-9" />
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white">
            Hore! Kamu Menyelesaikan "{title}"!
          </h3>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
            {alreadyCompleted
              ? 'Terima kasih sudah membaca ulang cerita ini! Poin petualanganmu terus bertambah.'
              : 'Selamat! Kamu mendapat poin petualangan baru untuk koleksimu.'}
          </p>

          {moralValue && (
            <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-left dark:border-emerald-800 dark:bg-emerald-950/30">
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                Pesan Moral Cerita: {moralValue}
              </p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{moralDescription}</p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                playClick();
                setPageIdx(0);
                setPhase('reading');
                setQuizIdx(0);
                setSelectedOption(null);
                setCorrectCount(0);
              }}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Baca Lagi</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                onClose();
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-6 py-3 text-sm font-bold text-white hover:bg-sky-700"
            >
              <span>Kembali ke Daftar</span>
            </button>
          </div>

          {recommendations.length > 0 && onSelectRecommendation && (
            <div className="mt-10 border-t border-slate-100 pt-6 text-left dark:border-slate-800">
              <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Rekomendasi Cerita Serupa Untukmu
              </h4>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {recommendations.map((rec) => (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() => {
                      playClick();
                      onSelectRecommendation(rec);
                    }}
                    className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-left transition-colors hover:bg-sky-50 dark:border-slate-800 dark:bg-slate-800/60"
                  >
                    <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                      {rec.category} · {rec.readingTime}
                    </span>
                    <span className="mt-1 font-display text-base font-bold text-slate-900 dark:text-white">
                      {rec.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
