const projects = [
  {
    name: "Website Sekolah SMA Nusantara",
    desc: "Website profil sekolah lengkap dengan informasi akademik, berita, dan galeri kegiatan.",
    tags: ["Laravel","MySQL","Tailwind CSS"],
    image: "assets/project-1-sekolah.svg",
    figma: "https://www.figma.com/file/your-figma-id/website-sekolah",
    overview: "Website resmi untuk profil sekolah yang menampilkan informasi akademik, berita terbaru, dan galeri kegiatan siswa kepada calon murid dan orang tua.",
    problem: "Sekolah belum punya kanal informasi digital, sehingga pendaftaran dan pengumuman masih disebar manual lewat kertas dan grup chat.",
    solution: "Membangun website terpusat dengan CMS sederhana sehingga pihak sekolah bisa memperbarui berita dan galeri tanpa bantuan developer.",
    features: ["Halaman profil dan visi misi sekolah","Sistem berita dan pengumuman","Galeri kegiatan dengan kategori","Formulir pendaftaran online"],
    role: "Full-stack developer — desain UI, backend Laravel, dan integrasi database"
  },
  {
    name: "Dashboard Sistem Akademik",
    desc: "Dashboard untuk guru dan staf mengelola nilai, jadwal, dan data siswa secara terpusat.",
    tags: ["Laravel","MySQL","Chart.js"],
    image: "assets/project-2-akademik.svg",
    figma: "https://www.figma.com/file/your-figma-id/dashboard-akademik",
    overview: "Dashboard internal untuk staf tata usaha dan guru dalam mengelola data akademik siswa, mulai dari nilai hingga jadwal pelajaran.",
    problem: "Pencatatan nilai dan jadwal masih dilakukan lewat spreadsheet terpisah, rawan duplikasi dan sulit direkap saat akhir semester.",
    solution: "Merancang dashboard terpusat dengan role akses berbeda untuk guru dan admin, lengkap dengan rekap nilai otomatis.",
    features: ["Manajemen data siswa dan guru","Input dan rekap nilai per mata pelajaran","Penjadwalan kelas otomatis","Visualisasi statistik akademik"],
    role: "Full-stack developer — arsitektur database dan pengembangan fitur utama"
  },
  {
    name: "Website Portfolio Personal",
    desc: "Portfolio pribadi untuk menampilkan skill, tools, dan hasil project secara profesional.",
    tags: ["HTML","CSS","JavaScript"],
    image: "assets/project-3-portfolio.svg",
    figma: "https://www.figma.com/file/your-figma-id/portfolio-personal",
    overview: "Website portfolio pribadi yang menampilkan perjalanan, kemampuan, dan hasil karya sebagai web developer dan designer.",
    problem: "Belum memiliki representasi digital yang mencerminkan kemampuan dan hasil kerja secara profesional untuk dibagikan ke klien atau perekrut.",
    solution: "Membangun single-page portfolio dengan desain gelap yang bersih, struktur informasi yang jelas, dan studi kasus tiap project.",
    features: ["Section hero, about, dan tools","Galeri project dengan studi kasus","Navigasi sticky dan responsif","Formulir kontak dan tautan sosial"],
    role: "Designer sekaligus developer — dari wireframe sampai kode akhir"
  },
  {
    name: "Sistem Absensi Digital",
    desc: "Aplikasi absensi berbasis web untuk mencatat kehadiran siswa secara real-time.",
    tags: ["PHP","MySQL","Bootstrap"],
    image: "assets/project-4-absensi.svg",
    figma: "https://www.figma.com/file/your-figma-id/sistem-absensi",
    overview: "Sistem absensi digital yang menggantikan pencatatan manual di kelas dengan pencatatan berbasis web yang bisa diakses guru secara real-time.",
    problem: "Rekap kehadiran manual memakan waktu dan sering terjadi selisih data antara buku absen dan laporan akhir bulan.",
    solution: "Mengembangkan sistem absensi digital dengan validasi harian dan laporan otomatis yang bisa diunduh wali kelas.",
    features: ["Input kehadiran per kelas per hari","Rekap otomatis bulanan","Notifikasi keterlambatan","Laporan yang bisa diekspor"],
    role: "Backend developer — logika absensi dan sistem pelaporan"
  },
  {
    name: "Website Informasi Sekolah",
    desc: "Landing page informatif berisi jadwal PPDB, kontak, dan lokasi sekolah.",
    tags: ["HTML","CSS","JavaScript"],
    image: "assets/project-5-informasi.svg",
    figma: "https://www.figma.com/file/your-figma-id/informasi-sekolah",
    overview: "Landing page ringan yang fokus menyampaikan informasi penerimaan siswa baru, jadwal penting, dan kontak sekolah.",
    problem: "Calon pendaftar kesulitan menemukan info PPDB terbaru karena tersebar di beberapa platform media sosial.",
    solution: "Membuat satu halaman informasi terpusat dengan timeline PPDB yang jelas dan peta lokasi terintegrasi.",
    features: ["Timeline jadwal PPDB","Peta lokasi interaktif","Formulir kontak cepat","Desain satu halaman yang ringan"],
    role: "Frontend developer — desain dan implementasi halaman"
  },
  {
    name: "Sistem Perpustakaan Sekolah",
    desc: "Aplikasi pencatatan peminjaman dan pengembalian buku perpustakaan sekolah.",
    tags: ["Laravel","MySQL","Tailwind CSS"],
    image: "assets/project-6-perpustakaan.svg",
    figma: "https://www.figma.com/file/your-figma-id/perpustakaan-sekolah",
    overview: "Aplikasi internal untuk petugas perpustakaan mengelola koleksi buku serta mencatat peminjaman dan pengembalian.",
    problem: "Pencatatan peminjaman buku masih manual di buku besar sehingga sulit melacak buku yang telat dikembalikan.",
    solution: "Membangun sistem pencatatan digital dengan pengingat otomatis untuk buku yang mendekati tenggat pengembalian.",
    features: ["Manajemen katalog buku","Pencatatan peminjaman dan pengembalian","Pengingat tenggat waktu","Pencarian buku cepat"],
    role: "Full-stack developer — dari desain database hingga antarmuka"
  }
];

function projectCardHTML(p){
  return `
    <div class="project-thumb"><img src="${p.image}" alt="Tampilan ${p.name}" loading="lazy"></div>
    <div class="project-body">
      <h3 class="project-name">${p.name}</h3>
      <p class="project-desc">${p.desc}</p>
      <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="project-actions">
        <button class="project-link" data-action="detail" type="button">Lihat Project</button>
        <a class="project-link project-link-outline" href="${p.figma}" target="_blank" rel="noopener">Lihat Desain</a>
      </div>
    </div>
  `;
}