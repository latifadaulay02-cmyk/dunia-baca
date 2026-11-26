import React, { useState } from 'react';
import { ArrowLeft, Calculator, CheckCircle2, Play, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/sound';

interface Props {
  onBack: () => void;
}

type MathMode = 'tambah' | 'kurang' | 'kali' | 'bagi' | 'campuran';

interface MathProblem {
  prompt: string;
  answer: number;
  options: number[];
}

function generateProblem(mode: MathMode): MathProblem {
  const actualMode: Exclude<MathMode, 'campuran'> =
    mode === 'campuran'
      ? (['tambah', 'kurang', 'kali', 'bagi'] as const)[Math.floor(Math.random() * 4)]
      : mode;

  let a = 1;
  let b = 1;
  let answer = 2;
  let symbol = '+';

  if (actualMode === 'tambah') {
    a = Math.floor(Math.random() * 18) + 2;
    b = Math.floor(Math.random() * 15) + 1;
    answer = a + b;
    symbol = '+';
  } else if (actualMode === 'kurang') {
    b = Math.floor(Math.random() * 12) + 2;
    answer = Math.floor(Math.random() * 14) + 1;
    a = b + answer;
    symbol = '-';
  } else if (actualMode === 'kali') {
    a = Math.floor(Math.random() * 8) + 2;
    b = Math.floor(Math.random() * 8) + 2;
    answer = a * b;
    symbol = '×';
  } else {
    b = Math.floor(Math.random() * 7) + 2;
    answer = Math.floor(Math.random() * 8) + 2;
    a = b * answer;
    symbol = '÷';
  }

  const optionsSet = new Set<number>([answer]);
  while (optionsSet.size < 4) {
    const offset = Math.floor(Math.random() * 9) - 4;
    const candidate = Math.max(1, answer + offset);
    optionsSet.add(candidate);
  }
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    prompt: `${a} ${symbol} ${b} = ?`,
    answer,
    options,
  };
}

const MODES: { id: MathMode; label: string }[] = [
  { id: 'tambah', label: 'Penjumlahan (+)' },
  { id: 'kurang', label: 'Pengurangan (-)' },
  { id: 'kali', label: 'Perkalian (×)' },
  { id: 'bagi', label: 'Pembagian (÷)' },
  { id: 'campuran', label: 'Campuran Seru' },
];

export const MathAdventureGame: React.FC<Props> = ({ onBack }) => {
  const { recordGameComplete, soundEnabled, playClick } = useApp();
  const [phase, setPhase] = useState<'menu' | 'playing' | 'over'>('menu');
  const [mode, setMode] = useState<MathMode>('campuran');
  const [questions, setQuestions] = useState<MathProblem[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const TOTAL_ROUNDS = 8;

  const startGame = (chosenMode: MathMode = mode) => {
    playClick();
    setMode(chosenMode);
    setQuestions(Array.from({ length: TOTAL_ROUNDS }, () => generateProblem(chosenMode)));
    setIdx(0);
    setScore(0);
    setCorrectCount(0);
    setSelected(null);
    setPhase('playing');
  };

  const handleChoose = (opt: number) => {
    if (selected !== null) return;
    setSelected(opt);
    const q = questions[idx];
    const isCorrect = opt === q.answer;
    const nextScore = isCorrect ? score + 10 : score;
    const nextCorrect = isCorrect ? correctCount + 1 : correctCount;

    if (isCorrect) {
      soundFX.success(soundEnabled);
      setScore(nextScore);
      setCorrectCount(nextCorrect);
    } else {
      soundFX.error(soundEnabled);
    }

    setTimeout(() => {
      if (idx < TOTAL_ROUNDS - 1) {
        setIdx((i) => i + 1);
        setSelected(null);
      } else {
        setPhase('over');
        const isMathWin = nextCorrect >= 5;
        recordGameComplete(
          'petualangan-matematika',
          'Petualangan Matematika',
          Math.max(15, nextScore),
          isMathWin
        );
      }
    }, 850);
  };

  const currentQ = questions[idx];

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-pink-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <button
          type="button"
          onClick={() => {
            playClick();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-pink-600 dark:text-slate-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Semua Game</span>
        </button>

        {phase === 'playing' && (
          <div className="flex items-center gap-3 text-sm font-bold tabular-nums">
            <span className="text-slate-500 dark:text-slate-400">
              Soal {idx + 1}/{TOTAL_ROUNDS}
            </span>
            <span className="rounded-xl bg-pink-100 px-3 py-1 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200">
              Skor: {score}
            </span>
          </div>
        )}
      </div>

      {phase === 'menu' && (
        <div className="py-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-50 text-pink-600 dark:bg-pink-900/40 dark:text-pink-300">
            <Calculator className="h-10 w-10" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white">
            Petualangan Matematika
          </h2>
          <p className="mx-auto mt-2 max-w-md text-base text-slate-600 dark:text-slate-300">
            Petunjuk: Pilih jenis operasi hitung di bawah ini dan jawab 8 soal berhitung seru untuk meraih lencana Jago Matematika!
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  playClick();
                  setMode(m.id);
                }}
                className={`rounded-2xl border px-4 py-2.5 text-sm font-bold transition-colors ${
                  mode === m.id
                    ? 'border-pink-500 bg-pink-500 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-pink-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => startGame(mode)}
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-pink-500 px-8 py-3.5 text-base font-bold text-white shadow-sm hover:bg-pink-600 active:scale-95"
          >
            <Play className="h-5 w-5 fill-current" />
            <span>Mulai Berhitung</span>
          </button>
        </div>
      )}

      {phase === 'playing' && currentQ && (
        <div className="mt-8 text-center">
          <div className="mx-auto max-w-md rounded-3xl border border-pink-100 bg-pink-50/70 px-6 py-10 dark:border-slate-700 dark:bg-slate-800">
            <p className="font-mono text-4xl sm:text-5xl font-bold text-slate-900 tabular-nums dark:text-white">
              {currentQ.prompt}
            </p>
          </div>

          <div className="mx-auto mt-7 grid max-w-lg grid-cols-2 gap-4">
            {currentQ.options.map((opt) => {
              const isSelected = selected === opt;
              const isCorrect = opt === currentQ.answer;
              let cls =
                'border-slate-200 bg-white text-slate-900 hover:border-pink-300 hover:bg-pink-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white';

              if (selected !== null) {
                if (isCorrect) {
                  cls =
                    'border-emerald-400 bg-emerald-100 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-200';
                } else if (isSelected) {
                  cls =
                    'border-rose-400 bg-rose-100 text-rose-900 dark:border-rose-600 dark:bg-rose-900/50 dark:text-rose-200';
                }
              }

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleChoose(opt)}
                  disabled={selected !== null}
                  className={`flex items-center justify-center gap-2 rounded-2xl border py-5 font-mono text-2xl font-bold tabular-nums transition-transform active:scale-95 ${cls}`}
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
            Petualangan Matematika Selesai!
          </h3>
          <p className="mt-2 font-mono text-xl font-bold text-emerald-600 tabular-nums">
            Benar {correctCount} dari {TOTAL_ROUNDS} soal · Skor {score}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => startGame(mode)}
              className="inline-flex items-center gap-2 rounded-2xl bg-pink-500 px-7 py-3.5 text-sm font-bold text-white hover:bg-pink-600"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Main Lagi</span>
            </button>
            <button
              type="button"
              onClick={() => setPhase('menu')}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <span>Ganti Operasi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
