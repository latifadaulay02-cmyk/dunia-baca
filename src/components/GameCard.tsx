import React from 'react';
import { Play } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface GameCardProps {
  title: string;
  description: string;
  instruction: string;
  accent: 'sky' | 'mint' | 'amber' | 'pink' | 'purple';
  icon: React.ReactNode;
  onPlay: () => void;
}

const ACCENT_STYLES: Record<GameCardProps['accent'], string> = {
  sky: 'bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300',
  mint: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300',
  pink: 'bg-pink-50 text-pink-600 dark:bg-pink-900/40 dark:text-pink-300',
  purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300',
};

export const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  instruction,
  accent,
  icon,
  onPlay,
}) => {
  const { playClick } = useApp();

  return (
    <div className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${ACCENT_STYLES[accent]}`}>
        {icon}
      </div>

      <h3 className="mt-4 font-display text-xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {description}
      </p>
      <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
        Cara main: {instruction}
      </p>

      <button
        type="button"
        onClick={() => {
          playClick();
          onPlay();
        }}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700 active:scale-[0.98]"
      >
        <Play className="h-4 w-4 fill-current" />
        <span>Mulai Main</span>
      </button>
    </div>
  );
};
