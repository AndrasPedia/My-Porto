const mobileApps = [
  {
    title: "App Absensi Mobile",
    category: "Mobile App",
    image: "assets/1.png",
    overview: "Aplikasi mobile untuk guru mencatat kehadiran siswa langsung dari ponsel, terhubung dengan sistem absensi sekolah.",
    role: "UI/UX Designer — merancang alur dan tampilan aplikasi",
    figma: "https://www.figma.com/proto/nN4iuEwHJMGv0qPofwf7Ts/All-Porto?node-id=4-6537&m=draw&scaling=min-zoom&content-scaling=fixed&page-id=4%3A6523&fuid=1493828535847600274",
    features: ["assets/2.png", "assets/3.png", "assets/4.png"]
  },
  {
    title: "App Perpustakaan Mobile",
    category: "Mobile App",
    image: "assets/1.png",
    overview: "Aplikasi mobile untuk siswa mencari koleksi buku dan mengecek status peminjaman perpustakaan sekolah.",
    role: "UI/UX Designer — merancang alur dan tampilan aplikasi",
    figma: "https://www.figma.com/file/your-figma-id/app-perpustakaan-mobile",
    features: ["assets/2.png", "assets/3.png", "assets/4.png"]
  },
  {
    title: "App Akademik Mobile",
    category: "Mobile App",
    image: "assets/1.png",
    overview: "Aplikasi mobile pendamping dashboard akademik, dipakai siswa dan orang tua untuk memantau nilai dan jadwal.",
    role: "UI/UX Designer — merancang alur dan tampilan aplikasi",
    figma: "https://www.figma.com/file/your-figma-id/app-akademik-mobile",
    features: ["assets/2.png", "assets/3.png", "assets/4.png"]
  },
  {
    title: "App Portfolio Mobile",
    category: "Mobile App",
    image: "assets/1.png",
    overview: "Versi mobile dari website portfolio personal, dirancang agar tetap nyaman diakses lewat layar kecil.",
    role: "UI/UX Designer — merancang alur dan tampilan aplikasi",
    figma: "https://www.figma.com/file/your-figma-id/app-portfolio-mobile",
    features: ["assets/2.png", "assets/3.png", "assets/4.png"]
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
