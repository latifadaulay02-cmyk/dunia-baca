import React from 'react';
import {
  Award,
  BookOpen,
  Calculator,
  Crown,
  Gamepad2,
  Heart,
  Lock,
  Palette,
  Sparkles,
  Trophy,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '../types';

interface AchievementCardProps {
  badge: Badge;
  unlocked: boolean;
}

const COLOR_MAP: Record<Badge['color'], string> = {
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  mint: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  pink: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
};

function renderBadgeIcon(icon: string) {
  switch (icon) {
    case 'book':
      return <BookOpen className="h-7 w-7" />;
    case 'sparkles':
      return <Sparkles className="h-7 w-7" />;
    case 'calculator':
      return <Calculator className="h-7 w-7" />;
    case 'heart':
      return <Heart className="h-7 w-7" />;
    case 'gamepad':
      return <Gamepad2 className="h-7 w-7" />;
    case 'trophy':
      return <Trophy className="h-7 w-7" />;
    case 'palette':
      return <Palette className="h-7 w-7" />;
    case 'crown':
      return <Crown className="h-7 w-7" />;
    default:
      return <Award className="h-7 w-7" />;
  }
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ badge, unlocked }) => {
  return (
    <div
      className={`flex flex-col rounded-3xl border p-5 transition-all ${
        unlocked
          ? 'border-amber-200 bg-white shadow-sm dark:border-amber-800/60 dark:bg-slate-900'
          : 'border-slate-200 bg-slate-50/70 opacity-80 dark:border-slate-800 dark:bg-slate-900/50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
            unlocked ? COLOR_MAP[badge.color] : 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
          }`}
        >
          {renderBadgeIcon(badge.icon)}
        </div>

        <span
          className={`inline-flex items-center gap-1 text-xs font-bold ${
            unlocked ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          {unlocked ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span>Terbuka</span>
            </>
          ) : (
            <>
              <Lock className="h-3.5 w-3.5" />
              <span>Terkunci</span>
            </>
          )}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">
        {badge.name}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {badge.description}
      </p>
      <p className="mt-3 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
        Syarat: {badge.conditionText}
      </p>
    </div>
  );
};
