import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calculator, Gamepad2, Grid, HelpCircle, Puzzle, Type } from 'lucide-react';
import { GameCard } from '../components/GameCard';
import { GuessPictureGame } from '../components/games/GuessPictureGame';
import { PuzzleGame } from '../components/games/PuzzleGame';
import { WordScrambleGame } from '../components/games/WordScrambleGame';
import { MemoryMatchGame } from '../components/games/MemoryMatchGame';
import { MathAdventureGame } from '../components/games/MathAdventureGame';

type ActiveGame =
  | null
  | 'tebak-gambar'
  | 'puzzle-ceria'
  | 'susun-kata'
  | 'cocokkan-pasangan'
  | 'petualangan-matematika';

export const GamesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeGame, setActiveGame] = useState<ActiveGame>(null);

  useEffect(() => {
    const param = searchParams.get('main') as ActiveGame;
    if (
      param &&
      ['tebak-gambar', 'puzzle-ceria', 'susun-kata', 'cocokkan-pasangan', 'petualangan-matematika'].includes(
        param
      )
    ) {
      setActiveGame(param);
    }
  }, [searchParams]);

  const selectGame = (id: ActiveGame) => {
    setActiveGame(id);
    if (id) {
      setSearchParams({ main: id });
    } else {
      setSearchParams({});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-sky-50 p-6 sm:p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <h1 className="flex items-center gap-3 font-display text-3xl font-bold text-slate-900 dark:text-white">
          <Gamepad2 className="h-8 w-8 text-emerald-600" />
          <span>Mini Games Edukatif</span>
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Pilih salah satu dari 5 permainan seru di bawah ini! Setiap permainan melatih ketangkasan
          berpikir dan memberimu poin petualangan.
        </p>
      </div>

      {activeGame === 'tebak-gambar' && <GuessPictureGame onBack={() => selectGame(null)} />}
      {activeGame === 'puzzle-ceria' && <PuzzleGame onBack={() => selectGame(null)} />}
      {activeGame === 'susun-kata' && <WordScrambleGame onBack={() => selectGame(null)} />}
      {activeGame === 'cocokkan-pasangan' && <MemoryMatchGame onBack={() => selectGame(null)} />}
      {activeGame === 'petualangan-matematika' && <MathAdventureGame onBack={() => selectGame(null)} />}

      {activeGame === null && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <GameCard
            title="Tebak Gambar"
            description="Kenali berbagai hewan, buah segar, benda, dan kendaraan lewat ilustrasi lucu."
            instruction="Lihat gambar, gunakan petunjuk jika perlu, lalu pilih jawaban yang tepat."
            accent="sky"
            icon={<HelpCircle className="h-7 w-7" />}
            onPlay={() => selectGame('tebak-gambar')}
          />

          <GameCard
            title="Puzzle Ceria"
            description="Susun potongan ilustrasi dongeng yang teracak menjadi gambar yang utuh dan indah."
            instruction="Pilih tingkat 3×3 atau 4×4, lalu ketuk dua potongan untuk menukarnya."
            accent="purple"
            icon={<Puzzle className="h-7 w-7" />}
            onPlay={() => selectGame('puzzle-ceria')}
          />

          <GameCard
            title="Susun Kata"
            description="Latih kemampuan mengeja Bahasa Indonesia dengan menyusun huruf-huruf acak."
            instruction="Perhatikan gambar petunjuk lalu ketuk huruf sesuai urutan yang benar."
            accent="amber"
            icon={<Type className="h-7 w-7" />}
            onPlay={() => selectGame('susun-kata')}
          />

          <GameCard
            title="Cocokkan Pasangan"
            description="Uji ketajaman daya ingatmu dengan mencocokkan kartu gambar dan namanya."
            instruction="Buka dua kartu setiap giliran sampai semua pasangan terbuka."
            accent="mint"
            icon={<Grid className="h-7 w-7" />}
            onPlay={() => selectGame('cocokkan-pasangan')}
          />

          <GameCard
            title="Petualangan Matematika"
            description="Tantangan penjumlahan, pengurangan, perkalian, dan pembagian seru sesuai usia anak."
            instruction="Pilih operasi hitung favoritmu dan jawab 8 soal dengan cepat dan tepat."
            accent="pink"
            icon={<Calculator className="h-7 w-7" />}
            onPlay={() => selectGame('petualangan-matematika')}
          />
        </div>
      )}
    </div>
  );
};
