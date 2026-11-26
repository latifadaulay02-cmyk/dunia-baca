import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, Play, RotateCcw, Trophy } from 'lucide-react';
import { MEMORY_PAIR_ITEMS } from '../../data/gamesData';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/sound';
import { GameIconArt } from '../MascotArt';

interface Props {
  onBack: () => void;
}

interface CardSlot {
  uid: string;
  pairId: string;
  cardType: 'icon' | 'label';
  label: string;
  iconKey: string;
  matched: boolean;
}

function buildDeck(pairCount: number): CardSlot[] {
  const chosen = MEMORY_PAIR_ITEMS.slice(0, pairCount);
  const deck: CardSlot[] = [];
  chosen.forEach((item) => {
    deck.push({
      uid: `${item.id}-icon`,
      pairId: item.id,
      cardType: 'icon',
      label: item.label,
      iconKey: item.iconKey,
      matched: false,
    });
    deck.push({
      uid: `${item.id}-label`,
      pairId: item.id,
      cardType: 'label',
      label: item.label,
      iconKey: item.iconKey,
      matched: false,
    });
  });
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export const MemoryMatchGame: React.FC<Props> = ({ onBack }) => {
  const { recordGameComplete, soundEnabled, playClick } = useApp();
  const [phase, setPhase] = useState<'menu' | 'playing' | 'over'>('menu');
  const [pairCount, setPairCount] = useState<6 | 8>(6);
  const [cards, setCards] = useState<CardSlot[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const startGame = (pairs: 6 | 8 = pairCount) => {
    playClick();
    setPairCount(pairs);
    setCards(buildDeck(pairs));
    setFlippedIndices([]);
    setMoves(0);
    setLocked(false);
    setPhase('playing');
  };

  const handleCardClick = (idx: number) => {
    if (locked || flippedIndices.includes(idx) || cards[idx].matched) return;
    playClick();
    const nextFlipped = [...flippedIndices, idx];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = nextFlipped;
      const first = cards[firstIdx];
      const second = cards[secondIdx];

      if (first.pairId === second.pairId) {
        soundFX.success(soundEnabled);
        const updated = cards.map((c, i) =>
          i === firstIdx || i === secondIdx ? { ...c, matched: true } : c
        );
        setCards(updated);
        setFlippedIndices([]);

        if (updated.every((c) => c.matched)) {
          const pts = Math.max(25, pairCount * 8 - moves);
          setTimeout(() => {
            setPhase('over');
            recordGameComplete('cocokkan-pasangan', 'Cocokkan Pasangan', pts);
          }, 500);
        }
      } else {
        setLocked(true);
        setTimeout(() => {
          setFlippedIndices([]);
          setLocked(false);
        }, 750);
      }
    }
  };

  const matchedPairs = cards.filter((c) => c.matched).length / 2;

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <button
          type="button"
          onClick={() => {
            playClick();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-emerald-600 dark:text-slate-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Semua Game</span>
        </button>

        {phase === 'playing' && (
          <div className="flex items-center gap-3 text-sm font-bold tabular-nums">
            <span className="text-slate-600 dark:text-slate-300">
              Pasangan: {matchedPairs}/{pairCount}
            </span>
            <span className="rounded-xl bg-emerald-100 px-3 py-1 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              Langkah: {moves}
            </span>
          </div>
        )}
      </div>

      {phase === 'menu' && (
        <div className="py-8 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-50 dark:bg-slate-800">
            <GameIconArt iconKey="star" className="h-20 w-20" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white">
            Cocokkan Pasangan
          </h2>
          <p className="mx-auto mt-2 max-w-md text-base text-slate-600 dark:text-slate-300">
            Petunjuk: Buka dua kartu untuk mencocokkan setiap gambar dengan nama yang tepat!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => startGame(6)}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-emerald-700"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>6 Pasang (12 Kartu)</span>
            </button>
            <button
              type="button"
              onClick={() => startGame(8)}
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-6 py-3.5 text-sm font-bold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>8 Pasang (16 Kartu)</span>
            </button>
          </div>
        </div>
      )}

      {phase === 'playing' && (
        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {cards.map((card, idx) => {
            const isOpen = flippedIndices.includes(idx) || card.matched;
            return (
              <button
                key={card.uid}
                type="button"
                onClick={() => handleCardClick(idx)}
                className={`flex h-28 sm:h-32 flex-col items-center justify-center rounded-2xl border-2 p-2 transition-all duration-200 ${
                  card.matched
                    ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950/40'
                    : isOpen
                    ? 'border-sky-400 bg-white dark:border-sky-500 dark:bg-slate-800'
                    : 'border-sky-200 bg-sky-100 hover:bg-sky-200 dark:border-slate-700 dark:bg-slate-800/80'
                }`}
              >
                {isOpen ? (
                  card.cardType === 'icon' ? (
                    <GameIconArt iconKey={card.iconKey} className="h-16 w-16" />
                  ) : (
                    <span className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {card.label}
                    </span>
                  )
                ) : (
                  <HelpCircle className="h-8 w-8 text-sky-600/60 dark:text-sky-400/60" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {phase === 'over' && (
        <div className="py-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-100 text-amber-600">
            <Trophy className="h-10 w-10" />
          </div>
          <h3 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white">
            Semua Pasangan Ditemukan!
          </h3>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300 tabular-nums">
            Kamu menyelesaikan tantangan dalam {moves} langkah.
          </p>
          <button
            type="button"
            onClick={() => startGame(pairCount)}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-emerald-700"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Main Lagi</span>
          </button>
        </div>
      )}
    </div>
  );
};
