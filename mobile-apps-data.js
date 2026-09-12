const mobileApps = [
  {
    title: "App Absensi Mobile",
    category: "Mobile App",
    image: "assets/123.png",
    overview: "Aplikasi mobile untuk guru mencatat kehadiran siswa langsung dari ponsel, terhubung dengan sistem absensi sekolah.",
    role: "UI/UX Designer — merancang alur dan tampilan aplikasi",
    figma: "https://www.figma.com/file/your-figma-id/app-absensi-mobile",
    features: ["assets/1234.png", "assets/feature-placeholder-2.svg", "assets/feature-placeholder-3.svg"]
  },
  {
    title: "App Perpustakaan Mobile",
    category: "Mobile App",
    image: "assets/mobile-2-perpustakaan.svg",
    overview: "Aplikasi mobile untuk siswa mencari koleksi buku dan mengecek status peminjaman perpustakaan sekolah.",
    role: "UI/UX Designer — merancang alur dan tampilan aplikasi",
    figma: "https://www.figma.com/file/your-figma-id/app-perpustakaan-mobile",
    features: ["assets/feature-placeholder-1.svg", "assets/feature-placeholder-2.svg", "assets/feature-placeholder-3.svg"]
  },
  {
    title: "App Akademik Mobile",
    category: "Mobile App",
    image: "assets/mobile-3-akademik.svg",
    overview: "Aplikasi mobile pendamping dashboard akademik, dipakai siswa dan orang tua untuk memantau nilai dan jadwal.",
    role: "UI/UX Designer — merancang alur dan tampilan aplikasi",
    figma: "https://www.figma.com/file/your-figma-id/app-akademik-mobile",
    features: ["assets/feature-placeholder-1.svg", "assets/feature-placeholder-2.svg", "assets/feature-placeholder-3.svg"]
  },
  {
    title: "App Portfolio Mobile",
    category: "Mobile App",
    image: "assets/mobile-4-portfolio.svg",
    overview: "Versi mobile dari website portfolio personal, dirancang agar tetap nyaman diakses lewat layar kecil.",
    role: "UI/UX Designer — merancang alur dan tampilan aplikasi",
    figma: "https://www.figma.com/file/your-figma-id/app-portfolio-mobile",
    features: ["assets/feature-placeholder-1.svg", "assets/feature-placeholder-2.svg", "assets/feature-placeholder-3.svg"]
  }
];

function mobileAppCardHTML(m){
  return `
    <img src="${m.image}" alt="${m.title}" loading="lazy">
    <div class="design-card-overlay">
      <p class="design-card-title">${m.title}</p>
      <p class="design-card-tag">${m.category}</p>
    </div>
  `;
}
