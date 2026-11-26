import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, HelpCircle, Play, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { GUESS_PICTURE_ITEMS } from '../../data/gamesData';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/sound';
import { GameIconArt } from '../MascotArt';

interface Props {
  onBack: () => void;
}

export const GuessPictureGame: React.FC<Props> = ({ onBack }) => {
  const { recordGameComplete, soundEnabled, playClick } = useApp();
  const [phase, setPhase] = useState<'menu' | 'playing' | 'over'>('menu');
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const items = GUESS_PICTURE_ITEMS;
  const current = items[roundIdx];

  const startGame = () => {
    playClick();
    setRoundIdx(0);
    setScore(0);
    setSelected(null);
    setShowHint(false);
    setPhase('playing');
  };

  const handleGuess = (opt: string) => {
    if (selected !== null) return;
    setSelected(opt);
    const isCorrect = opt === current.answer;
    if (isCorrect) {
      soundFX.success(soundEnabled);
      setScore((s) => s + 10);
    } else {
      soundFX.error(soundEnabled);
    }

    setTimeout(() => {
      if (roundIdx < items.length - 1) {
        setRoundIdx((i) => i + 1);
        setSelected(null);
        setShowHint(false);
      } else {
        const finalPoints = isCorrect ? score + 10 : score;
        setPhase('over');
        recordGameComplete('tebak-gambar', 'Tebak Gambar Ceria', Math.max(15, finalPoints));
      }
    }, 1050);
  };

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-sky-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <button
          type="button"
          onClick={() => {
            playClick();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-sky-600 dark:text-slate-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Semua Game</span>
        </button>
        {phase === 'playing' && (
          <div className="flex items-center gap-4 text-sm font-bold tabular-nums">
            <span className="text-slate-500 dark:text-slate-400">
              Soal {roundIdx + 1}/{items.length}
            </span>
            <span className="rounded-xl bg-amber-100 px-3 py-1 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
              Skor: {score}
            </span>
          </div>
        )}
      </div>

      {phase === 'menu' && (
        <div className="py-8 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-sky-50 dark:bg-slate-800">
            <GameIconArt iconKey="rabbit" className="h-20 w-20" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white">
            Tebak Gambar Ceria
          </h2>
          <p className="mx-auto mt-2 max-w-md text-base text-slate-600 dark:text-slate-300">
            Petunjuk: Perhatikan gambar lucu di layar lalu pilih nama hewan, buah, kendaraan, atau benda yang tepat!
          </p>
          <button
            type="button"
            onClick={startGame}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-8 py-3.5 text-base font-bold text-white shadow-sm hover:bg-sky-700 active:scale-95"
          >
            <Play className="h-5 w-5 fill-current" />
            <span>Mulai Permainan</span>
          </button>
        </div>
      )}

      {phase === 'playing' && current && (
        <div className="mt-6 text-center">
          <p className="text-xs font-bold text-sky-600 dark:text-sky-400">
            Kategori: {current.category}
          </p>

          <motion.div
            key={current.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-4 flex h-44 w-44 items-center justify-center rounded-3xl border border-sky-100 bg-sky-50/70 p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <GameIconArt iconKey={current.iconKey} className="h-32 w-32" />
          </motion.div>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => {
                playClick();
                setShowHint((h) => !h);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:underline dark:text-purple-400"
            >
              <HelpCircle className="h-4 w-4" />
              <span>{showHint ? 'Sembunyikan Petunjuk' : 'Butuh Petunjuk?'}</span>
            </button>
            {showHint && (
              <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                {current.hint}
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3.5">
            {current.options.map((opt) => {
              const isSelected = selected === opt;
              const isCorrect = opt === current.answer;
              let btnClass =
                'border-slate-200 bg-slate-50 text-slate-800 hover:border-sky-300 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white';

              if (selected !== null) {
                if (isCorrect) {
                  btnClass =
                    'border-emerald-400 bg-emerald-100 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-200';
                } else if (isSelected) {
                  btnClass =
                    'border-rose-400 bg-rose-100 text-rose-900 dark:border-rose-600 dark:bg-rose-900/50 dark:text-rose-200';
                }
              }

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleGuess(opt)}
                  disabled={selected !== null}
                  className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 font-display text-lg font-bold transition-transform active:scale-95 ${btnClass}`}
                >
                  <span>{opt}</span>
                  {selected !== null && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                  {selected !== null && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 text-rose-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {phase === 'over' && (
        <div className="py-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-100 text-amber-600">
            <Trophy className="h-10 w-10" />
          </div>
          <h3 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white">
            Permainan Selesai!
          </h3>
          <p className="mt-2 font-mono text-xl font-bold text-emerald-600 tabular-nums">
            Skor Akhir: {score} / {items.length * 10}
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Hebat sekali! Mata dan ingatanmu sangat tajam!
          </p>
          <button
            type="button"
            onClick={startGame}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-sky-700"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Main Lagi</span>
          </button>
        </div>
      )}
    </div>
  );
};
