import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  ActivityRecord,
  AvatarId,
  DailyMission,
  UserProfileData,
} from '../types';
import { BADGES, DAILY_MISSIONS } from '../data/achievementsData';
import { soundFX } from '../utils/sound';

const PROFILE_STORAGE_KEY = 'dunia_baca_profile_v1';
const DARK_MODE_KEY = 'dunia_baca_dark_mode';
const SOUND_KEY = 'dunia_baca_sound';

function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

const DEFAULT_PROFILE: UserProfileData = {
  nickname: 'Petualang Cilik',
  avatar: 'kelinci',
  points: 50,
  readBookIds: [],
  completedStoryIds: [],
  favoriteBookIds: [],
  gamesCompletedCount: 0,
  playedGameTypes: [],
  quizzesCompletedCount: 0,
  perfectMathCount: 0,
  artworksSavedCount: 0,
  unlockedBadgeIds: [],
  claimedMissionDates: {},
  dailyProgress: {
    date: getTodayDateString(),
    read_book: 0,
    finish_story: 0,
    play_game: 0,
    finish_quiz: 0,
    save_art: 0,
  },
  activities: [
    {
      id: 'welcome-1',
      title: 'Bergabung dengan Dunia Baca!',
      type: 'badge',
      pointsEarned: 50,
      timestamp: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    },
  ],
};

interface ToastNotification {
  id: number;
  title: string;
  subtitle?: string;
}

interface AppContextType {
  profile: UserProfileData;
  darkMode: boolean;
  soundEnabled: boolean;
  isSearchOpen: boolean;
  toast: ToastNotification | null;
  toggleDarkMode: () => void;
  toggleSound: () => void;
  setIsSearchOpen: (open: boolean) => void;
  dismissToast: () => void;
  updateProfileInfo: (nickname: string, avatar: AvatarId) => void;
  toggleFavoriteBook: (bookId: string) => void;
  recordBookRead: (bookId: string, bookTitle: string) => void;
  recordStoryComplete: (storyId: string, storyTitle: string, bonusPoints?: number) => void;
  recordGameComplete: (gameType: string, gameTitle: string, pointsEarned: number, isMathWin?: boolean) => void;
  recordQuizComplete: (category: string, score: number, total: number, pointsEarned: number) => void;
  recordArtSaved: (templateName: string) => void;
  claimMissionReward: (mission: DailyMission) => void;
  resetAllProgress: () => void;
  playClick: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function evaluateNewBadges(next: UserProfileData): string[] {
  const unlocked = new Set(next.unlockedBadgeIds);

  if (next.readBookIds.length >= 3) unlocked.add('pembaca_hebat');
  if (next.completedStoryIds.length >= 2) unlocked.add('penjelajah_dongeng');
  if (next.perfectMathCount >= 1) unlocked.add('jago_matematika');
  if (next.favoriteBookIds.length >= 3) unlocked.add('sahabat_buku');
  if (next.gamesCompletedCount >= 3) unlocked.add('juara_permainan');
  if (next.quizzesCompletedCount >= 2) unlocked.add('bintang_kuis');
  if (next.artworksSavedCount >= 1) unlocked.add('seniman_cilik');
  if (next.points >= 300) unlocked.add('penjaga_hutan');

  return Array.from(unlocked);
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfileData>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as UserProfileData;
        const today = getTodayDateString();
        if (!parsed.dailyProgress || parsed.dailyProgress.date !== today) {
          parsed.dailyProgress = {
            date: today,
            read_book: 0,
            finish_story: 0,
            play_game: 0,
            finish_quiz: 0,
            save_art: 0,
          };
        }
        return { ...DEFAULT_PROFILE, ...parsed };
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_PROFILE;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(DARK_MODE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const val = localStorage.getItem(SOUND_KEY);
      return val === null ? true : val === 'true';
    } catch {
      return true;
    }
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore storage quota errors
    }
  }, [profile]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem(DARK_MODE_KEY, String(darkMode));
    } catch {
      // ignore
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem(SOUND_KEY, String(soundEnabled));
    } catch {
      // ignore
    }
  }, [soundEnabled]);

  const showToast = useCallback((title: string, subtitle?: string) => {
    const id = Date.now();
    setToast({ id, title, subtitle });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 3800);
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const playClick = useCallback(() => {
    soundFX.click(soundEnabled);
  }, [soundEnabled]);

  const toggleDarkMode = useCallback(() => {
    soundFX.click(soundEnabled);
    setDarkMode((prev) => !prev);
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) soundFX.click(true);
      return next;
    });
  }, []);

  const applyProfileUpdate = useCallback(
    (updater: (prev: UserProfileData) => UserProfileData, toastTitle?: string, toastSubtitle?: string) => {
      setProfile((prev) => {
        const today = getTodayDateString();
        const syncedPrev: UserProfileData =
          prev.dailyProgress.date === today
            ? prev
            : {
                ...prev,
                dailyProgress: {
                  date: today,
                  read_book: 0,
                  finish_story: 0,
                  play_game: 0,
                  finish_quiz: 0,
                  save_art: 0,
                },
              };

        const updated = updater(syncedPrev);
        const newBadges = evaluateNewBadges(updated);
        const newlyEarnedBadgeIds = newBadges.filter((id) => !syncedPrev.unlockedBadgeIds.includes(id));

        let finalActivities = updated.activities;
        let bonusFromBadges = 0;

        if (newlyEarnedBadgeIds.length > 0) {
          newlyEarnedBadgeIds.forEach((bId) => {
            const badge = BADGES.find((b) => b.id === bId);
            if (badge) {
              bonusFromBadges += 25;
              finalActivities = [
                {
                  id: `badge-${bId}-${Date.now()}`,
                  title: `Membuka Lencana: ${badge.name}`,
                  type: 'badge',
                  pointsEarned: 25,
                  timestamp: new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                  }),
                },
                ...finalActivities,
              ];
            }
          });
          soundFX.victory(soundEnabled);
          const firstBadge = BADGES.find((b) => b.id === newlyEarnedBadgeIds[0]);
          showToast(
            `Lencana Baru Terbuka: ${firstBadge?.name}!`,
            `Selamat! Kamu mendapat +${bonusFromBadges} Poin Bonus.`
          );
        } else if (toastTitle) {
          showToast(toastTitle, toastSubtitle);
        }

        return {
          ...updated,
          points: updated.points + bonusFromBadges,
          unlockedBadgeIds: newBadges,
          activities: finalActivities.slice(0, 25),
        };
      });
    },
    [soundEnabled, showToast]
  );

  const updateProfileInfo = useCallback(
    (nickname: string, avatar: AvatarId) => {
      const cleanName = nickname.trim().slice(0, 24) || 'Petualang Cilik';
      soundFX.success(soundEnabled);
      applyProfileUpdate(
        (prev) => ({
          ...prev,
          nickname: cleanName,
          avatar,
        }),
        'Profil Tersimpan!',
        `Halo ${cleanName}, petualanganmu siap berlanjut.`
      );
    },
    [applyProfileUpdate, soundEnabled]
  );

  const toggleFavoriteBook = useCallback(
    (bookId: string) => {
      soundFX.click(soundEnabled);
      applyProfileUpdate((prev) => {
        const exists = prev.favoriteBookIds.includes(bookId);
        const favoriteBookIds = exists
          ? prev.favoriteBookIds.filter((id) => id !== bookId)
          : [...prev.favoriteBookIds, bookId];
        return {
          ...prev,
          favoriteBookIds,
        };
      });
    },
    [applyProfileUpdate, soundEnabled]
  );

  const recordBookRead = useCallback(
    (bookId: string, bookTitle: string) => {
      soundFX.victory(soundEnabled);
      applyProfileUpdate(
        (prev) => {
          const alreadyRead = prev.readBookIds.includes(bookId);
          const earned = alreadyRead ? 10 : 30;
          const record: ActivityRecord = {
            id: `book-${Date.now()}`,
            title: `Selesai membaca "${bookTitle}"`,
            type: 'book',
            pointsEarned: earned,
            timestamp: new Date().toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
            }),
          };
          return {
            ...prev,
            points: prev.points + earned,
            readBookIds: alreadyRead ? prev.readBookIds : [...prev.readBookIds, bookId],
            dailyProgress: {
              ...prev.dailyProgress,
              read_book: prev.dailyProgress.read_book + 1,
            },
            activities: [record, ...prev.activities],
          };
        },
        'Hebat! Buku Selesai Dibaca',
        'Kamu mendapatkan poin petualangan baru!'
      );
    },
    [applyProfileUpdate, soundEnabled]
  );

  const recordStoryComplete = useCallback(
    (storyId: string, storyTitle: string, bonusPoints = 0) => {
      soundFX.victory(soundEnabled);
      applyProfileUpdate(
        (prev) => {
          const alreadyCompleted = prev.completedStoryIds.includes(storyId);
          const earned = (alreadyCompleted ? 15 : 40) + bonusPoints;
          const record: ActivityRecord = {
            id: `story-${Date.now()}`,
            title: `Menyelesaikan dongeng "${storyTitle}"`,
            type: 'story',
            pointsEarned: earned,
            timestamp: new Date().toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
            }),
          };
          return {
            ...prev,
            points: prev.points + earned,
            completedStoryIds: alreadyCompleted
              ? prev.completedStoryIds
              : [...prev.completedStoryIds, storyId],
            dailyProgress: {
              ...prev.dailyProgress,
              finish_story: prev.dailyProgress.finish_story + 1,
            },
            activities: [record, ...prev.activities],
          };
        },
        'Dongeng Selesai!',
        `Kamu meraih +${bonusPoints > 0 ? 40 + bonusPoints : 40} Poin petualangan!`
      );
    },
    [applyProfileUpdate, soundEnabled]
  );

  const recordGameComplete = useCallback(
    (gameType: string, gameTitle: string, pointsEarned: number, isMathWin = false) => {
      soundFX.victory(soundEnabled);
      applyProfileUpdate(
        (prev) => {
          const record: ActivityRecord = {
            id: `game-${Date.now()}`,
            title: `Bermain ${gameTitle}`,
            type: 'game',
            pointsEarned,
            timestamp: new Date().toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
            }),
          };
          const playedGameTypes = prev.playedGameTypes.includes(gameType)
            ? prev.playedGameTypes
            : [...prev.playedGameTypes, gameType];

          return {
            ...prev,
            points: prev.points + pointsEarned,
            gamesCompletedCount: prev.gamesCompletedCount + 1,
            playedGameTypes,
            perfectMathCount: isMathWin ? prev.perfectMathCount + 1 : prev.perfectMathCount,
            dailyProgress: {
              ...prev.dailyProgress,
              play_game: prev.dailyProgress.play_game + 1,
            },
            activities: [record, ...prev.activities],
          };
        },
        `Skor Game +${pointsEarned} Poin!`,
        `Seru sekali bermain ${gameTitle}!`
      );
    },
    [applyProfileUpdate, soundEnabled]
  );

  const recordQuizComplete = useCallback(
    (category: string, score: number, total: number, pointsEarned: number) => {
      soundFX.victory(soundEnabled);
      const isMathWin = category === 'Matematika' && score >= Math.ceil(total * 0.6);
      applyProfileUpdate(
        (prev) => {
          const record: ActivityRecord = {
            id: `quiz-${Date.now()}`,
            title: `Kuis ${category} (${score}/${total} benar)`,
            type: 'quiz',
            pointsEarned,
            timestamp: new Date().toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
            }),
          };
          return {
            ...prev,
            points: prev.points + pointsEarned,
            quizzesCompletedCount: prev.quizzesCompletedCount + 1,
            perfectMathCount: isMathWin ? prev.perfectMathCount + 1 : prev.perfectMathCount,
            dailyProgress: {
              ...prev.dailyProgress,
              finish_quiz: prev.dailyProgress.finish_quiz + 1,
            },
            activities: [record, ...prev.activities],
          };
        },
        `Kuis Selesai: +${pointsEarned} Poin!`,
        `Kamu menjawab ${score} dari ${total} soal dengan tepat.`
      );
    },
    [applyProfileUpdate, soundEnabled]
  );

  const recordArtSaved = useCallback(
    (templateName: string) => {
      soundFX.success(soundEnabled);
      applyProfileUpdate(
        (prev) => {
          const record: ActivityRecord = {
            id: `art-${Date.now()}`,
            title: `Menyimpan karya "${templateName}"`,
            type: 'art',
            pointsEarned: 25,
            timestamp: new Date().toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
            }),
          };
          return {
            ...prev,
            points: prev.points + 25,
            artworksSavedCount: prev.artworksSavedCount + 1,
            dailyProgress: {
              ...prev.dailyProgress,
              save_art: prev.dailyProgress.save_art + 1,
            },
            activities: [record, ...prev.activities],
          };
        },
        'Karya Seni Tersimpan!',
        'Kreativitasmu luar biasa! Kamu mendapat +25 Poin.'
      );
    },
    [applyProfileUpdate, soundEnabled]
  );

  const claimMissionReward = useCallback(
    (mission: DailyMission) => {
      const today = getTodayDateString();
      soundFX.victory(soundEnabled);
      applyProfileUpdate(
        (prev) => {
          if (prev.claimedMissionDates[mission.id] === today) return prev;
          const record: ActivityRecord = {
            id: `mission-${mission.id}-${Date.now()}`,
            title: `Misi Harian Selesai: ${mission.title}`,
            type: 'badge',
            pointsEarned: mission.rewardPoints,
            timestamp: new Date().toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
            }),
          };
          return {
            ...prev,
            points: prev.points + mission.rewardPoints,
            claimedMissionDates: {
              ...prev.claimedMissionDates,
              [mission.id]: today,
            },
            activities: [record, ...prev.activities],
          };
        },
        `Hadiah Misi +${mission.rewardPoints} Poin!`,
        `Hebat! Misi "${mission.title}" telah selesai.`
      );
    },
    [applyProfileUpdate, soundEnabled]
  );

  const resetAllProgress = useCallback(() => {
    soundFX.click(soundEnabled);
    const fresh: UserProfileData = {
      ...DEFAULT_PROFILE,
      dailyProgress: {
        date: getTodayDateString(),
        read_book: 0,
        finish_story: 0,
        play_game: 0,
        finish_quiz: 0,
        save_art: 0,
      },
    };
    setProfile(fresh);
    showToast('Progres Direset', 'Petualangan baru siap dimulai dari awal!');
  }, [soundEnabled, showToast]);

  // Ensure daily mission state helper stays aligned
  void DAILY_MISSIONS;

  return (
    <AppContext.Provider
      value={{
        profile,
        darkMode,
        soundEnabled,
        isSearchOpen,
        toast,
        toggleDarkMode,
        toggleSound,
        setIsSearchOpen,
        dismissToast,
        updateProfileInfo,
        toggleFavoriteBook,
        recordBookRead,
        recordStoryComplete,
        recordGameComplete,
        recordQuizComplete,
        recordArtSaved,
        claimMissionReward,
        resetAllProgress,
        playClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
}
