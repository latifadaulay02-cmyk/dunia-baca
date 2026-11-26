export interface GuessPictureItem {
  id: string;
  answer: string;
  category: 'Hewan' | 'Buah' | 'Kendaraan' | 'Benda';
  iconKey: string;
  options: string[];
  hint: string;
}

export const GUESS_PICTURE_ITEMS: GuessPictureItem[] = [
  {
    id: 'gp-1',
    answer: 'Kelinci',
    category: 'Hewan',
    iconKey: 'rabbit',
    options: ['Kelinci', 'Kucing', 'Tupai', 'Rusa'],
    hint: 'Telinganya panjang dan suka melompat makan wortel!',
  },
  {
    id: 'gp-2',
    answer: 'Stroberi',
    category: 'Buah',
    iconKey: 'strawberry',
    options: ['Apel', 'Stroberi', 'Ceri', 'Semangka'],
    hint: 'Buah merah manis dengan bintik-bintik kecil dan daun hijau di atasnya.',
  },
  {
    id: 'gp-3',
    answer: 'Roket',
    category: 'Kendaraan',
    iconKey: 'rocket',
    options: ['Pesawat', 'Kapal', 'Roket', 'Kereta'],
    hint: 'Kendaraan super cepat yang meluncur menuju luar angkasa!',
  },
  {
    id: 'gp-4',
    answer: 'Gajah',
    category: 'Hewan',
    iconKey: 'elephant',
    options: ['Badak', 'Gajah', 'Kuda Nil', 'Jerapah'],
    hint: 'Hewan darat besar yang memiliki belalai panjang.',
  },
  {
    id: 'gp-5',
    answer: 'Sepeda',
    category: 'Kendaraan',
    iconKey: 'bicycle',
    options: ['Mobil', 'Sepeda', 'Perahu', 'Bus'],
    hint: 'Kendaraan beroda dua yang digerakkan dengan cara dikayuh.',
  },
  {
    id: 'gp-6',
    answer: 'Nanas',
    category: 'Buah',
    iconKey: 'pineapple',
    options: ['Mangga', 'Pisang', 'Nanas', 'Jeruk'],
    hint: 'Kulitnya bersisik kuning kecokelatan dan punya mahkota daun tajam.',
  },
  {
    id: 'gp-7',
    answer: 'Buku',
    category: 'Benda',
    iconKey: 'book',
    options: ['Pensil', 'Buku', 'Tas', 'Penggaris'],
    hint: 'Benda berisi lembaran cerita dan ilmu pengetahuan yang kita baca.',
  },
  {
    id: 'gp-8',
    answer: 'Burung Hantu',
    category: 'Hewan',
    iconKey: 'owl',
    options: ['Elang', 'Merpati', 'Burung Hantu', 'Bebek'],
    hint: 'Burung bermata besar bulat yang aktif terjaga di malam hari.',
  },
];

export interface WordScrambleItem {
  id: string;
  word: string;
  hint: string;
  iconKey: string;
  category: string;
}

export const WORD_SCRAMBLE_ITEMS: WordScrambleItem[] = [
  { id: 'ws-1', word: 'BUKU', hint: 'Sahabat membaca penuh halaman cerita', iconKey: 'book', category: 'Perpustakaan' },
  { id: 'ws-2', word: 'KELINCI', hint: 'Hewan berbulu lembut bertelinga panjang', iconKey: 'rabbit', category: 'Hewan' },
  { id: 'ws-3', word: 'PELANGI', hint: 'Lengkungan tujuh warna indah setelah hujan', iconKey: 'rainbow', category: 'Alam' },
  { id: 'ws-4', word: 'BINTANG', hint: 'Benda langit yang berkelap-kelip di malam hari', iconKey: 'star', category: 'Angkasa' },
  { id: 'ws-5', word: 'PERAHU', hint: 'Kendaraan yang berlayar di atas air sungai dan laut', iconKey: 'boat', category: 'Kendaraan' },
  { id: 'ws-6', word: 'APEL', hint: 'Buah renyah berwarna merah atau hijau', iconKey: 'apple', category: 'Buah' },
  { id: 'ws-7', word: 'POHON', hint: 'Tumbuhan tinggi berbatang kayu dan berdaun rindang', iconKey: 'tree', category: 'Alam' },
  { id: 'ws-8', word: 'ROKET', hint: 'Kendaraan antariksa menuju bulan dan planet', iconKey: 'rocket', category: 'Angkasa' },
];

export interface MemoryPairItem {
  id: string;
  label: string;
  iconKey: string;
  bgClass: string;
}

export const MEMORY_PAIR_ITEMS: MemoryPairItem[] = [
  { id: 'm1', label: 'Kelinci', iconKey: 'rabbit', bgClass: 'bg-sky-50 border-sky-200' },
  { id: 'm2', label: 'Beruang', iconKey: 'bear', bgClass: 'bg-amber-50 border-amber-200' },
  { id: 'm3', label: 'Naga', iconKey: 'dragon', bgClass: 'bg-emerald-50 border-emerald-200' },
  { id: 'm4', label: 'Bintang', iconKey: 'star', bgClass: 'bg-purple-50 border-purple-200' },
  { id: 'm5', label: 'Pelangi', iconKey: 'rainbow', bgClass: 'bg-pink-50 border-pink-200' },
  { id: 'm6', label: 'Roket', iconKey: 'rocket', bgClass: 'bg-indigo-50 border-indigo-200' },
  { id: 'm7', label: 'Stroberi', iconKey: 'strawberry', bgClass: 'bg-rose-50 border-rose-200' },
  { id: 'm8', label: 'Buku', iconKey: 'book', bgClass: 'bg-teal-50 border-teal-200' },
];

export const PUZZLE_IMAGES = [
  {
    id: 'puz-rabbit',
    title: 'Kelinci di Hutan Ajaib',
    imageUrl: '/src/assets/images/story_rabbit_forest_1795658319580.jpg',
  },
  {
    id: 'puz-dragon',
    title: 'Petualangan Naga Kecil',
    imageUrl: '/src/assets/images/story_little_dragon_1795658319923.jpg',
  },
  {
    id: 'puz-bear',
    title: 'Piknik Beruang Bimo',
    imageUrl: '/src/assets/images/story_sharing_bear_1795658321791.jpg',
  },
  {
    id: 'puz-kancil',
    title: 'Kancil dan Sungai Pelangi',
    imageUrl: '/src/assets/images/story_kancil_rainbow_river_1795658321179.jpg',
  },
];
