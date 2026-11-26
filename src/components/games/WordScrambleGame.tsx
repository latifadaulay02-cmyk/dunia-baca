import React, { useState } from 'react';
import { ArrowLeft, Delete, Play, RotateCcw, Trophy } from 'lucide-react';
import { WORD_SCRAMBLE_ITEMS } from '../../data/gamesData';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/sound';
import { GameIconArt } from '../MascotArt';

interface Props {
  onBack: () => void;
}

function scrambleWord(word: string): { char: string; uid: string }[] {
  const letters = word.split('').map((char, idx) => ({ char, uid: `${word}-${idx}-${Math.random()}` }));
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  if (letters.map((l) => l.char).join('') === word && letters.length > 1) {
    [letters[0], letters[1]] = [letters[1], letters[0]];
  }
  return letters;
}

export const WordScrambleGame: React.FC<Props> = ({ onBack }) => {
  const { recordGameComplete, soundEnabled, playClick } = useApp();
  const [phase, setPhase] = useState<'menu' | 'playing' | 'over'>('menu');
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [pool, setPool] = useState<{ char: string; uid: string }[]>([]);
  const [picked, setPicked] = useState<{ char: string; uid: string }[]>([]);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const items = WORD_SCRAMBLE_ITEMS;
  const current = items[roundIdx];

  const loadRound = (idx: number) => {
    const w = items[idx].word;
    setRoundIdx(idx);
    setPool(scrambleWord(w));
    setPicked([]);
    setFeedback('idle');
  };

  const startGame = () => {
    playClick();
    setScore(0);
    loadRound(0);
    setPhase('playing');
  };

  const handlePickLetter = (letter: { char: string; uid: string }) => {
    if (feedback !== 'idle') return;
    playClick();
    const nextPicked = [...picked, letter];
    setPicked(nextPicked);
    setPool((p) => p.filter((l) => l.uid !== letter.uid));

    if (nextPicked.length === current.word.length) {
      const formed = nextPicked.map((l) => l.char).join('');
      if (formed === current.word) {
        soundFX.success(soundEnabled);
        setFeedback('correct');
        const nextScore = score + 15;
        setScore(nextScore);
        setTimeout(() => {
          if (roundIdx < items.length - 1) {
            loadRound(roundIdx + 1);
          } else {
            setPhase('over');
            recordGameComplete('susun-kata', 'Susun Kata Ajaib', nextScore);
          }
        }, 900);
      } else {
        soundFX.error(soundEnabled);
        setFeedback('wrong');
        setTimeout(() => {
          setPool((prev) => [...prev, ...nextPicked]);
          setPicked([]);
          setFeedback('idle');
        }, 750);
      }
    }
  };

  const handleReturnLetter = (letter: { char: string; uid: string }) => {
    if (feedback !== 'idle') return;
    playClick();
    setPicked((p) => p.filter((l) => l.uid !== letter.uid));
    setPool((prev) => [...prev, letter]);
  };

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-amber-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <button
          type="button"
          onClick={() => {
            playClick();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-amber-600 dark:text-slate-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Semua Game</span>
        </button>

        {phase === 'playing' && (
          <div className="flex items-center gap-3 text-sm font-bold tabular-nums">
            <span className="text-slate-500 dark:text-slate-400">
              Kata {roundIdx + 1}/{items.length}
            </span>
            <span className="rounded-xl bg-amber-100 px-3 py-1 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
              Skor: {score}
            </span>
          </div>
        )}
      </div>

      {phase === 'menu' && (
        <div className="py-8 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-50 dark:bg-slate-800">
            <GameIconArt iconKey="rainbow" className="h-20 w-20" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white">
            Susun Kata Ajaib
          </h2>
          <p className="mx-auto mt-2 max-w-md text-base text-slate-600 dark:text-slate-300">
            Petunjuk: Lihat gambar petunjuknya, lalu ketuk huruf-huruf acak secara berurutan untuk menyusun kata Bahasa Indonesia yang benar!
          </p>
          <button
            type="button"
            onClick={startGame}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-8 py-3.5 text-base font-bold text-slate-900 hover:bg-amber-400 active:scale-95"
          >
            <Play className="h-5 w-5 fill-current" />
            <span>Mulai Susun Kata</span>
          </button>
        </div>
      )}

      {phase === 'playing' && current && (
        <div className="mt-6 text-center">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-3xl border border-amber-100 bg-amber-50/70 p-3 dark:border-slate-700 dark:bg-slate-800">
            <GameIconArt iconKey={current.iconKey} className="h-24 w-24" />
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
            Petunjuk: {current.hint}
          </p>

          {/* Answer Slots */}
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {Array.from({ length: current.word.length }).map((_, i) => {
              const letter = picked[i];
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => letter && handleReturnLetter(letter)}
                  disabled={!letter}
                  className={`flex h-14 w-12 sm:w-14 items-center justify-center rounded-2xl border-2 font-display text-2xl font-bold transition-colors ${
                    feedback === 'correct'
                      ? 'border-emerald-400 bg-emerald-100 text-emerald-800'
                      : feedback === 'wrong'
                      ? 'border-rose-400 bg-rose-100 text-rose-800'
                      : letter
                      ? 'border-sky-400 bg-sky-50 text-sky-900 dark:bg-sky-900/40 dark:text-white'
                      : 'border-dashed border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50'
                  }`}
                >
                  {letter ? letter.char : ''}
                </button>
              );
            })}
          </div>

          {feedback === 'correct' && (
            <p className="mt-3 font-display text-lg font-bold text-emerald-600">
              Benar! Kata "{current.word}" tersusun sempurna!
            </p>
          )}
          {feedback === 'wrong' && (
            <p className="mt-3 font-display text-lg font-bold text-rose-600">
              Ups, urutannya belum pas. Coba lagi ya!
            </p>
          )}

          {/* Letter Pool */}
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {pool.map((l) => (
              <button
                key={l.uid}
                type="button"
                onClick={() => handlePickLetter(l)}
                className="flex h-14 w-12 sm:w-14 items-center justify-center rounded-2xl border border-amber-300 bg-amber-100 font-display text-2xl font-bold text-amber-950 shadow-sm transition-transform hover:-translate-y-0.5 active:scale-95 dark:border-amber-700 dark:bg-amber-900/50 dark:text-amber-100"
              >
                {l.char}
              </button>
            ))}
          </div>

          {picked.length > 0 && feedback === 'idle' && (
            <button
              type="button"
              onClick={() => {
                playClick();
                setPool((prev) => [...prev, ...picked]);
                setPicked([]);
              }}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400"
            >
              <Delete className="h-4 w-4" />
              <span>Kosongkan Jawaban</span>
            </button>
          )}
        </div>
      )}

      {phase === 'over' && (
        <div className="py-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-100 text-amber-600">
            <Trophy className="h-10 w-10" />
          </div>
          <h3 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white">
            Hebat! Semua Kata Tersusun!
          </h3>
          <p className="mt-2 font-mono text-xl font-bold text-emerald-600 tabular-nums">
            Total Skor: {score} Poin
          </p>
          <button
            type="button"
            onClick={startGame}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-7 py-3.5 text-sm font-bold text-slate-900 hover:bg-amber-400"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Main Lagi</span>
          </button>
        </div>
      )}
    </div>
  );
};
