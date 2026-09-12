const projects = [
  {
    name: "Website Sekolah SMA Nusantara",
    orientation: "landscape",
    desc: "Desain tampilan website profil sekolah, mencakup halaman akademik, berita, dan galeri kegiatan.",
    tags: ["Figma", "UI/UX Design", "Wireframing"],
    image: "assets/Admin.png",
    figma: "https://www.figma.com/proto/nN4iuEwHJMGv0qPofwf7Ts/All-Porto?node-id=3-2203&m=draw&scaling=min-zoom&content-scaling=fixed&page-id=3%3A1677",
    overview: "Rancangan tampilan website profil sekolah yang menampilkan informasi akademik, berita terbaru, dan galeri kegiatan siswa kepada calon murid dan orang tua.",
    problem: "Sekolah belum punya kanal informasi digital, sehingga pendaftaran dan pengumuman masih disebar manual lewat kertas dan grup chat.",
    solution: "Merancang alur dan tampilan website terpusat yang mudah dikelola, dengan struktur informasi yang jelas untuk pihak sekolah maupun pengunjung.",
    features: ["Desain halaman profil dan visi misi sekolah", "Rancangan tampilan berita dan pengumuman", "Layout galeri kegiatan dengan kategori", "Desain formulir pendaftaran online"],
    role: "UI/UX Designer — merancang alur dan tampilan antarmuka"
  },
  {
    name: "Dashboard Sistem Akademik",
    orientation: "landscape",
    desc: "Desain tampilan dashboard untuk guru dan staf mengelola nilai, jadwal, dan data siswa.",
    tags: ["Figma", "UI/UX Design", "Dashboard Design"],
    image: "assets/project-2-akademik.svg",
    figma: "https://www.figma.com/file/your-figma-id/dashboard-akademik",
    overview: "Rancangan antarmuka dashboard internal untuk staf tata usaha dan guru dalam mengelola data akademik siswa, mulai dari nilai hingga jadwal pelajaran.",
    problem: "Pencatatan nilai dan jadwal masih dilakukan lewat spreadsheet terpisah, rawan duplikasi dan sulit direkap saat akhir semester.",
    solution: "Merancang tampilan dashboard terpusat dengan alur akses berbeda untuk guru dan admin, lengkap dengan visualisasi rekap nilai.",
    features: ["Desain tampilan manajemen data siswa dan guru", "Rancangan form input dan rekap nilai", "Layout penjadwalan kelas", "Desain visualisasi statistik akademik"],
    role: "UI/UX Designer — merancang alur dan tampilan dashboard"
  },
  {
    name: "Website Portfolio Personal",
    orientation: "portrait",
    desc: "Desain tampilan portfolio pribadi untuk menampilkan skill, tools, dan hasil karya.",
    tags: ["Figma", "UI/UX Design", "Web Design"],
    image: "assets/project-3-portfolio.svg",
    figma: "https://www.figma.com/file/your-figma-id/portfolio-personal",
    overview: "Rancangan tampilan website portfolio pribadi yang menampilkan perjalanan, kemampuan, dan hasil karya sebagai web developer dan designer.",
    problem: "Belum memiliki representasi digital yang mencerminkan kemampuan dan hasil kerja secara profesional untuk dibagikan ke klien atau perekrut.",
    solution: "Merancang tampilan single-page dengan gaya gelap yang bersih, struktur informasi yang jelas, dan studi kasus tiap karya.",
    features: ["Desain section hero, about, dan tools", "Layout galeri project dengan studi kasus", "Rancangan navigasi sticky dan responsif", "Desain formulir kontak dan tautan sosial"],
    role: "UI/UX Designer — dari wireframe sampai desain akhir"
  },
  {
    name: "Sistem Absensi Digital",
    orientation: "portrait",
    desc: "Desain tampilan aplikasi absensi untuk mencatat kehadiran siswa secara digital.",
    tags: ["Figma", "UI/UX Design", "Mobile-first Design"],
    image: "assets/project-4-absensi.svg",
    figma: "https://www.figma.com/file/your-figma-id/sistem-absensi",
    overview: "Rancangan antarmuka sistem absensi digital yang menggantikan pencatatan manual di kelas dengan tampilan yang mudah diakses guru.",
    problem: "Rekap kehadiran manual memakan waktu dan sering terjadi selisih data antara buku absen dan laporan akhir bulan.",
    solution: "Merancang alur pencatatan kehadiran harian dan tampilan laporan otomatis yang sederhana untuk wali kelas.",
    features: ["Desain tampilan input kehadiran per kelas", "Rancangan rekap otomatis bulanan", "Desain notifikasi keterlambatan", "Layout laporan yang bisa diekspor"],
    role: "UI/UX Designer — merancang alur dan tampilan aplikasi"
  },
  {
    name: "Website Informasi Sekolah",
    orientation: "landscape",
    desc: "Desain landing page informatif berisi jadwal PPDB, kontak, dan lokasi sekolah.",
    tags: ["Figma", "UI/UX Design", "Landing Page"],
    image: "assets/project-5-informasi.svg",
    figma: "https://www.figma.com/file/your-figma-id/informasi-sekolah",
    overview: "Rancangan landing page ringan yang fokus menyampaikan informasi penerimaan siswa baru, jadwal penting, dan kontak sekolah.",
    problem: "Calon pendaftar kesulitan menemukan info PPDB terbaru karena tersebar di beberapa platform media sosial.",
    solution: "Merancang satu halaman informasi terpusat dengan timeline PPDB yang jelas dan tampilan peta lokasi.",
    features: ["Desain timeline jadwal PPDB", "Rancangan tampilan peta lokasi", "Desain formulir kontak cepat", "Layout satu halaman yang ringan"],
    role: "UI/UX Designer — merancang tampilan halaman"
  },
  {
    name: "Sistem Perpustakaan Sekolah",
    orientation: "portrait",
    desc: "Desain tampilan aplikasi pencatatan peminjaman dan pengembalian buku perpustakaan.",
    tags: ["Figma", "UI/UX Design", "Dashboard Design"],
    image: "assets/project-6-perpustakaan.svg",
    figma: "https://www.figma.com/file/your-figma-id/perpustakaan-sekolah",
    overview: "Rancangan antarmuka aplikasi internal untuk petugas perpustakaan mengelola koleksi buku serta mencatat peminjaman dan pengembalian.",
    problem: "Pencatatan peminjaman buku masih manual di buku besar sehingga sulit melacak buku yang telat dikembalikan.",
    solution: "Merancang alur pencatatan digital dengan tampilan pengingat untuk buku yang mendekati tenggat pengembalian.",
    features: ["Desain tampilan katalog buku", "Rancangan alur peminjaman dan pengembalian", "Desain pengingat tenggat waktu", "Layout pencarian buku"],
    role: "UI/UX Designer — merancang alur dan tampilan aplikasi"
  }
];

function projectCardHTML(p){
  return `
    <div class="project-thumb${p.orientation === 'portrait' ? ' portrait' : ''}"><img src="${p.image}" alt="Tampilan ${p.name}" loading="lazy"></div>
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
