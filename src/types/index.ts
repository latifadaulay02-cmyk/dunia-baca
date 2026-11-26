export type BookCategory =
  | 'Dongeng'
  | 'Fabel'
  | 'Cerita Rakyat'
  | 'Pengetahuan'
  | 'Petualangan'
  | 'Edukasi';

export interface StoryPage {
  pageNumber: number;
  text: string;
  sceneType: string;
  imageUrl?: string;
  highlightWord?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  description: string;
  readingTime: string;
  ageRange: string;
  coverTheme: 'sky' | 'mint' | 'amber' | 'pink' | 'purple' | 'teal';
  coverIllustration: string;
  imageUrl?: string;
  pages: StoryPage[];
}

export interface ComprehensionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InteractiveStory {
  id: string;
  title: string;
  moralValue: string;
  moralDescription: string;
  duration: string;
  coverImage: string;
  accentColor: 'mint' | 'sky' | 'purple' | 'amber' | 'pink';
  summary: string;
  pages: StoryPage[];
  quiz: ComprehensionQuestion[];
}

export type QuizCategory =
  | 'Pengetahuan Umum'
  | 'Dunia Hewan'
  | 'Sains Sederhana'
  | 'Bahasa Indonesia'
  | 'Matematika'
  | 'Cerita Rakyat';

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: 'sky' | 'amber' | 'mint' | 'pink' | 'purple';
  conditionText: string;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  target: number;
  rewardPoints: number;
  type: 'read_book' | 'finish_story' | 'play_game' | 'finish_quiz' | 'save_art';
}

export interface ActivityRecord {
  id: string;
  title: string;
  type: 'book' | 'story' | 'game' | 'quiz' | 'art' | 'badge';
  pointsEarned: number;
  timestamp: string;
}

export type AvatarId = 'kelinci' | 'beruang' | 'rubah' | 'peri' | 'naga' | 'burung_hantu';

export interface UserProfileData {
  nickname: string;
  avatar: AvatarId;
  points: number;
  readBookIds: string[];
  completedStoryIds: string[];
  favoriteBookIds: string[];
  gamesCompletedCount: number;
  playedGameTypes: string[];
  quizzesCompletedCount: number;
  perfectMathCount: number;
  artworksSavedCount: number;
  unlockedBadgeIds: string[];
  claimedMissionDates: Record<string, string>;
  dailyProgress: {
    date: string;
    read_book: number;
    finish_story: number;
    play_game: number;
    finish_quiz: number;
    save_art: number;
  };
  activities: ActivityRecord[];
}
