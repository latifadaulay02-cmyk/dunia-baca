import { InteractiveStory } from '../types';

export const INTERACTIVE_STORIES: InteractiveStory[] = [
  {
    id: 'kelinci-hutan-ajaib',
    title: 'Kelinci dan Hutan Ajaib',
    moralValue: 'Keberanian & Tolong-Menolong',
    moralDescription: 'Membantu teman yang kesulitan membuat hati bahagia dan melatih keberanian kita.',
    duration: '4 menit',
    coverImage: '/src/assets/images/story_rabbit_forest_1795658319580.jpg',
    accentColor: 'mint',
    summary: 'Kelinci Koko menjelajahi jalan setapak hutan berkilau untuk mengembalikan mahkota bunga milik Ratu Kupu-Kupu.',
    pages: [
      {
        pageNumber: 1,
        sceneType: 'rabbit_path',
        imageUrl: '/src/assets/images/story_rabbit_forest_1795658319580.jpg',
        text: 'Pada suatu pagi yang cerah, Kelinci Koko membawa tas kuning kecilnya berjalan menyusuri Hutan Ajaib. Kupu-kupu warna-warni menari di antara bunga lonceng biru yang harum.',
      },
      {
        pageNumber: 2,
        sceneType: 'fairy_garden',
        text: 'Di dekat pohon tua, Koko mendengar tangisan halus. Ternyata seekor anak landak kecil kehilangan jalan pulang karena kabut pagi turun menutupi semak berry.',
      },
      {
        pageNumber: 3,
        sceneType: 'forest_library',
        text: 'Meskipun Koko sedikit gugup melewati jembatan kayu yang tinggi, ia memberanikan diri menuntun anak landak kecil itu mengikuti cahaya bunga-bunga hutan.',
      },
      {
        pageNumber: 4,
        sceneType: 'rabbit_path',
        text: 'Akhirnya mereka tiba di rumah pohon keluarga landak dengan selamat! Ibu landak sangat berterima kasih dan memberi Koko sekeranjang buah manis untuk dibagikan kepada teman-temannya.',
      },
    ],
    quiz: [
      {
        question: 'Siapa yang ditolong oleh Kelinci Koko di dalam Hutan Ajaib?',
        options: ['Anak landak yang tersesat', 'Singa yang sedang tidur', 'Ikan di laut dalam', 'Burung merak sombong'],
        correctIndex: 0,
        explanation: 'Kelinci Koko dengan berani menuntun anak landak yang tersesat di balik kabut pagi.',
      },
      {
        question: 'Nilai baik apa yang bisa kita tiru dari Kelinci Koko?',
        options: ['Suka menyendiri', 'Berani dan suka menolong sesama', 'Takut mencoba hal baru', 'Berjalan tanpa pamit'],
        correctIndex: 1,
        explanation: 'Koko menunjukkan keberanian dan sikap tolong-menolong kepada teman yang membutuhkan.',
      },
    ],
  },
  {
    id: 'petualangan-naga-kecil',
    title: 'Petualangan Naga Kecil',
    moralValue: 'Percaya Diri & Persahabatan',
    moralDescription: 'Setiap anak memiliki keunikan istimewa yang bisa membawa kebahagiaan bagi banyak orang.',
    duration: '4 menit',
    coverImage: '/src/assets/images/story_little_dragon_1795658319923.jpg',
    accentColor: 'sky',
    summary: 'Naga Milo awalnya sedih karena tidak bisa menyemburkan api, sampai ia menemukan bakat ajaibnya meniup gelembung bintang!',
    pages: [
      {
        pageNumber: 1,
        sceneType: 'dragon_hill',
        imageUrl: '/src/assets/images/story_little_dragon_1795658319923.jpg',
        text: 'Di sebuah bukit rumput hijau yang hangat, tinggal seekor naga kecil bernama Milo. Berbeda dari naga lain, Milo tidak bisa menyemburkan api panas.',
      },
      {
        pageNumber: 2,
        sceneType: 'star_lantern',
        text: 'Milo sempat merasa malu dan menyendiri. Namun setiap kali ia menarik napas dalam dan meniup udara, keluarlah gelembung-gelembung bintang berwarna emas yang berkilau!',
      },
      {
        pageNumber: 3,
        sceneType: 'fairy_garden',
        text: 'Saat festival malam tiba dan lampu desa padam karena angin kencang, Milo dengan percaya diri meniup ratusan gelembung bintang ke langit sehingga desa menjadi terang benderang.',
      },
      {
        pageNumber: 4,
        sceneType: 'dragon_hill',
        text: 'Semua teman bersorak gembira memuji Milo! Ia pun sadar bahwa perbedaan bukanlah kekurangan, melainkan keajaiban unik yang harus disyukuri.',
      },
    ],
    quiz: [
      {
        question: 'Apa bakat istimewa yang dimiliki Naga Milo?',
        options: ['Bisa menyelam sangat dalam', 'Meniup gelembung bintang bercahaya', 'Menyemburkan es beku', 'Berlari lebih cepat dari angin'],
        correctIndex: 1,
        explanation: 'Milo meniup gelembung bintang berkilau yang menerangi desa saat lampu padam.',
      },
      {
        question: 'Apa pelajaran penting dari kisah Naga Milo?',
        options: ['Kita harus selalu sama dengan orang lain', 'Keunikan diri adalah keistimewaan yang berharga', 'Jangan pernah ikut festival', 'Bersembunyi saat merasa berbeda'],
        correctIndex: 1,
        explanation: 'Setiap orang memiliki bakat unik yang bermanfaat jika kita percaya diri.',
      },
    ],
  },
  {
    id: 'putri-bintang-hilang',
    title: 'Putri dan Bintang yang Hilang',
    moralValue: 'Kejujuran & Tanggung Jawab',
    moralDescription: 'Mengakui kesalahan dengan jujur dan bertanggung jawab memperbaikinya adalah sikap kesatria sejati.',
    duration: '5 menit',
    coverImage: '/src/assets/images/story_princess_star_1795658320457.jpg',
    accentColor: 'purple',
    summary: 'Putri Nara membawa lentera bintang mencari bintang kecil yang terjatuh di Taman Lavender ditemani Burung Hantu Owi.',
    pages: [
      {
        pageNumber: 1,
        sceneType: 'star_lantern',
        imageUrl: '/src/assets/images/story_princess_star_1795658320457.jpg',
        text: 'Suatu senja di Taman Lavender, Putri Nara tidak sengaja menyenggol lentera bintang pusaka kerajaan hingga salah satu cahayanya terbang masuk ke rimbun bunga.',
      },
      {
        pageNumber: 2,
        sceneType: 'owl_night',
        text: 'Putri Nara sempat takut dimarahi Raja, tetapi ia memilih berkata jujur kepada ayahnya dan berjanji bertanggung jawab menemukan bintang itu kembali.',
      },
      {
        pageNumber: 3,
        sceneType: 'fairy_garden',
        text: 'Dibantu Burung Hantu Owi yang bermata tajam, Putri Nara berjalan menyusuri jalan batu taman sambil membawa lentera emasnya dengan penuh ketekunan.',
      },
      {
        pageNumber: 4,
        sceneType: 'star_lantern',
        text: 'Akhirnya bintang mungil itu ditemukan beristirahat di atas kelopak mawar ungu! Raja tersenyum bangga karena Putri Nara bersikap jujur dan bertanggung jawab.',
      },
    ],
    quiz: [
      {
        question: 'Apa yang dilakukan Putri Nara setelah tidak sengaja menjatuhkan bintang lentera?',
        options: ['Menyembunyikannya di bawah batu', 'Berkata jujur dan bertanggung jawab mencarinya', 'Menyalahkan burung hantu', 'Pergi tidur dan melupakannya'],
        correctIndex: 1,
        explanation: 'Putri Nara berani jujur kepada ayahnya dan mencarinya kembali bersama Owi.',
      },
      {
        question: 'Siapa yang menemani Putri Nara mencari bintang di Taman Lavender?',
        options: ['Burung Hantu Owi', 'Naga Merah', 'Buaya Sungai', 'Singa Padang'],
        correctIndex: 0,
        explanation: 'Burung Hantu Owi yang bermata tajam membantu Putri Nara menemukan bintang tersebut.',
      },
    ],
  },
  {
    id: 'beruang-suka-berbagi',
    title: 'Beruang yang Suka Berbagi',
    moralValue: 'Kebaikan & Berbagi',
    moralDescription: 'Berbagi makanan dan kebahagiaan kepada teman membuat rasa sukacita bertambah berkali lipat.',
    duration: '4 menit',
    coverImage: '/src/assets/images/story_sharing_bear_1795658321791.jpg',
    accentColor: 'amber',
    summary: 'Beruang Bimo menggelar piknik penuh stroberi segar dan kue madu untuk dibagikan kepada Tupai Ciko dan Burung Pipit.',
    pages: [
      {
        pageNumber: 1,
        sceneType: 'bear_picnic',
        imageUrl: '/src/assets/images/story_sharing_bear_1795658321791.jpg',
        text: 'Di padang rumput cerah, Beruang Bimo baru saja memetik sekeranjang stroberi merah manis dan memanggang kue madu hangat kesukaannya.',
      },
      {
        pageNumber: 2,
        sceneType: 'fox_runner',
        text: 'Dari atas dahan pohon, Tupai Ciko dan Burung Pipit kecil memandang dengan perut keroncongan karena kebun kacang mereka belum berbuah.',
      },
      {
        pageNumber: 3,
        sceneType: 'bear_picnic',
        text: 'Bimo langsung melambaikan tangan dengan gembira, "Ayo kemari teman-teman! Kue madu ini jauh lebih lezat kalau kita nikmati bersama!"',
      },
      {
        pageNumber: 4,
        sceneType: 'forest_library',
        text: 'Mereka tertawa riang di atas tikar kotak-kotak sambil menyanyikan lagu persahabatan. Bimo merasakan hatinya hangat karena telah berbagi kebahagiaan.',
      },
    ],
    quiz: [
      {
        question: 'Apa yang dilakukan Beruang Bimo saat melihat Tupai dan Burung Pipit lapar?',
        options: ['Menghabiskan kuenya sendirian', 'Mengajak mereka makan bersama dengan ramah', 'Menyembunyikan keranjang stroberi', 'Pulang ke dalam gua'],
        correctIndex: 1,
        explanation: 'Bimo dengan tulus mengajak teman-temannya berbagi stroberi dan kue madu.',
      },
      {
        question: 'Bagaimana perasaan setelah kita berbagi dengan teman?',
        options: ['Hati menjadi senang dan persahabatan makin erat', 'Merasa kesal dan marah', 'Menjadi kesepian', 'Tidak ada bedanya'],
        correctIndex: 0,
        explanation: 'Berbagi menumbuhkan rasa bahagia dan mempererat persahabatan.',
      },
    ],
  },
  {
    id: 'kancil-sungai-pelangi',
    title: 'Kancil dan Sungai Pelangi',
    moralValue: 'Kecerdikan & Menjaga Alam',
    moralDescription: 'Kecerdikan digunakan untuk kebaikan bersama, termasuk menjaga kebersihan sungai dan alam.',
    duration: '5 menit',
    coverImage: '/src/assets/images/story_kancil_rainbow_river_1795658321179.jpg',
    accentColor: 'pink',
    summary: 'Kancil menemukan penyebab warna Sungai Pelangi memudar dan mengajak warga hutan membersihkan sungai dengan cara cerdik.',
    pages: [
      {
        pageNumber: 1,
        sceneType: 'rainbow_river',
        imageUrl: '/src/assets/images/story_kancil_rainbow_river_1795658321179.jpg',
        text: 'Di jantung hutan tropis, mengalir Sungai Pelangi yang airnya memantulkan kilau tujuh warna indah setiap kali terkena sinar matahari pagi.',
      },
      {
        pageNumber: 2,
        sceneType: 'kancil_garden',
        text: 'Namun pagi ini Kancil melihat air sungai keruh tertutup ranting kering dan dedaunan yang tersangkut di batu besar. Katak hijau pun tidak bisa bernyanyi riang.',
      },
      {
        pageNumber: 3,
        sceneType: 'ocean_turtle',
        text: 'Kancil berpikir cerdik! Ia mengajak berang-berang, burung bangau, dan kelinci membuat permainan lomba mengumpulkan ranting untuk dijadikan jembatan kebun.',
      },
      {
        pageNumber: 4,
        sceneType: 'rainbow_river',
        text: 'Dalam sekejap sungai kembali bersih berkilau pelangi! Semua hewan bersorak karena kerja sama dan cinta alam membuat hutan tetap lestari.',
      },
    ],
    quiz: [
      {
        question: 'Mengapa air Sungai Pelangi sempat menjadi keruh?',
        options: ['Karena tertutup ranting dan daun yang tersangkut', 'Karena matahari tidak terbit', 'Karena sungai membeku', 'Karena ikan-ikan tertidur'],
        correctIndex: 0,
        explanation: 'Ranting dan dedaunan tersangkut di batu besar sehingga menyumbat aliran sungai.',
      },
      {
        question: 'Bagaimana cara cerdik Kancil membersihkan sungai bersama teman-temannya?',
        options: ['Menunggu hujan badai', 'Mengajak kerja sama lewat permainan mengumpulkan ranting', 'Membiarkannya saja', 'Pindah ke hutan lain'],
        correctIndex: 1,
        explanation: 'Kancil mengubah kegiatan membersihkan sungai menjadi permainan gotong royong yang seru.',
      },
    ],
  },
];
