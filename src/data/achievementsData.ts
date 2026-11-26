import { AvatarId, Badge, DailyMission } from '../types';

export const AVATARS: { id: AvatarId; name: string; title: string; bg: string }[] = [
  { id: 'kelinci', name: 'Kelinci Koko', title: 'Penjelajah Ceria', bg: 'bg-sky-100 dark:bg-sky-900/40' },
  { id: 'beruang', name: 'Beruang Bimo', title: 'Sahabat Hangat', bg: 'bg-amber-100 dark:bg-amber-900/40' },
  { id: 'rubah', name: 'Rubah Rara', title: 'Cerdik & Cepat', bg: 'bg-orange-100 dark:bg-orange-900/40' },
  { id: 'peri', name: 'Peri Lala', title: 'Penjaga Hutan', bg: 'bg-pink-100 dark:bg-pink-900/40' },
  { id: 'naga', name: 'Naga Milo', title: 'Pemberani Cilik', bg: 'bg-emerald-100 dark:bg-emerald-900/40' },
  { id: 'burung_hantu', name: 'Owi Bijak', title: 'Pecinta Ilmu', bg: 'bg-purple-100 dark:bg-purple-900/40' },
];

export const ADVENTURE_LEVELS = [
  { level: 1, name: 'Tunas Pembaca', minPoints: 0, maxPoints: 100 },
  { level: 2, name: 'Penjelajah Cilik', minPoints: 100, maxPoints: 250 },
  { level: 3, name: 'Sahabat Dongeng', minPoints: 250, maxPoints: 500 },
  { level: 4, name: 'Bintang Perpustakaan', minPoints: 500, maxPoints: 900 },
  { level: 5, name: 'Penjaga Hutan Cerita', minPoints: 900, maxPoints: 1500 },
];

export function getLevelInfo(points: number) {
  let current = ADVENTURE_LEVELS[0];
  for (const lvl of ADVENTURE_LEVELS) {
    if (points >= lvl.minPoints) {
      current = lvl;
    }
  }
  const next = ADVENTURE_LEVELS.find((l) => l.level === current.level + 1);
  const progressInLevel = next
    ? Math.min(100, Math.round(((points - current.minPoints) / (next.minPoints - current.minPoints)) * 100))
    : 100;

  return {
    ...current,
    nextLevel: next,
    progressPercent: progressInLevel,
  };
}

export const BADGES: Badge[] = [
  {
    id: 'pembaca_hebat',
    name: 'Pembaca Hebat',
    description: 'Menyelesaikan membaca 3 buku di Perpustakaan Digital.',
    icon: 'book',
    color: 'sky',
    conditionText: 'Baca 3 buku cerita',
  },
  {
    id: 'penjelajah_dongeng',
    name: 'Penjelajah Dongeng',
    description: 'Menyelesaikan 2 cerita interaktif di Dunia Dongeng.',
    icon: 'sparkles',
    color: 'purple',
    conditionText: 'Selesaikan 2 dongeng',
  },
  {
    id: 'jago_matematika',
    name: 'Jago Matematika',
    description: 'Berhasil menyelesaikan Petualangan Matematika atau Kuis Matematika.',
    icon: 'calculator',
    color: 'amber',
    conditionText: 'Menang game/kuis matematika',
  },
  {
    id: 'sahabat_buku',
    name: 'Sahabat Buku',
    description: 'Menyimpan 3 buku pilihan ke daftar buku favorit.',
    icon: 'heart',
    color: 'pink',
    conditionText: 'Tandai 3 buku favorit',
  },
  {
    id: 'juara_permainan',
    name: 'Juara Permainan',
    description: 'Menyelesaikan 3 mini game edukatif dengan semangat.',
    icon: 'gamepad',
    color: 'mint',
    conditionText: 'Main 3 kali mini game',
  },
  {
    id: 'bintang_kuis',
    name: 'Bintang Kuis',
    description: 'Menyelesaikan 2 sesi Kuis Pintar dari berbagai kategori.',
    icon: 'trophy',
    color: 'amber',
    conditionText: 'Selesaikan 2 sesi kuis',
  },
  {
    id: 'seniman_cilik',
    name: 'Seniman Cilik',
    description: 'Mewarnai atau menggambar lalu menyimpan karya di Ruang Kreatif.',
    icon: 'palette',
    color: 'pink',
    conditionText: 'Simpan 1 karya seni',
  },
  {
    id: 'penjaga_hutan',
    name: 'Penjaga Hutan Cerita',
    description: 'Mengumpulkan minimal 300 poin petualangan Dunia Baca.',
    icon: 'crown',
    color: 'purple',
    conditionText: 'Kumpulkan 300 poin',
  },
];

export const DAILY_MISSIONS: DailyMission[] = [
  {
    id: 'misi_baca',
    title: 'Baca 1 Buku Cerita',
    description: 'Buka dan baca satu buku hingga halaman terakhir.',
    target: 1,
    rewardPoints: 30,
    type: 'read_book',
  },
  {
    id: 'misi_dongeng',
    title: 'Dengarkan 1 Dongeng Interaktif',
    description: 'Ikuti satu dongeng dan jawab pertanyaan di akhir cerita.',
    target: 1,
    rewardPoints: 35,
    type: 'finish_story',
  },
  {
    id: 'misi_game',
    title: 'Mainkan 1 Mini Game Edukatif',
    description: 'Asah otakmu lewat game seru di halaman Games.',
    target: 1,
    rewardPoints: 25,
    type: 'play_game',
  },
];
