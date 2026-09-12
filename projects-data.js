const projects = [
  {
    name: "Website Sekolah SMA Nusantara",
    orientation: "landscape",
    desc: "Website profil sekolah lengkap dengan informasi akademik, berita, dan galeri kegiatan.",
    tags: ["Laravel","MySQL","Tailwind CSS"],
    image: "assets/22.png",
    figma: "https://www.figma.com/file/your-figma-id/website-sekolah",
    overview: "Website resmi untuk profil sekolah yang menampilkan informasi akademik, berita terbaru, dan galeri kegiatan siswa kepada calon murid dan orang tua.",
    problem: "Sekolah belum punya kanal informasi digital, sehingga pendaftaran dan pengumuman masih disebar manual lewat kertas dan grup chat.",
    solution: "Membangun website terpusat dengan CMS sederhana sehingga pihak sekolah bisa memperbarui berita dan galeri tanpa bantuan developer.",
    features: ["Halaman profil dan visi misi sekolah","Sistem berita dan pengumuman","Galeri kegiatan dengan kategori","Formulir pendaftaran online"],
    role: "Full-stack developer — desain UI, backend Laravel, dan integrasi database"
  },
  {
    name: "Website Portfolio Personal",
    orientation: "landscape",
    desc: "Portfolio pribadi untuk menampilkan skill, tools, dan hasil project secara profesional.",
    tags: ["HTML","CSS","JavaScript"],
    image: "assets/1234.ng",
    figma: "https://www.figma.com/file/your-figma-id/portfolio-personal",
    overview: "Website portfolio pribadi yang menampilkan perjalanan, kemampuan, dan hasil karya sebagai web developer dan designer.",
    problem: "Belum memiliki representasi digital yang mencerminkan kemampuan dan hasil kerja secara profesional untuk dibagikan ke klien atau perekrut.",
    solution: "Membangun single-page portfolio dengan desain gelap yang bersih, struktur informasi yang jelas, dan studi kasus tiap project.",
    features: ["Section hero, about, dan tools","Galeri project dengan studi kasus","Navigasi sticky dan responsif","Formulir kontak dan tautan sosial"],
    role: "Designer sekaligus developer — dari wireframe sampai kode akhir"
  },
  {
    name: "Website Informasi Sekolah",
    orientation: "landscape",
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
