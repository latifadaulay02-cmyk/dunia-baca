import React, { useState } from 'react';
import { ArrowLeft, Eye, Play, RotateCcw, Trophy } from 'lucide-react';
import { PUZZLE_IMAGES } from '../../data/gamesData';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/sound';

interface Props {
  onBack: () => void;
}

function createShuffledBoard(size: number): number[] {
  const total = size * size;
  const arr = Array.from({ length: total }, (_, i) => i);
  do {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } while (arr.every((v, idx) => v === idx));
  return arr;
}

export const PuzzleGame: React.FC<Props> = ({ onBack }) => {
  const { recordGameComplete, soundEnabled, playClick } = useApp();
  const [phase, setPhase] = useState<'menu' | 'playing' | 'over'>('menu');
  const [gridSize, setGridSize] = useState<3 | 4>(3);
  const [selectedImage, setSelectedImage] = useState(PUZZLE_IMAGES[0]);
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedTileIdx, setSelectedTileIdx] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const startGame = (size: 3 | 4 = gridSize) => {
    playClick();
    setGridSize(size);
    setTiles(createShuffledBoard(size));
    setSelectedTileIdx(null);
    setMoves(0);
    setShowPreview(false);
    setPhase('playing');
  };

  const handleTileClick = (idx: number) => {
    if (selectedTileIdx === null) {
      playClick();
      setSelectedTileIdx(idx);
      return;
    }

    if (selectedTileIdx === idx) {
      setSelectedTileIdx(null);
      return;
    }

    const next = [...tiles];
    [next[selectedTileIdx], next[idx]] = [next[idx], next[selectedTileIdx]];
    setTiles(next);
    setSelectedTileIdx(null);
    setMoves((m) => m + 1);

    const solved = next.every((val, i) => val === i);
    if (solved) {
      soundFX.victory(soundEnabled);
      const pts = gridSize === 4 ? 50 : 35;
      setTimeout(() => {
        setPhase('over');
        recordGameComplete('puzzle-ceria', `Puzzle Ceria (${gridSize}×${gridSize})`, pts);
      }, 450);
    } else {
      soundFX.click(soundEnabled);
    }
  };

  const correctCount = tiles.filter((val, idx) => val === idx).length;

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-purple-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <button
          type="button"
          onClick={() => {
            playClick();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-purple-600 dark:text-slate-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Semua Game</span>
        </button>

        {phase === 'playing' && (
          <div className="flex items-center gap-3 text-sm font-bold tabular-nums">
            <span className="text-slate-600 dark:text-slate-300">
              Tepat: {correctCount}/{tiles.length}
            </span>
            <span className="rounded-xl bg-purple-100 px-3 py-1 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200">
              Langkah: {moves}
            </span>
          </div>
        )}
      </div>

      {phase === 'menu' && (
        <div className="py-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
              Puzzle Ceria
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
              Petunjuk: Pilih gambar dongeng favoritmu, lalu tukar dua potongan puzzle hingga membentuk gambar utuh!
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PUZZLE_IMAGES.map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={() => {
                  playClick();
                  setSelectedImage(img);
                }}
                className={`overflow-hidden rounded-2xl border-2 text-left transition-all ${
                  selectedImage.id === img.id
                    ? 'border-purple-500 ring-2 ring-purple-200 dark:ring-purple-900'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="aspect-[4/3] w-full object-cover"
                />
                <p className="p-2 text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {img.title}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => startGame(3)}
              className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-purple-700"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Mulai Mudah (3×3)</span>
            </button>
            <button
              type="button"
              onClick={() => startGame(4)}
              className="inline-flex items-center gap-2 rounded-2xl border border-purple-300 bg-purple-50 px-6 py-3.5 text-sm font-bold text-purple-800 hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-950/40 dark:text-purple-200"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Mulai Tantangan (4×4)</span>
            </button>
          </div>
        </div>
      )}

      {phase === 'playing' && (
        <div className="mt-6 flex flex-col items-center">
          <div className="mb-4 flex w-full max-w-md items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Ketuk 2 potongan untuk menukar posisinya
            </p>
            <button
              type="button"
              onClick={() => {
                playClick();
                setShowPreview((p) => !p);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>{showPreview ? 'Tutup Contoh' : 'Lihat Contoh'}</span>
            </button>
          </div>

          {showPreview && (
            <div className="mb-4 w-48 overflow-hidden rounded-2xl border border-purple-200 shadow-sm">
              <img
                src={selectedImage.imageUrl}
                alt="Contoh gambar utuh"
                referrerPolicy="no-referrer"
                className="w-full h-auto"
              />
            </div>
          )}

          <div
            className="grid w-full max-w-md gap-1.5 rounded-2xl bg-purple-100 p-2 dark:bg-slate-800"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
          >
            {tiles.map((pieceIndex, slotIdx) => {
              const row = Math.floor(pieceIndex / gridSize);
              const col = pieceIndex % gridSize;
              const isSelected = selectedTileIdx === slotIdx;
              const isCorrectSlot = pieceIndex === slotIdx;

              return (
                <button
                  key={`${slotIdx}-${pieceIndex}`}
                  type="button"
                  onClick={() => handleTileClick(slotIdx)}
                  aria-label={`Potongan puzzle posisi ${slotIdx + 1}`}
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl transition-transform ${
                    isSelected
                      ? 'scale-95 ring-4 ring-amber-400 z-10'
                      : isCorrectSlot
                      ? 'ring-2 ring-emerald-400/70'
                      : 'hover:opacity-95'
                  }`}
                  style={{
                    backgroundImage: `url(${selectedImage.imageUrl})`,
                    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                    backgroundPosition: `${(col / (gridSize - 1)) * 100}% ${(row / (gridSize - 1)) * 100}%`,
                  }}
                />
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
            Puzzle Berhasil Disusun!
          </h3>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300 tabular-nums">
            Kamu menyelesaikannya dalam {moves} langkah!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => startGame(gridSize)}
              className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-6 py-3 text-sm font-bold text-white hover:bg-purple-700"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Main Lagi</span>
            </button>
            <button
              type="button"
              onClick={() => setPhase('menu')}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <span>Ganti Gambar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
