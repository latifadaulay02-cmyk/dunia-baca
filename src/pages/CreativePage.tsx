import React from 'react';
import { Palette } from 'lucide-react';
import { ColoringCanvas } from '../components/ColoringCanvas';

export const CreativePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-pink-100 bg-gradient-to-r from-pink-50 via-white to-amber-50 p-6 sm:p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <h1 className="flex items-center gap-3 font-display text-3xl font-bold text-slate-900 dark:text-white">
          <Palette className="h-8 w-8 text-pink-500" />
          <span>Ruang Kreatif & Buku Mewarnai</span>
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Ekspresikan imajinasimu! Pilih gambar kelinci, bunga, rumah jamur, naga, atau gambar
          bebas sesuka hatimu, lalu simpan hasil karyamu!
        </p>
      </div>

      <ColoringCanvas />
    </div>
  );
};
