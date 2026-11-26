# DUNIA BACA – Petualangan Seru Dimulai dari Membaca!

Platform perpustakaan digital interaktif, dongeng bersuara, permainan edukatif, kuis pintar, dan ruang kreatif mewarnai khusus anak-anak usia 5–12 tahun.

## Fitur Utama

- **Perpustakaan Digital**: Koleksi 12 buku cerita anak lintas kategori (Dongeng, Fabel, Cerita Rakyat, Pengetahuan, Petualangan, Edukasi) lengkap dengan pembaca halaman interaktif, penanda favorit, dan estimasi waktu baca.
- **Dunia Dongeng Interaktif**: 5 dongeng bergambar multi-halaman dengan narasi suara otomatis (Web Speech API) dan pertanyaan pemahaman cerita.
- **Mini Games Edukatif**: 5 permainan yang bisa dimainkan langsung (Tebak Gambar, Puzzle Ceria, Susun Kata, Cocokkan Pasangan, dan Petualangan Matematika).
- **Kuis Pintar**: 6 kategori kuis pilihan ganda dengan timer opsional, penilaian otomatis, dan penjelasan jawaban.
- **Ruang Kreatif**: Buku mewarnai digital dan kanvas menggambar bebas dengan 5 template gambar, pilihan warna, penghapus, undo, reset, dan unduh gambar PNG.
- **Gamifikasi & Profil Anak**: Sistem poin, 5 level petualangan, 8 badge penghargaan, misi harian, dan penyimpanan progres lokal (`localStorage`) tanpa data pribadi sensitif.
- **Fitur Tambahan**: Pencarian konten global, efek suara ringan (Web Audio API) yang dapat dimatikan, mode malam ramah anak, halaman Tentang Kami, dan Bantuan.

## Teknologi

- React 19 + TypeScript
- Vite + Tailwind CSS v4
- React Router DOM
- Lucide React & Framer Motion (`motion`)
- Web Speech API & Web Audio API

## Cara Menjalankan Proyek

1. Pastikan Node.js (versi 18+) sudah terpasang.
2. Instal dependensi proyek:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
4. Buka browser dan kunjungi `http://localhost:3000`.

## Build untuk Produksi

```bash
npm run build
```

Hasil build siap di-deploy ke layanan hosting statis seperti GitHub Pages, Vercel, atau Netlify.
